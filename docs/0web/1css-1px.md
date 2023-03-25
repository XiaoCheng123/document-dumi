---
title: 1px移动端解决方案
keywords: [css] # 配置页面关键词，同时用于生成 <meta> 标签
---

>　在某个夜黑风高的晚上，程序员小A正在开开心心的准备收拾东西回家。这时候，手机突然震动了一下。小A下意识的想到，肯定是大事不好了。果不其然，是设计大佬发来消息了。。。

设计大佬：小A，怎么这个0.5dp（0.5dp=1px）的边框比实际的还粗啊

小A：好的，我现在去看一下（没道理啊，我明明记得我写了1px的，不可能会粗啊，难道我忘了吗）

阅读完代码之后....

小A：设计大佬，我这里已经写了1px了，他就是1px了，不信你看看，会粗一点可能是手机h5会把1px画粗一点吧

设计大佬：但是很多h5页面也有1px的边框啊

小A：好的，那我再去调研一下（大佬说话，不得不低调，还是先别着急，可能另有转机呢）

经过一番调研后....

小A顿然醒悟，果然1px的问题很多人都遇到，网上也有很多方案，但是看起来乱七八糟的，又没讲明原理，万一下次再碰到，那该怎么办呢。这是他有了一个idea，不如自己整理一下，也方便大家记忆

## 1px原理篇

在讲原理之前，先跟大家说一个概念，就是设备像素比DPR(devicePixelRatio)是什么

> DPR = 设备像素 / CSS像素(某一方向上)

这句话看起来很难理解，可以结合下面这张图（1px在各个DPR上面的展示），一般我们h5拿到的设计稿都是750px的，但是如果在DPR为2的屏幕上，手机的最小像素却是要用2 * 2px来进行绘制，这也就导致了为什么1px会比较粗了。

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/segment%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%9B%BE%E7%89%87/25.png?raw=true)

## 解决方法

解决办法有很多种，在这里帮大家比较下方案：


方案 | 优点 | 缺点
--- |--- | ---
使用0.5px实现 | 代码简单，使用css即可 | IOS及Android老设备不支持
使用border-image实现 | 兼容目前所有机型 | 修改颜色不方便
通过 viewport + rem 实现 | 一套代码，所有页面 | 和0.5px一样，机型不兼容
使用伪类 + transform实现 | 兼容所有机型 | 不支持圆角
box-shadow模拟边框实现 | 兼容所有机型 | box-shadow不在盒子模型，需要注意预留位置

以上的方案在网上都可以找到示例，我这里只提供两个本人经常使用的方案：

### box-shadow

box-shadow是本人最常用的，除了在Android4.4以下发现小于1p的shadow无法显示之外，其他的都是好的

```
// 下边框
box-shadow: 0 1px #E9E9E9;

// 全边框
box-shadow: 0 -1px #D9D9D9, 1px 0 #D9D9D9, 0 1px #D9D9D9, -1px 0 #D9D9D9;

// 其他的可以看看API更深入了解这个API
```

### 使用伪类 + transform实现

目前京东的h5网页就是使用使用伪类 + transform实现

```
// 左边框，如果需要修改边框位置，可以修改元素top，left，right，bottom的值即可
&::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '\0020';
    width: 100%;
    height: 1px;
    border-top: 1px solid #E9E9E9;
    transform-origin: 0 0;
    overflow: hidden;
}

@media (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49) {
    &::before {
      transform: scaleY(0.5);
    }
}

@media (-webkit-min-device-pixel-ratio: 2.5) {
    &::before {
      transform: scaleY(0.33333);
    }
}
```

## 市面上其他网页的处理方案

> 参考了下目前的前沿技术某东和某宝的页面

发现某宝是使用div+width来进行实现，因此推断某宝应该是使用了通过 viewport + rem + div 的方法

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/segment%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%9B%BE%E7%89%87/26.png?raw=true)

某东如上面的使用了伪类 + transform实现

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/segment%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%9B%BE%E7%89%87/27.png?raw=true)

## 总结

设计师有时候很严格也是件好事

## 参考资料：

https://main.m.taobao.com/

https://m.jd.com/

https://juejin.im/post/6844903605120548878

https://www.kelede.win/posts/Retina%E5%B1%8F%E5%B9%951px%E7%9A%84%E9%97%AE%E9%A2%98/