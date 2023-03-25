# BFC概念

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

**通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部**。

## BFC触发条件

1. 根元素或包含根元素的元素
1. 浮动元素（元素的 float 不是 none）
1. 绝对定位元素（元素的 position 为 absolute 或 fixed）
1. 行内块元素（元素的 display 为 inline-block）
1. 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
1. 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
1. 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
1. overflow 值不为 visible 的块元素
1. display 值为 flow-root 的元素
1. contain 值为 layout、content或 strict 的元素
1. 弹性元素（display为 flex 或 inline-flex元素的直接子元素）
1. 网格元素（display为 grid 或 inline-grid 元素的直接子元素）
1. 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
1. column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

## BFC示例

### 同一个 BFC 下外边距会发生折叠

```
<head>
div{
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}
</head>
<body>
    <div></div>
    <div></div>
</body>
```

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/css%E5%9B%BE%E7%89%87/3.jpg?raw=true)

从效果上看，因为两个 div 元素都处于同一个 BFC 容器下 (这里指 body 元素) 所以第一个 div 的下边距和第二个 div 的上边距发生了重叠，所以两个盒子之间距离只有 100px，而不是 200px。

首先这不是 CSS 的 bug，我们可以理解为一种规范，如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。

```
<style>
.container {
    overflow: hidden;
}
p {
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}
</style>
<div class="container">
    <p></p>
</div>
<div class="container">
    <p></p>
</div>
```

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/css%E5%9B%BE%E7%89%87/4.jpg?raw=true)

### BFC 可以包含浮动的元素（清除浮动）

我们都知道，浮动的元素会脱离普通文档流，来看下下面一个例子

```
<div style="border: 1px solid #000;">
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/css%E5%9B%BE%E7%89%87/5.jpg?raw=true)

由于容器内元素浮动，脱离了文档流，所以容器只剩下 2px 的边距高度。如果使触发容器的 BFC，那么容器将会包裹着浮动元素。

```
<div style="border: 1px solid #000;overflow: hidden">
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/css%E5%9B%BE%E7%89%87/6.png?raw=true)

### BFC 可以阻止元素被浮动元素覆盖

```
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动, 
也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/css%E5%9B%BE%E7%89%87/7.jpg?raw=true)

这时候其实第二个元素有部分被浮动元素所覆盖，(但是文本信息不会被浮动元素所覆盖) 如果想避免元素被覆盖，可触第二个元素的 BFC 特性，在第二个元素中加入 overflow: hidden，就会变成：

![image](https://note.youdao.com/favicon.ico)