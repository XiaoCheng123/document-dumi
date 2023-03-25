---
order: 1
---

# flutter学习（一）文章以及flutter介绍

## 作者简介
本人，广工小成，全栈开发，专心学习了flutter开发一段周期。由0到1开发出了一个多功能，有完整的flutter聊天系统，好友系统，以及flutter嵌入国内百度地图并且进行灵活调度的完整应用。

这里推荐一下本人的学习网址：
1. [flutter官网](https://flutter.dev/)
2. [flutter中文网](https://flutterchina.club/)
3. [《flutter实战》](https://book.flutterchina.club/)
4. [flutter插件官网](https://pub.dev/)
5. [Dart 官方教程/文章收集整理贴](https://www.dart-china.org/t/topic/541)
6. [flutter优秀开源项目GSYGithubApp](https://github.com/CarGuo/GSYGithubAppFlutter)

当然，本人还阅读过很多博客，以及慕课网的教学视频，都积累了不少东西，不过最主要的还是推荐一下[flutter官网](https://flutter.dev/)。在开发过程中，网上的博客说的都很少，最后还是得靠官网。

## flutter介绍

话不多说，文章是面对flutter小白进行开始。先个人的了解对flutter进行一个介绍吧

> Flutter是Google开源的一个移动应用开发框架，拥有丰富的组件和接口，几乎能够满足对一款软件的所有要求，用dart语言开发。

Dart语言的历史的话，说来就话长了，简单引用flutter实战作者的话语吧。

### 开发效率高

Dart运行时和编译器支持Flutter的两个关键特性的组合：

基于JIT的快速开发周期：Flutter在开发阶段采用，采用JIT模式，这样就避免了每次改动都要进行编译，极大的节省了开发时间；

基于AOT的发布包: Flutter在发布时可以通过AOT生成高效的ARM代码以保证应用性能。而JavaScript则不具有这个能力。

### 高性能

Flutter旨在提供流畅、高保真的的UI体验。为了实现这一点，Flutter中需要能够在每个动画帧中运行大量的代码。这意味着需要一种既能提供高性能的语言，而不会出现会丢帧的周期性暂停，而Dart支持AOT，在这一点上可以做的比JavaScript更好。

### 快速内存分配

Flutter框架使用函数式流，这使得它在很大程度上依赖于底层的内存分配器。因此，拥有一个能够有效地处理琐碎任务的内存分配器将显得十分重要，在缺乏此功能的语言中，Flutter将无法有效地工作。当然Chrome V8的JavaScript引擎在内存分配上也已经做的很好，事实上Dart开发团队的很多成员都是来自Chrome团队的，所以在内存分配上Dart并不能作为超越JavaScript的优势，而对于Flutter来说，它需要这样的特性，而Dart也正好满足而已。

### 类型安全

由于Dart是类型安全的语言，支持静态类型检测，所以可以在编译前发现一些类型的错误，并排除潜在问题，这一点对于前端开发者来说可能会更具有吸引力。与之不同的，JavaScript是一个弱类型语言，也因此前端社区出现了很多给JavaScript代码添加静态类型检测的扩展语言和工具，如：微软的TypeScript以及Facebook的Flow。相比之下，Dart本身就支持静态类型，这是它的一个重要优势。

## 为何要用Flutter
1. flutter用一套代码，即可跨安卓和ios平台开发
2. 相对于安卓和ios平台独立开发，flutter的**代码量甚至更少，运行速度更快**
3. flutter开发的时候，提供完整接口，而且调用非常简单
4. 更加优美，flutter有完美的动画效果，以及可以在[2dimensions网站](https://www.2dimensions.com/)指定优雅的动画效果自定义
5. flutter类似react框架，有自己的diff算法，实现组件复用。同时提供了相应的开发者工具，让我们设计，构建，测试以及debug更加方便

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/flutter%E5%9B%BE%E7%89%87/1.png?raw=true)

## Flutter的组件化
Flutter的组件分为两大块：StatelessWidget和StatefulWidget

看名字就能够知道**StatelessWidget**为静态组件，不需要动态加载，一般用来作为项目当中没有网络交互的组件，而**StatefulWidget**为动态组件，根据用户的交互，以及网络对其状态改变来改变其显示。Flutter为典型的mvvm框架。

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/flutter%E5%9B%BE%E7%89%87/2.png?raw=true)

## Flutter的架构
flutter的架构不仔细展开来讲了，因为如果了解到这里面的知识了，相比也是很有经验的人了。这里就简单说一下，如下图，flutter是在平台的硬件接口上的c++上面的一层，跟js有点类似，不过flutter更类似js搭建的react框架。

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/flutter%E5%9B%BE%E7%89%87/3.png?raw=true)

## 总结
这里就只是简单的介绍了一下Flutter，不得不说，Flutter确实是一个很厉害的框架，就是可惜国内的人用的还不够多，但是值得追捧，如果你也阅读了Flutter官网上那些优秀的页面，不要怀疑，Flutter开发就是这么简洁而优雅。