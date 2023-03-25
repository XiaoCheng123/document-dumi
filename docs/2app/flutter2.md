---
order: 1.1
---

# flutter学习（二）flutter的布局和页面组件

## Flutter安装介绍

在这里，你必须得安装好你的开发者环境，并且运行你的第一个flutter程序了。如果你还不知道怎么开始，请参考[Flutter中文网安装教程](https://flutterchina.club/get-started/install/)或者[Flutter官网安装教程](https://flutter.dev/docs/get-started/test-drive?tab=androidstudio)进行安装环境。我这里就不多做介绍，安装过程有问题可以留言。

目前我开发是通过Android Stdio和VSCode进行开发，如果你是前端开发工程师，你会和我一样比较喜欢VSCode，但是涉及到Debug的时候，用Android Stdio确实更好。为了与大家同步，我也先跑了默认的Flutter项目，如下图：

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/flutter%E5%9B%BE%E7%89%87/4.png?raw=true)

默认的Flutter项目会对里面的初始页面做英文介绍，为了方便更加深入的理解，个人加入了新的注释。打开项目根目录下的lib/main.dart，即为项目的入口文件。
```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());   // Flutter项目运行之后的入口函数，这里运行MyApp这个类

class MyApp extends StatelessWidget {   // MyApp的类，继承StatelessWidget组件，表示其状态不会发生改变，但是其子组件可以为StatefulWidget组件
  @override   // 重写父类StatelessWidget的构造方法
  Widget build(BuildContext context) {  // 构造页面的函数，其中Context表示其上下文，即通过Context，可以对该组件进行操作
    return MaterialApp(   // 构造函数会返回一个组件，MaterialApp是一个Flutter框架的一个容器Widget
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue, // 声明组件的主题颜色
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),  // 表明MyHomePage为MaterialApp的子Widget，title为其传入子组件的值
    );
  }
}

class MyHomePage extends StatefulWidget {   // MyHomePage的类，继承StatefulWidget组件，表示其状态改变可以使页面发生改变
  MyHomePage({Key key, this.title}) : super(key: key);  // 这里的key为默认加上的，用来标记组件的唯一性，this.title为其构造函数的参数

  final String title;   // 该类的属性，方便构造函数进行构造

  @override
  _MyHomePageState createState() => _MyHomePageState();   // StatefulWidget组件的状态，默认命名为这样，通过createState()函数来返回该组件的页面布局
}

class _MyHomePageState extends State<MyHomePage> {    // 声明_MyHomePageState其为MyHomePage的State类
  int _counter = 0;   // _MyHomePageState的属性

  void _incrementCounter() {    // _MyHomePageState的函数
    setState(() {   // 通过setState进行改变数据，能够让页面也发生改变，如果直接赋值，则不行
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {  // 同上，该为构造页面的函数
    return Scaffold(    // 返回一个Scaffold容器Widget，下面即为对该容器的某些属性的声明
      appBar: AppBar(
        title: Text(widget.title),  // 声明该组件的appBar属性为一个AppBar的容器Widget，并且容器的title为一个Text文本组件，该Text组件的值为MyHomePage的title属性
      ),
      body: Center(   // Scaffold的body，声明其为一个Center容器Widget的页面，使其布局上下左右居中
        child: Column(  // 为Center组件的子组件，是一个按列方向排序的组件，其子组件可以有多个
          mainAxisAlignment: MainAxisAlignment.center,  // Column组件的属性
          children: <Widget>[   // Column组件的子组件，为垂直方向进行排序渲染
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(   // Scaffold的容器，即为图片右下角的按钮，当其点击触发_incrementCounter函数
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```

看到了这里，想必你也对Flutter有了一定的认识。简单的来说，Flutter项目就是一个**Wiget组件+WigetState组件状态**进行组件化的一个项目，而且其代码基本就是ast（抽象语法树）类型，能够快速的编译运行。

## 布局组件
这里就不对组件的含义和内容进行更深的讲解了，因为布局组件比较多，而且属性也很多，我这里就罗列几个比较会常用到的布局组件，如果不是很理解每个组件的含义的话，建议去[《Flutter实战》](https://book.flutterchina.club/chapter3/)这里看一下每个组件的含义。

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/flutter%E5%9B%BE%E7%89%87/5.png?raw=true)

## 页面组件

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/flutter%E5%9B%BE%E7%89%87/6.png?raw=true)

## 总结
Flutter的组件比较多，官网的英文文档也基本都有介绍和例子，如果不懂的话，可以留言。