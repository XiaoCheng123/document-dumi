# egg入门

非前端或者后端，而是一个**孕育企业级框架**而生的一个框架：

## 基本原理

1. 插件式开发
2. 渐进式开发（可以从插件 -> 企业通用框架）
3. 有特定的规范
4. 继承于Koa（所以得明白Koa的一些基本概念，例如Application, Context, Request, Response）

### 基础功能
基础功能大致有以下方面：
- 目录结构
- 内置对象
- 运行环境
- 配置
- 中间件
- 路由（Router）
- 控制器（Controller）
- 服务（Service）
- 插件
- 定时任务
- 框架扩展
- 启动自定义

### 目录规范
https://eggjs.org/zh-cn/basics/structure.html

### 内置对象
包括从 Koa 继承而来的 4 个对象（Application, Context, Request, Response) 以及框架扩展的一些对象（Controller, Service, Helper, Config, Logger）

#### Application
即全局对象，做一些统一的错误处理，可以监听server，error，request和response事件

例如
```
// app.js

module.exports = app => {
  app.once('server', server => {
    // websocket
  });
  app.on('error', (err, ctx) => {
    // report error
  });
  app.on('request', ctx => {
    // log receive request
  });
  app.on('response', ctx => {
    // ctx.starttime is set by framework
    const used = Date.now() - ctx.starttime;
    // log total cost
  });
};
```

> 引用方式：在继承于 Controller, Service 基类的实例中，可以通过 this.app 访问到 Application 对象，也可以通过context进行获取， 例如 this.ctx.app

#### Context
继承自 Koa.Context。在每一次收到用户请求时，框架会实例化一个 Context 对象，这个对象封装了这次用户请求的信息，并提供了许多便捷的方法来获取请求参数或者设置响应信息

> 引用方式：与Koa一致， #TODO 补充Koa获取方式

#### Request & Response

Request 是一个请求级别的对象，继承自 Koa.Request。封装了 Node.js 原生的 HTTP Request 对象，提供了一系列辅助方法获取 HTTP 请求常用参数。

Response 是一个请求级别的对象，继承自 Koa.Response。封装了 Node.js 原生的 HTTP Response 对象，提供了一系列辅助方法设置 HTTP 响应。

> 引用方式，通过context进行引用，例如 Request(ctx.request) 和 Response(ctx.response)

注意事项：
- Koa 会在 Context 上代理一部分 Request 和 Response 上的方法和属性，参见 [Koa.Context](https://koajs.com/#context)。
- 如上面例子中的ctx.request.query.id和ctx.query.id是等价的，ctx.response.body= 和 ctx.body= 是等价的。
- 需要注意的是，获取 POST 的 body 应该使用 ctx.request.body，而不是 ctx.body。

#### Controller

框架提供了一个 Controller 基类，并推荐所有的 Controller 都继承于该基类实现。这个 Controller 基类有下列属性：

- ctx - 当前请求的 Context 实例。
- app - 应用的 Application 实例。
- config - 应用的配置。
- service - 应用所有的 service。
- logger - 为当前 controller 封装的 logger 对象。

示例：
```
// app/controller/user.js

// 从 egg 上获取（推荐）
const Controller = require('egg').Controller;
class UserController extends Controller {
  // implement
}
module.exports = UserController;

// 从 app 实例上获取
module.exports = app => {
  return class UserController extends app.Controller {
    // implement
  };
};
```

#### Service
框架提供了一个 Service 基类，并推荐所有的 Service 都继承于该基类实现。属性与Controller一致

示例：
```
// app/service/user.js

// 从 egg 上获取（推荐）
const Service = require('egg').Service;
class UserService extends Service {
  // implement
}
module.exports = UserService;

// 从 app 实例上获取
module.exports = app => {
  return class UserService extends app.Service {
    // implement
  };
};
```

#### Helper
Helper 自身是一个类，有和 Controller 基类一样的属性.它的作用在于我们可以将一些常用的动作抽离在 helper.js 里面成为一个独立的函数，这样可以用 JavaScript 来写复杂的逻辑，避免逻辑分散各处，同时可以更好的编写测试用例。

> 引用方式：可以在 Context 的实例上获取到当前请求的 Helper(ctx.helper) 实例。

#### Config
一些需要硬编码的业务配置都放到配置文件中，具体可阅读[文档](https://eggjs.org/zh-cn/basics/config.html)

> 引用方式：我们可以通过 app.config 从 Application 实例上获取到 config 对象，也可以在 Controller, Service, Helper 的实例上通过 this.config 获取到 config 对象。

#### Logger
框架内置了功能强大的日志功能，可以非常方便的打印各种级别的日志到对应的日志文件中，每一个 logger 对象都提供了 4 个级别的方法：

- logger.debug()
- logger.info()
- logger.warn()
- logger.error()

> 引用方式：通过Application获取，例如app.logge

注意事项：

框架还有多个logger对象，不同场景运用不同的对象，详情阅读API

#### Subscription
订阅模型是一种比较常见的开发模式，譬如消息中间件的消费者或调度任务。因此我们提供了 Subscription 基类来规范化这个模式。

可以通过以下方式来引用 Subscription 基类：
```
const Subscription = require('egg').Subscription;

class Schedule extends Subscription {
  // 需要实现此方法
  // subscribe 可以为 async function 或 generator function
  async subscribe() {}
}
```

应用场景：定时任务

### 运行环境
通过app.config.env区分环境，具体可阅读API

### Config 配置
框架提供了强大且可扩展的配置功能，可以自动合并应用、插件、框架的配置，按顺序覆盖，且可以根据环境维护不同的配置。合并后的配置可直接从 app.config 获取。

### 中间件
Egg 是基于 Koa 实现的，所以 Egg 的中间件形式和 Koa 的中间件形式是一样的，都是基于洋葱圈模型。每次我们编写一个中间件，就相当于在洋葱外面包了一层。

![image](https://camo.githubusercontent.com/d80cf3b511ef4898bcde9a464de491fa15a50d06/68747470733a2f2f7261772e6769746875622e636f6d2f66656e676d6b322f6b6f612d67756964652f6d61737465722f6f6e696f6e2e706e67)

#### 写法
示例
```
// app/middleware/gzip.js
const isJSON = require('koa-is-json');
const zlib = require('zlib');

async function gzip(ctx, next) {
  await next();

  // 后续中间件执行完成后将响应体转换成 gzip
  let body = ctx.body;
  if (!body) return;
  if (isJSON(body)) body = JSON.stringify(body);

  // 设置 gzip body，修正响应头
  const stream = zlib.createGzip();
  stream.end(body);
  ctx.body = stream;
  ctx.set('Content-Encoding', 'gzip');
}
```

> 具体用法可看官方文档

### 路由（Router）

#### 定义 Router

示例：app/router.js 里面定义 URL 路由规则
```
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/user/:id', controller.user.info);
};
```
```
// app/controller/user.js
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    ctx.body = {
      name: `hello ${ctx.params.id}`,
    };
  }
}
```

#### 注意事项

- 在 Router 定义中， 可以支持多个 Middleware 串联执行
- Controller 必须定义在 app/controller 目录中。
- 一个文件里面也可以包含多个 Controller 定义，在定义路由的时候，可以通过 ${fileName}.${functionName} 的方式指定对应的 Controller。
- Controller 支持子目录，在定义路由的时候，可以通过 ${directoryName}.${fileName}.${functionName} 的方式制定对应的 Controller。

#### 路由代理（RESTful 风格的 URL 定义）
示例：
```
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.resources('posts', '/api/posts', controller.posts);
  router.resources('users', '/api/v1/users', controller.v1.users); // app/controller/v1/users.js
};
```

### 控制器（Controller）

通过 Router 将用户的请求基于 method 和 URL 分发到了对应的 Controller 上，那 Controller 负责做什么？

简单的说 Controller 负责解析用户的输入，处理后返回相应的结果

### 服务（Service）

简单来说，Service 就是在复杂业务场景下用于做业务逻辑封装的一个抽象层，提供这个抽象有以下几个好处：

- 保持 Controller 中的逻辑更加简洁。
- 保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。
- 将逻辑和展现分离，更容易编写测试用例。

### 插件
它不但可以保证框架核心的足够精简、稳定、高效，还可以促进业务逻辑的复用，生态圈的形成

### 定时任务

框架开发的 HTTP Server 是请求响应模型的，但是仍然还会有许多场景需要执行一些定时任务，例如：

- 定时上报应用状态。
- 定时从远程接口更新本地缓存。
- 定时进行文件切割、临时文件删除。

### 生命周期
框架提供了这些 生命周期函数供开发人员处理：

- 配置文件即将加载，这是最后动态修改配置的时机（configWillLoad）
- 配置文件加载完成（configDidLoad）
- 文件加载完成（didLoad）
- 插件启动完毕（willReady）
- worker 准备就绪（didReady）
- 应用启动完成（serverDidReady）
- 应用即将关闭（beforeClose）

示例：
```
// app.js
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

    // 例如：参数中的密码是加密的，在此处进行解密
    this.app.config.mysql.password = decrypt(this.app.config.mysql.password);
    // 例如：插入一个中间件到框架的 coreMiddleware 之间
    const statusIdx = this.app.config.coreMiddleware.indexOf('status');
    this.app.config.coreMiddleware.splice(statusIdx + 1, 0, 'limit');
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务

    // 例如：创建自定义应用的示例
    this.app.queue = new Queue(this.app.config.queue);
    await this.app.queue.init();

    // 例如：加载自定义的目录
    this.app.loader.loadToContext(path.join(__dirname, 'app/tasks'), 'tasks', {
      fieldClass: 'tasksClasses',
    });
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用

    // 例如：从数据库加载数据到内存缓存
    this.app.cacheData = await this.app.model.query(QUERY_CACHE_SQL);
  }

  async didReady() {
    // 应用已经启动完毕

    const ctx = await this.app.createAnonymousContext();
    await ctx.service.Biz.request();
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例

    this.app.server.on('timeout', socket => {
      // handle socket timeout
    });
  }
}

module.exports = AppBootHook;
```

## egg的核心功能

egg核心功能分为：
- 本地开发
- 单元测试
- 应用部署
- 日志
- HttpClient
- Cookie and Session
- 多进程模型和进程间通讯
- 模板渲染
- 异常处理
- 安全
- 国际化

## 本地开发
本地环境，测试和调试相关，详情可看[文档](https://eggjs.org/zh-cn/core/development.html)

## 单元测试
对各个模块进行单元测试，具体可阅读文档

## 应用部署
### 构建

### 部署
框架内置了 egg-cluster 来启动 Master 进程，Master 有足够的稳定性，不再需要使用 pm2 等进程守护模块。

框架也提供了 egg-scripts 来支持线上环境的运行和停止

### 监控
我们还需要对服务进行性能监控，内存泄露分析，故障排除等。

业界常用的有：

- Node.js 性能平台（alinode）
- NSolid

Node.js 性能平台 是面向所有 Node.js 应用提供 性能监控、安全提醒、故障排查、性能优化 等服务的整体性解决方案，提供完善的工具链和服务，协助开发者快速发现和定位线上问题。

### 日志
框架内置了强大的企业级日志支持，由 egg-logger 模块提供。

主要特性：

- 日志分级
- 统一错误日志，所有 logger 中使用 .error() 打印的 ERROR 级别日志都会打印到统一的错误日志文件中，便于追踪
- 启动日志和运行日志分离
- 自定义日志
- 多进程日志
- 自动切割日志
- 高性能

### HttpClient
互联网时代，无数服务是基于 HTTP 协议进行通信的，Web 应用调用后端 HTTP 服务是一种非常常见的应用场景。

为此框架基于 urllib 内置实现了一个 HttpClient，应用可以非常便捷地完成任何 HTTP 请求。

### Cookie 与 Session
见文档

### 多进程模型和进程间通讯
#### Cluster 是什么呢？
简单的说，

- 在服务器上同时启动多个进程。
- 每个进程里都跑的是同一份源代码（好比把以前一个进程的工作分给多个进程去做）。
- 更神奇的是，这些进程可以同时监听一个端口（具体原理推荐阅读 @DavidCai1993 这篇 Cluster 实现原理）。


其中：

- 负责启动其他进程的叫做 Master 进程，他好比是个『包工头』，不做具体的工作，只负责启动其他进程。
- 其他被启动的叫 Worker 进程，顾名思义就是干活的『工人』。它们接收请求，对外提供服务。
- Worker 进程的数量一般根据服务器的 CPU 核数来定，这样就可以完美利用多核资源。

### View 模板渲染

## 进阶模块

### Mysql
下载安装请看[官方文档](https://eggjs.org/zh-cn/tutorials/mysql.html)

数据库配置：
```
// config/config.${env}.js
exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: 'mysql.com',
    // 端口号
    port: '3306',
    // 用户名
    user: 'test_user',
    // 密码
    password: 'test_password',
    // 数据库名
    database: 'test',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
```

使用方式：

app.mysql.method(),method为：
- get 查询单条记录
- insert 插入记录
- select 查询全表
- update 更新记录
- delete 删除记录
- query 查询sql语句（！不建议）

手动事务：

- 优点：beginTransaction, commit 或 rollback 都由开发者来完全控制，可以做到非常细粒度的控制。
- 缺点：手写代码比较多，不是每个人都能写好。忘记了捕获异常和 cleanup 都会导致严重 bug。

```
const conn = await app.mysql.beginTransaction(); // 初始化事务

try {
  await conn.insert(table, row1);  // 第一步操作
  await conn.update(table, row2);  // 第二步操作
  await conn.commit(); // 提交事务
} catch (err) {
  // error, rollback
  await conn.rollback(); // 一定记得捕获异常后回滚事务！！
  throw err;
}
```

自动控制事务：Transaction with scope

- API：beginTransactionScope(scope, ctx)scope: 一个 generatorFunction，在这个函数里面执行这次事务的所有 sql 语句。ctx: 当前请求的上下文对象，传入ctx可以保证即便在出现事务嵌套的情况下，一次请求中同时只有一个激活状态的事务。
- 优点：使用简单，不容易犯错，就感觉事务不存在的样子。
- 缺点：整个事务要么成功，要么失败，无法做细粒度控制。

```
const result = await app.mysql.beginTransactionScope(async conn => {
  // don't commit or rollback by yourself
  await conn.insert(table, row1);
  await conn.update(table, row2);
  return { success: true };
}, ctx); // ctx 是当前请求的上下文，如果是在 service 文件中，可以从 `this.ctx` 获取到
// if error throw on scope, will auto rollback
```

### sequelize
**ORM** 框架，它支持 MySQL、PostgreSQL、SQLite 和 MSSQL 等多个数据源。

### RESTful API
在 RESTful 风格的设计中，通过响应状态码来标识响应的状态，保持响应的 body 简洁，只返回接口数据。

### Passport
『登录鉴权』 是一个常见的业务场景，包括『账号密码登录方式』和『第三方统一登录』。

Passport 是一个扩展性很强的认证中间件，支持 Github，Twitter，Facebook 等知名服务厂商的 Strategy，同时也支持通过账号密码的方式进行登录授权校验。

