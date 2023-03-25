---
order: 1.2
---

# flutter学习（三）Flutter的生命周期和路由

## Flutter的生命周期

> Flutter主要有两种：无状态的 StatelessWidget和有状态的 StatefulWidget

### 1. StatelessWidget

一个 StatelessWidget 是不能被改变的，比如：Icon、Text等。由于不可改变，因此并没有什么生命周期。

### 2. StatefulWidget

一个 StatefulWidget 是有状态的，可变的。一个 StatefulWidget 组件可以通过定义它的 State 来进行对组件数据状态的存储和修改。那么它的State应该是有一系列的生命周期。

![image](https://user-gold-cdn.xitu.io/2019/4/6/169f0af0a1b78bef?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

上图就是 State 的生命周期图。

1. StatefulWidget.createState()Framework 调用会通过调用 StatefulWidget.createState() 来创建一个 State。

2. initState()新创建的 State 会和一个 BuildContext 产生关联，此时认为 State 已经被安装好了，initState() 函数将会被调用。通常，我们可以重写这个函数，进行初始化操作。

3. didChangeDependencies()在 initState() 调用结束后，这个函数会被调用。事实上，当 State 对象的依赖关系发生变化时，这个函数总会被 Framework 调用。
4. build()经过以上步骤，系统认为一个 State 已经准备好了，就会调用 build() 来构建视图。我们需要在这个函数中，返回一个 Widget。

5. deactivate()当 State 被暂时从视图树中移除时，会调用这个函数。页面切换时，也会调用它，因为此时 State 在视图树中的位置发生了变化，需要先暂时移除后添加。

   ⚠️注意，重写的时候必须要调用 super.deactivate()。
6. dispose()当 State 被永久的从视图树中移除，Framework 会调用该函数。在销毁前触发，我们可以在这里进行最终的资源释放。在调用这个函数之前，总会先调用 deactivate()。

    ⚠️注意，重写的时候必须要调用 super.dispose()。
7. didUpdateWidget(covariant T oldWidget)当 widget 的配置发生变化时，会调用这个函数。比如，Hot-reload 的时候就会调用这个函数。这个函数调用后，会调用 build()。

8. setState()当我需要更新 State 的视图时，需要手动调用这个函数，它会触发 build() 。

## Flutter的路由

> Flutter里面的路由主要是通过Navigator这个类进行控制的，当你想从这个页面跳到另外一个页面的时候，通过Navigator即可
   ⚠️调用的时候要注意页面是入栈操作，千万别累积了太多的页面

这里为了更加直观的展示路由之间的跳转和转换，我将我项目里面封装的一个NavigatorUtils的代码展现出来

```
import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_xinqiu/page/home_page.dart';
import 'package:flutter_xinqiu/page/login_page.dart';
import 'package:flutter_xinqiu/page/noob_setting_page.dart';
import 'package:flutter_xinqiu/page/user_idea_page.dart';
import 'package:flutter_xinqiu/widget/custom_route.dart';

/**
 * 路由跳转
 * Created by xiaocheng123
 * Date: 2019-7-8
 */
class NavigatorUtils {
  ///替换
  static pushReplacementNamed(BuildContext context, String routeName) {
    Navigator.pushReplacementNamed(context, routeName);
  }

  ///切换无参数页面
  static pushNamed(BuildContext context, String routeName) {
    Navigator.pushNamed(context, routeName);
  }

  ///主页
  static goHome(BuildContext context) {
    Navigator.pushReplacementNamed(context, HomePage.sName);
  }

  ///登录页
  static goLogin(BuildContext context) {
    // Navigator.pushReplacementNamed(context, LoginPage.sName);
    Navigator.of(context).pushAndRemoveUntil(
    new MaterialPageRoute(builder: (context) => new LoginPage()
    ), (route) => route == null);
  }

  ///新手设置页面
  static goNoobSetting(BuildContext context) {
    Navigator.of(context).push(CustomRoute(NoobSettingPage()));
  }

  ///意见反馈设置页面
  static goUserIdea(BuildContext context) {
    Navigator.push(context,
        new CupertinoPageRoute(builder: (context) => pageContainer(UserIdeaPage())));
  }

  ///公共打开方式
  static NavigatorRouter(BuildContext context, Widget widget) {
    return Navigator.push(context,
        new CupertinoPageRoute(builder: (context) => pageContainer(widget)));
  }

  ///Page页面的容器，做一次通用自定义
  static Widget pageContainer(widget) {
    return MediaQuery(

        ///不受系统字体缩放影响
        data: MediaQueryData.fromWindow(WidgetsBinding.instance.window)
            .copyWith(textScaleFactor: 1),
        child: widget);
  }
}

```

在代码里面可以将跳转到某个路由进行封装起来，这样进行路由跳转的时候直接引用即可