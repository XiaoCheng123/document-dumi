# 结构型模式

## [适配器模式](https://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/adapter.html#id16)

### 说明

做适配器，用户（Client）对接的目标（Target）接口不变，让适配器（Adapter）去适配外层

适配器模式包含如下角色：

- Target：目标抽象类
- Adapter：适配器类
- Adaptee：适配者类
- Client：客户类

适配器模式有对象适配器和类适配器两种实现：

对象适配器：

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/2-1.jpeg?raw=true)

类适配器：

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/2-2.jpeg?raw=true)

### 总结

可以随意更换接口，使用者还是透明去使用

### 代码说明

``` ts
// 目标接口
interface Target {
  request(): void;
}

// 适配者类
class Adaptee {
  public specificRequest() {
    console.log("Adaptee specific request");
  }
}

// 适配器类
class Adapter implements Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  public request() {
    console.log("Adapter request");
    this.adaptee.specificRequest();
  }
}

// 使用示例
const adaptee = new Adaptee(); // 创建适配者实例
const adapter = new Adapter(adaptee); // 创建适配器实例

adapter.request(); // 调用适配器的request方法，输出：Adapter request\nAdaptee specific request
```

## [桥接模式](https://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/bridge.html#id16)

### 说明

将具体的类（Implementor），抽象出来（Abstraction）通过扩充抽象来适配不同场景。类似不同平台的播放器。内部播放的代码一样

桥接模式包含如下角色：

- Abstraction：抽象类
- RefinedAbstraction：扩充抽象类
- Implementor：实现类接口
- ConcreteImplementor：具体实现类

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/2-3.jpeg?raw=true)

### 代码说明

``` ts
// 实现化接口
interface Implementation {
  operationImplementation(): string;
}

// 具体实现化类A
class ConcreteImplementationA implements Implementation {
  public operationImplementation() {
    return "ConcreteImplementationA";
  }
}

// 具体实现化类B
class ConcreteImplementationB implements Implementation {
  public operationImplementation() {
    return "ConcreteImplementationB";
  }
}

// 抽象化类
class Abstraction {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }

  // 定义抽象化类的操作方法
  public operation(): string {
    const implementationResult = this.implementation.operationImplementation();
    return `Abstraction: Base operation with:\n${implementationResult}`;
  }
}

// 扩展抽象化类
class ExtendedAbstraction extends Abstraction {
  public operation(): string {
    const implementationResult = this.implementation.operationImplementation();
    return `ExtendedAbstraction: Extended operation with:\n${implementationResult}`;
  }
}

// 使用示例
const implementationA = new ConcreteImplementationA(); // 创建具体实现化类A实例
const abstraction = new Abstraction(implementationA); // 创建抽象化类实例，并传入具体实现化类A实例
console.log(abstraction.operation()); // 调用抽象化类的操作方法，输出：Abstraction: Base operation with: ConcreteImplementationA

const implementationB = new ConcreteImplementationB(); // 创建具体实现化类B实例
const extendedAbstraction = new ExtendedAbstraction(implementationB); // 创建扩展抽象化类实例，并传入具体实现化类B实例
console.log(extendedAbstraction.operation()); // 调用扩展抽象化类的操作方法，输出：ExtendedAbstraction: Extended operation with: ConcreteImplementationB
```

### 总结

## [装饰模式](https://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/decorator.html#id16)

### 说明

装饰模式包含如下角色：

- Component: 抽象构件
- ConcreteComponent: 具体构件
- Decorator: 抽象装饰类
- ConcreteDecorator: 具体装饰类

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/2-4.jpeg?raw=true)

### 代码说明

``` ts
// 抽象组件类
interface Component {
  operation(): string;
}

// 具体组件类
class ConcreteComponent implements Component {
  public operation() {
    return "ConcreteComponent";
  }
}

// 抽象装饰器类
abstract class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  public operation() {
    return this.component.operation();
  }
}

// 具体装饰器类A
class ConcreteDecoratorA extends Decorator {
  public operation() {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

// 具体装饰器类B
class ConcreteDecoratorB extends Decorator {
  public operation() {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}

// 使用示例
const simple = new ConcreteComponent(); // 创建具体组件类实例
console.log("Client: I've got a simple component:");
console.log(simple.operation()); // 输出：ConcreteComponent

const decorator1 = new ConcreteDecoratorA(simple); // 创建具体装饰器类A实例，并传入具体组件类实例
const decorator2 = new ConcreteDecoratorB(decorator1); // 创建具体装饰器类B实例，并传入具体装饰器类A实例
console.log("\nClient: Now I've got a decorated component:");
console.log(decorator2.operation()); // 输出：ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))
```

## [外观模式](https://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/facade.html#id16)

### 说明

外观模式包含如下角色：

- Facade: 外观角色
- SubSystem:子系统角色

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/2-5.jpeg?raw=true)

### 代码说明

``` ts
// 子系统类A
class SubsystemA {
  public operationA(): string {
    return "Subsystem A operation";
  }
}

// 子系统类B
class SubsystemB {
  public operationB(): string {
    return "Subsystem B operation";
  }
}

// 外观类
class Facade {
  private subsystemA: SubsystemA;
  private subsystemB: SubsystemB;

  constructor(subsystemA: SubsystemA, subsystemB: SubsystemB) {
    this.subsystemA = subsystemA;
    this.subsystemB = subsystemB;
  }

  // 提供一个简单的接口来访问子系统的复杂功能
  public operation(): string {
    let result = "Facade initializes subsystems:\n";
    result += this.subsystemA.operationA();
    result += "\n";
    result += this.subsystemB.operationB();
    return result;
  }
}

// 使用示例
const subsystemA = new SubsystemA(); // 创建子系统A实例
const subsystemB = new SubsystemB(); // 创建子系统B实例
const facade = new Facade(subsystemA, subsystemB); // 创建外观实例，并传入子系统实例
console.log(facade.operation()); // 调用外观的操作方法，输出：Facade initializes subsystems:\nSubsystem A operation\nSubsystem B operation
```

## [享元模式](https://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/flyweight.html#id16)

### 说明

享元模式包含如下角色：

- Flyweight: 抽象享元类
- ConcreteFlyweight: 具体享元类
- UnsharedConcreteFlyweight: 非共享具体享元类
- FlyweightFactory: 享元工厂类

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/2-6.jpeg?raw=true)


### 代码说明

``` ts
// 享元接口
interface Flyweight {
  operation(uniqueState: string): void;
}

// 具体享元类
class ConcreteFlyweight implements Flyweight {
  private sharedState: string;

  constructor(sharedState: string) {
    this.sharedState = sharedState;
  }

  // 实现享元接口的操作方法
  public operation(uniqueState: string) {
    console.log(`ConcreteFlyweight: shared state (${this.sharedState}) and unique state (${uniqueState}).`);
  }
}

// 享元工厂类
class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = {};

  // 获取享元实例
  public getFlyweight(sharedState: string): Flyweight {
    if (!this.flyweights[sharedState]) {
      this.flyweights[sharedState] = new ConcreteFlyweight(sharedState);
    }
    return this.flyweights[sharedState];
  }

  // 列出享元实例
  public listFlyweights() {
    const count = Object.keys(this.flyweights).length;
    console.log(`FlyweightFactory: I have ${count} flyweights:`);
    for (const sharedState in this.flyweights) {
      console.log(sharedState);
    }
  }
}

// 使用示例
const factory = new FlyweightFactory(); // 创建享元工厂实例

// 获取享元实例并调用操作方法
const flyweight1 = factory.getFlyweight("shared state 1");
flyweight1.operation("unique state 1");

// 获取另一个享元实例并调用操作方法
const flyweight2 = factory.getFlyweight("shared state 2");
flyweight2.operation("unique state 2");

// 列出享元实例
factory.listFlyweights();
```

## [代理模式](https://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/proxy.html#id16)

### 说明

代理模式包含如下角色：

- Subject: 抽象主题角色
- Proxy: 代理主题角色
- RealSubject: 真实主题角色

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/2-7.jpeg?raw=true)

### 代码说明

``` ts
// 抽象主题接口
interface Subject {
  request(): void;
}

// 具体主题类
class RealSubject implements Subject {
  public request() {
    console.log("RealSubject: Handling request.");
  }
}

// 代理类
class Proxy implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request() {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log("Proxy: Checking access prior to firing a real request.");
    return true;
  }

  private logAccess(): void {
    console.log("Proxy: Logging the time of request.");
  }
}

// 使用示例
const realSubject = new RealSubject(); // 创建具体主题类实例
const proxy = new Proxy(realSubject); // 创建代理类实例，并传入具体主题类实例

proxy.request(); // 调用代理类的request方法，输出：Proxy: Checking access prior to firing a real request.\nRealSubject: Handling request.\nProxy: Logging the time of request.
```

