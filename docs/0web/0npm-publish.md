# 发布npm

## 初始化npm项目
新建文件夹，输入下面的命令，根据提示输入需要的信息初始化package.json
```
npm init
```

## 更新npm版本
假设现在的package.json里面version为0.1.0，输入以下命令自动更新版本
```
npm version patch
// vsersion更新成0.1.1
npm version prepatch
// vsersion更新成0.1.0-0
npm version minor
// vsersion更新成0.2.0
npm version major
// vsersion更新成1.1.0
```
其中，version命名方式为MAJOR.MINOR.PATCH:
1. MAJOR 表示主版本号，当你做了不兼容的API修改；
1. MINOR 表示次版本号，当你做了向下兼容的功能性新增；
1. PATCH 表示修订号,当你做了向下兼容的问题修正;

## 发布npm

### 认识package.json
发布npm之前认识一下package.json的主要属性：
1. name：作者名字
1. version：当前npm版本
1. main：外部引用npm之后的入口文件

代码：
```
{
  "name": "alen-test",
  "version": "0.1.1",
  "main": "./dist/main.js"
}
```

### 注册npm
在[npm官网](https://www.npmjs.com/)注册一个账号

### 发布
在控制台切换到项目根目录输入下面登陆个人npm信息
```
npm login
```
然后运行下面这行命令即可发布
```
npm publish
```

## 发布npm测试版本
npm和app一样，有beta版本和alpha。其中：
1. beta：表示正在测试的版本
1. alpha：稳定版本

正常我们npm publish发布的版本都为正式版本，别人可以通过npm install直接下载或者更新版本

> 这时候我们想发布测试版本改怎么办呢

修改我们的npm包的package.json的version为x.x.x-beta.0，后面的0可以跟随发布测试版本的包名而增加，然后运行
```
npm publish --tag beta
```
这样，别人如果要下载只能通过这样的命令下载了，直接下载是无法下载的
```
npm i alen-test@x.x.x-beta.0
```

## 项目中进行版本控制

> npm版本经常会因为作者或者社区的修改而改变。但是项目中需要一个稳定的版本怎么办呢？

这时候package-lock.json的作用就来了，这个文件就是用来当你第一次npm install下载的时候自动生成的，这个会规定你下载的npm版本。

在多人合作的时候，package-lock.json是不可删除的，不然可能会引起很大的问题。

关于package-lock.json更多详情见[node官网](http://nodejs.cn/learn/the-package-lock-json-file)的解释
