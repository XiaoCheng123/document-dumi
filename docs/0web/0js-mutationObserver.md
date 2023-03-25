# MutationObserver
> 今天来介绍一个很有用的DOM API——**MutationObserver**

## 使用背景

页面或者某个父类DOM需要监听子节点的变化，来进行统一回调，这个变化包括了：

1. 特定属性名称的变化，例如class等
2. 属性的变化
3. 整个DOM树中子节点的变化

## MutationObserver介绍

> 这里采用了MDN的官方介绍，MutationObserver接口提供了监视对DOM树所做更改的能力。它被设计为旧的Mutation Events功能的替代品，该功能是DOM3 Events规范的一部分。

MutationObserver主要包括了三个方法，具体可结合下面示例：
- disconnect()——阻止 MutationObserver 实例继续接收的通知
- observe()——配置MutationObserver在DOM更改匹配给定选项
- takeRecords()——从MutationObserver的通知队列中删除所有待处理的通知

### 实例&示例
通过MutationObserver()即可构造一个实例，下面为使用示例

```
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = {
    attributes: true, // 开启监听属性
    childList: true, // 开启监听子节点
    subtree: true // 开启监听子节点下面的所有节点
};

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();
```

### config的值介绍

上文的config为一个MutationObserverInit字典，描述了MutationObserver的配置，我们有以下可选属性进行配置（没有必选属性）

属性 | 介绍
---|---
[attributeFilter](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit/attributeFilter) | 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知。无默认值。
[attributeOldValue](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit/attributeOldValue) | 当监视节点的属性改动时，将此属性设为 true 将记录任何有改动的属性的上一个值。无默认值。
[attributes](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit/attributes) | 设为 true 以观察受监视元素的属性值变更。默认值为 false。
[characterData](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit/characterData) | 设为 true 以监视指定目标节点或子节点树中节点所包含的字符数据的变化。无默认值。
[characterDataOldValue](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit/characterDataOldValue) | 设为 true 以在文本在受监视节点上发生更改时记录节点文本的先前值。无默认值。
[childList](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit/childList) | 设为 true 以监视目标节点（如果 subtree 为 true，则包含子孙节点）添加或删除新的子节点。默认值为 false。
[subtree](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit/subtree) | 设为 true 以将监视范围扩展至目标节点整个节点树中的所有节点。MutationObserverInit 的其他值也会作用于此子树下的所有节点，而不仅仅只作用于目标节点。默认值为 false。

### callback介绍

**callback**
一个回调函数，每当被指定的节点或子树以及配置项有Dom变动时会被调用。回调函数拥有两个参数：一个是描述所有被触发改动的 [MutationRecord](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord) 对象数组，另一个是调用该函数的MutationObserver 对象。

#### 参考文章：

https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver

#### 附API的适配性：
![image](https://github.com/XiaoCheng123/markdownImg/blob/master/segment%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%9B%BE%E7%89%87/28.png?raw=true)
