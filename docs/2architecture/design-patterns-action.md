# 行为型模式
## 命令模式

### 说明

命令模式包含如下角色：

- Command: 抽象命令类
- ConcreteCommand: 具体命令类
- Invoker: 调用者
- Receiver: 接收者
- Client:客户类

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/3-1.jpeg?raw=true)

### 代码说明

``` ts
// 抽象命令类
interface Command {
  execute(): void;
}

// 具体命令类A
class ConcreteCommandA implements Command {
  private receiver: Receiver;

  constructor(receiver: Receiver) {
    this.receiver = receiver;
  }

  public execute() {
    this.receiver.actionA();
  }
}

// 具体命令类B
class ConcreteCommandB implements Command {
  private receiver: Receiver;

  constructor(receiver: Receiver) {
    this.receiver = receiver;
  }

  public execute() {
    this.receiver.actionB();
  }
}

// 接收者类
class Receiver {
  public actionA() {
    console.log("Receiver: Action A");
  }

  public actionB() {
    console.log("Receiver: Action B");
  }
}

// 调用者类
class Invoker {
  private onStart: Command;
  private onFinish: Command;

  constructor(onStart: Command, onFinish: Command) {
    this.onStart = onStart;
    this.onFinish = onFinish;
  }

  public doSomethingImportant() {
    console.log("Invoker: Do something important");
    this.onStart.execute();
    console.log("Invoker: Continue doing something important");
    this.onFinish.execute();
  }
}

// 使用示例
const receiver = new Receiver(); // 创建接收者类实例
const commandA = new ConcreteCommandA(receiver); // 创建具体命令类A实例，并传入接收者类实例
const commandB = new ConcreteCommandB(receiver); // 创建具体命令类B实例，并传入接收者类实例
const invoker = new Invoker(commandA, commandB); // 创建调用者类实例，并传入具体命令类A和B实例

invoker.doSomethingImportant(); // 调用调用者类的doSomethingImportant方法，输出：Invoker: Do something important\nReceiver: Action A\nInvoker: Continue doing something important\nReceiver: Action B
```

## 中介者模式

### 说明

中介者模式包含如下角色：

- Mediator: 抽象中介者
- ConcreteMediator: 具体中介者
- Colleague: 抽象同事类
- ConcreteColleague: 具体同事类


![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/3-2.jpeg?raw=true)

### 代码说明

``` ts
// 抽象中介者类
abstract class Mediator {
  public abstract notify(sender: object, event: string): void;
}

// 具体中介者类
class ConcreteMediator extends Mediator {
  private component1: Component1;
  private component2: Component2;

  constructor(component1: Component1, component2: Component2) {
    super();
    this.component1 = component1;
    this.component1.setMediator(this);
    this.component2 = component2;
    this.component2.setMediator(this);
  }

  // 实现中介者类的通知方法
  public notify(sender: object, event: string): void {
    if (event === "A") {
      console.log("Mediator reacts on A and triggers following operations:");
      this.component2.doC();
    }

    if (event === "D") {
      console.log("Mediator reacts on D and triggers following operations:");
      this.component1.doB();
      this.component2.doC();
    }
  }
}

// 抽象组件类
class BaseComponent {
  protected mediator: Mediator;

  constructor(mediator: Mediator = null) {
    this.mediator = mediator;
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

// 具体组件类1
class Component1 extends BaseComponent {
  public doA(): void {
    console.log("Component 1 does A.");
    this.mediator.notify(this, "A");
  }

  public doB(): void {
    console.log("Component 1 does B.");
    this.mediator.notify(this, "B");
  }
}

// 具体组件类2
class Component2 extends BaseComponent {
  public doC(): void {
    console.log("Component 2 does C.");
    this.mediator.notify(this, "C");
  }

  public doD(): void {
    console.log("Component 2 does D.");
    this.mediator.notify(this, "D");
  }
}

// 使用示例
const component1 = new Component1(); // 创建具体组件类1实例
const component2 = new Component2(); // 创建具体组件类2实例
const mediator = new ConcreteMediator(component1, component2); // 创建具体中介者类实例，并传入具体组件类1和2实例

console.log("Client triggers operation A.");
component1.doA(); // 调用具体组件类1的doA方法，输出：Component 1 does A.\nMediator reacts on A and triggers following operations:\nComponent 2 does C.

console.log("\nClient triggers operation D.");
component2.doD(); // 调用具体组件类2的doD方法，输出：Component 2 does D.\nMediator reacts on D and triggers following operations:\nComponent 1 does B.\nComponent 2 does C.
```

## 观察者模式

### 说明

观察者模式包含如下角色：

- Subject: 目标
- ConcreteSubject: 具体目标
- Observer: 观察者
- ConcreteObserver: 具体观察者

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/3-3.jpeg?raw=true)

### 代码说明

``` ts
// 主题接口
interface Subject {
  attach(observer: Observer): void; // 添加观察者
  detach(observer: Observer): void; // 移除观察者
  notify(): void; // 通知所有观察者
}

// 具体主题类
class ConcreteSubject implements Subject {
  private observers: Observer[] = [];

  public attach(observer: Observer) {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      console.log("Subject: Observer has been attached already.");
      return;
    }

    console.log("Subject: Attached an observer.");
    this.observers.push(observer);
  }

  public detach(observer: Observer) {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      console.log("Subject: Nonexistent observer.");
      return;
    }

    console.log("Subject: Detached an observer.");
    this.observers.splice(observerIndex, 1);
  }

  public notify() {
    console.log("Subject: Notifying observers...");
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  public someBusinessLogic() {
    console.log("\nSubject: I'm doing something important.");
    this.notify();
  }
}

// 观察者接口
interface Observer {
  update(subject: Subject): void; // 接收主题通知
}

// 具体观察者类A
class ConcreteObserverA implements Observer {
  public update(subject: Subject) {
    if (subject instanceof ConcreteSubject) {
      console.log("ConcreteObserverA: Reacted to the event.");
    }
  }
}

// 具体观察者类B
class ConcreteObserverB implements Observer {
  public update(subject: Subject) {
    if (subject instanceof ConcreteSubject) {
      console.log("ConcreteObserverB: Reacted to the event.");
    }
  }
}

// 使用示例
const subject = new ConcreteSubject(); // 创建具体主题类实例
```

## 状态模式

### 说明

状态模式包含如下角色：

- Context: 环境类
- State: 抽象状态类
- ConcreteState: 具体状态类

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/3-4.jpeg?raw=true)

### 代码说明

``` ts
// 抽象状态类
interface State {
  handle(context: Context): void;
}

// 具体状态类A
class ConcreteStateA implements State {
  public handle(context: Context) {
    console.log("ConcreteStateA handles the request.");
    context.state = new ConcreteStateB();
  }
}

// 具体状态类B
class ConcreteStateB implements State {
  public handle(context: Context) {
    console.log("ConcreteStateB handles the request.");
    context.state = new ConcreteStateA();
  }
}

// 上下文类
class Context {
  private _state: State;

  constructor(state: State) {
    this._state = state;
  }

  // 定义一个请求处理方法，委托给当前状态对象来处理
  public request() {
    this._state.handle(this);
  }

  // 定义一个状态属性，用于保存当前状态对象
  public get state(): State {
    return this._state;
  }

  public set state(state: State) {
    this._state = state;
  }
}

// 使用示例
const context = new Context(new ConcreteStateA()); // 创建上下文实例，并传入具体状态类A实例
context.request(); // 调用上下文的请求处理方法，输出：ConcreteStateA handles the request.
context.request(); // 再次调用上下文的请求处理方法，输出：ConcreteStateB handles the request.
```

## 策略模式

### 说明

策略模式包含如下角色：

- Context: 环境类
- Strategy: 抽象策略类
- ConcreteStrategy: 具体策略类

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/3-5.jpeg?raw=true)

### 代码说明

``` ts
// 策略接口
interface Strategy {
  doAlgorithm(data: string[]): string[];
}

// 具体策略类A
class ConcreteStrategyA implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}

// 具体策略类B
class ConcreteStrategyB implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}

// 环境类
class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  // 设置策略
  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  // 执行策略
  public doSomeBusinessLogic(data: string[]): string[] {
    const result = this.strategy.doAlgorithm(data);
    return result;
  }
}

// 使用示例
const context = new Context(new ConcreteStrategyA()); // 创建环境类实例，并传入具体策略类A实例
const data = ["a", "b", "c", "d", "e"]; // 创建数据
console.log("Client: Strategy is set to normal sorting.");
console.log(context.doSomeBusinessLogic(data).join(",")); // 调用环境类的方法，输出：a,b,c,d,e

console.log("\nClient: Strategy is set to reverse sorting.");
context.setStrategy(new ConcreteStrategyB()); // 设置具体策略类B实例
console.log(context.doSomeBusinessLogic(data).join(",")); // 调用环境类的方法，输出：e,d,c,b,a
```

