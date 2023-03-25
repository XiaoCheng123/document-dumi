# 创建型模式

## 简单工厂模式

### 说明

简单工厂模式包含如下角色：

- Factory：工厂角色 工厂角色负责实现创建所有实例的内部逻辑
- Product：抽象产品角色 抽象产品角色是所创建的所有对象的父类，负责描述所有实例所共有的公共接口
- ConcreteProduct：具体产品角色 具体产品角色是创建目标，所有创建的对象都充当这个角色的某个具体类的实例。

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/1-1.jpeg?raw=true)

### 代码展示

``` ts
interface Product {
  name: string;
  price: number;
}

class ConcreteProductA implements Product {
  public name = "Product A";
  public price = 100;
}

class ConcreteProductB implements Product {
  public name = "Product B";
  public price = 200;
}

class ProductFactory {
  public createProduct(type: string): Product {
    switch (type) {
      case "A":
        return new ConcreteProductA();
      case "B":
        return new ConcreteProductB();
      default:
        throw new Error("Invalid product type");
    }
  }
}

// 使用示例
const factory = new ProductFactory();
const productA = factory.createProduct("A");
const productB = factory.createProduct("B");

console.log(productA.name, productA.price); // "Product A", 100
console.log(productB.name, productB.price); // "Product B", 200
```

在这个示例中，我们定义了一个Product接口，该接口包含了产品的名称和价格。然后，我们定义了两个具体的产品类ConcreteProductA和ConcreteProductB，它们实现了Product接口，并分别定义了自己的名称和价格。

接下来，我们定义了一个工厂类ProductFactory，该类包含了一个createProduct方法，该方法根据传入的参数来创建不同的产品实例。在这个示例中，我们使用了一个简单的switch语句来判断要创建哪种产品。

### 总结

1.  当你需要什么，只需要传入一个正确的参数，就可以获取你所需要的对象，而无须知道其创建细节
2.  优点：创建交给专门的工厂，使用时传参即可；缺点：产品多了之后，代码会很复杂

## 工厂方法模式

### 说明

简单说明即为多工厂，也叫做工厂模式，输入类型，交给具体工厂去实例化

工厂方法模式包含如下角色：

*   Product：抽象产品
*   ConcreteProduct：具体产品
*   Factory：抽象工厂
*   ConcreteFactory：具体工厂

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/1-2.jpeg?raw=true)

### 总结

1.  工厂方法只关注抽象用户需要的东西。实例产品交给具体工厂去做，这样新增工厂会比较简单
2.  缺点就是一个工厂只生成一个产品

### 代码展示

``` ts
interface Product {
  name: string;
  price: number;
}

class ConcreteProductA implements Product {
  public name = "Product A";
  public price = 100;
}

class ConcreteProductB implements Product {
  public name = "Product B";
  public price = 200;
}

abstract class ProductFactory {
  public abstract createProduct(): Product;
}

class ConcreteProductFactoryA extends ProductFactory {
  public createProduct(): Product {
    return new ConcreteProductA();
  }
}

class ConcreteProductFactoryB extends ProductFactory {
  public createProduct(): Product {
    return new ConcreteProductB();
  }
}

// 使用示例
const factoryA = new ConcreteProductFactoryA();
const productA = factoryA.createProduct();

const factoryB = new ConcreteProductFactoryB();
const productB = factoryB.createProduct();

console.log(productA.name, productA.price); // "Product A", 100
console.log(productB.name, productB.price); // "Product B", 200
```

在这个示例中，我们定义了一个Product接口，该接口定义了产品的属性。然后，我们定义了两个具体的产品类ConcreteProductA和ConcreteProductB，它们实现了Product接口。

接下来，我们定义了一个抽象的ProductFactory类，该类定义了一个抽象的createProduct方法，用于创建产品。然后，我们定义了两个具体的工厂类ConcreteProductFactoryA和ConcreteProductFactoryB，它们分别实现了ProductFactory类，并实现了createProduct方法，用于创建具体的产品。

在使用时，我们首先创建一个具体的工厂对象，然后调用createProduct方法来创建产品。由于每个工厂只能创建一种产品，因此我们需要根据需要选择不同的工厂来创建不同的产品。

## 抽象工厂模式

### 说明

类似不同品牌的电视机，用户只管用电视机，具体什么样的电视机，换个工厂就可以换个品牌

抽象工厂模式包含如下角色：

- AbstractFactory：抽象工厂
- ConcreteFactory：具体工厂
- AbstractProduct：抽象产品
- Product：具体产品

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/1-3.jpeg?raw=true)

### 总结

1.  方便切换工厂
2.  如果工厂需要统一新增功能比较麻烦

### 代码展示

```
interface Button {
  render(): void;
}

interface Checkbox {
  render(): void;
}

interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class WindowsButton implements Button {
  public render() {
    console.log("Render a Windows button");
  }
}

class WindowsCheckbox implements Checkbox {
  public render() {
    console.log("Render a Windows checkbox");
  }
}

class MacButton implements Button {
  public render() {
    console.log("Render a Mac button");
  }
}

class MacCheckbox implements Checkbox {
  public render() {
    console.log("Render a Mac checkbox");
  }
}

class WindowsGUIFactory implements GUIFactory {
  public createButton(): Button {
    return new WindowsButton();
  }

  public createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

class MacGUIFactory implements GUIFactory {
  public createButton(): Button {
    return new MacButton();
  }

  public createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

// 使用示例
function renderGUI(factory: GUIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();

  button.render();
  checkbox.render();
}

renderGUI(new WindowsGUIFactory());
// 输出：
// "Render a Windows button"
// "Render a Windows checkbox"

renderGUI(new MacGUIFactory());
// 输出：
// "Render a Mac button"
// "Render a Mac checkbox"
```

在这个示例中，我们定义了两个产品族：按钮和复选框。我们使用接口Button和Checkbox来定义这两个产品族的公共接口，并在具体产品类中实现这些接口。

然后，我们定义了一个抽象工厂接口GUIFactory，该接口包含了两个方法createButton和createCheckbox，用于创建按钮和复选框。我们还定义了两个具体工厂类WindowsGUIFactory和MacGUIFactory，它们分别实现了GUIFactory接口，并分别创建了Windows和Mac风格的按钮和复选框。

最后，我们定义了一个renderGUI函数，该函数接受一个工厂对象作为参数，并使用该工厂对象来创建按钮和复选框，并调用它们的render方法来渲染界面。

## 建造者模式

### 说明

类似KFC套餐（Product），让服务员（Director）去让厨房员工（ConcreteBuilder）做好套餐，然后安装顺序给用户。或者汽车工厂让不同的配件公司生产配件

建造者模式包含如下角色：

*   Builder：抽象建造者
*   ConcreteBuilder：具体建造者
*   Director：指挥者
*   Product：产品角色

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/1-4.jpeg?raw=true)

### 总结

适合里面产品按照顺序或者需要共同处理

### 代码展示

``` ts
// 产品类
class Product {
  public parts: string[] = []; // 产品的各个部分

  // 添加部件
  public addPart(part: string) {
    this.parts.push(part);
  }

  // 列出部件
  public listParts() {
    console.log(`Product parts: ${this.parts.join(", ")}\n`);
  }
}

// 建造者接口
interface Builder {
  buildPartA(): void;
  buildPartB(): void;
  buildPartC(): void;
  getProduct(): Product;
}

// 具体建造者类
class ConcreteBuilder implements Builder {
  private product: Product;

  constructor() {
    this.reset();
  }

  // 重置产品实例
  public reset() {
    this.product = new Product();
  }

  // 构建部件A
  public buildPartA() {
    this.product.addPart("Part A");
  }

  // 构建部件B
  public buildPartB() {
    this.product.addPart("Part B");
  }

  // 构建部件C
  public buildPartC() {
    this.product.addPart("Part C");
  }

  // 获取产品实例
  public getProduct(): Product {
    const result = this.product;
    this.reset();
    return result;
  }
}

// 指挥者类
class Director {
  private builder: Builder;

  // 设置建造者
  public setBuilder(builder: Builder) {
    this.builder = builder;
  }

  // 构建最小化产品
  public buildMinimalProduct() {
    this.builder.buildPartA();
  }

  // 构建完整产品
  public buildFullProduct() {
    this.builder.buildPartA();
    this.builder.buildPartB();
    this.builder.buildPartC();
  }
}

// 使用示例
const director = new Director(); // 创建指挥者实例
const builder = new ConcreteBuilder(); // 创建具体建造者实例
director.setBuilder(builder); // 设置建造者

director.buildMinimalProduct(); // 构建最小化产品
const minimalProduct = builder.getProduct(); // 获取产品实例
minimalProduct.listParts(); // 列出部件，输出：Product parts: Part A

director.buildFullProduct(); // 构建完整产品
const fullProduct = builder.getProduct(); // 获取产品实例
fullProduct.listParts(); // 列出部件，输出：Product parts: Part A, Part B, Part C
```

## 单例模式

### 说明

需要有一个变量标记已经声明过，或者可以在全局查找已声明

用法广泛，单例模式包含如下角色：

*   Singleton：单例

![0](https://github.com/XiaoCheng123/markdownImg/blob/master/dumi/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/1-5.jpeg?raw=true)

### 注意

- 单例类的构造函数为私有；
- 提供一个自身的静态私有成员变量；
- 提供一个公有的静态工厂方法

### 代码展示

``` ts
class Singleton {
  private static instance: Singleton;

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public someMethod() {
    console.log("I am the instance");
  }
}

// 使用示例
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true

instance1.someMethod(); // "I am the instance"
```

在这个示例中，我们使用了一个立即执行函数来创建一个闭包，以便我们可以在其中定义私有变量和函数。我们定义了一个instance变量来存储单例实例，并且定义了一个createInstance函数来创建该实例。我们还定义了一个getInstance函数，该函数检查instance变量是否已经存在，如果不存在，则调用createInstance函数来创建实例，并返回该实例。

在使用时，我们只需要调用Singleton.getInstance()函数来获取单例实例。由于该实例是全局唯一的，因此我们可以在任何地方使用它。
