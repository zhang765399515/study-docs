# 工厂模式

## 什么是工厂模式？

工厂函数（Factory Function）是 JavaScript 中一种用于创建对象的函数，而不是通过类或构造函数来创建对象。它返回一个对象实例，并且通常可以包含一些逻辑，用于初始化对象的属性或方法。这种方法非常灵活，适合动态地创建对象。

设计原理：根据参数的不同创建不同对象

## 实现

UML图如下
![alt text](/img/JS/factoryPatternUML.png)

工厂模式通常包含一个工厂类，它的职责是创建对象，同时隐藏了对象的创建细节。客户端代码只需要通过工厂类的方法来获取需要的对象即可，而不必知道对象是如何创建的。

::: tip 优点
    1、避免使用 new 的副作用：new 会将 this 绑定到新创建的对象，如果忘记使用 new 调用构造函数，this 的绑定可能出错。
    2、更灵活：可以根据条件返回不同类型的对象，或者为对象添加额外的功能。

    3、支持闭包：工厂函数可以通过闭包隐藏内部的私有数据。

    4、不依赖类：对于不需要继承的对象，工厂函数比类更轻量级。
:::

示例：
```js
interface Component {
  render(): void;
}

class Button implements Component {
  constructor(private text: string) {}
  render() {
    console.log(`Rendering button: ${this.text}`);
  }
}

class Input implements Component {
  constructor(private placeholder: string) {}
  render() {
    console.log(`Rendering input: ${this.placeholder}`);
  }
}

class ComponentFactory {
  static create(type: string, props: Record<string, any>): Component {
    switch (type) {
      case "button":
        return new Button(props.text);
      case "input":
        return new Input(props.placeholder);
      default:
        throw new Error(`Type ${type} is not supported`);
    }
  }
}

// 创建按钮组件
const button = ComponentFactory.create("button", { text: "Click me!" });
button.render();
```

以上代码中，`Button`,`input` 类表示要创建的产品，`ComponentFactory` 类实现了工厂模式，通过 `create` 方法创建产品实例。在使用时，可以通过工厂类创建产品实例，而不需要直接调用产品类的构造函数。通过工厂模式可以将对象的创建和使用分离，提高代码的灵活性和可维护性。




## 缺点

### 1、性能问题

工厂函数每次调用时，都会重新创建方法，无法共享方法实例。相比之下，使用 class 或原型链可以实现方法共享，从而减少内存开销。

```js 
function createPerson(name) {
    return { name, greet() { console.log(`Hi, I'm ${name}`); } };
}
const person1 = createPerson("Alice");
const person2 = createPerson("Bob");
console.log(person1.greet === person2.greet); // false （方法无法共享）
```
使用 `class` 时：
```js
class Person {
    constructor(name) { this.name = name; }
    greet() { console.log(`Hi, I'm ${this.name}`); }
}
const person1 = new Person("Alice");
const person2 = new Person("Bob");
console.log(person1.greet === person2.greet); // true （方法共享）

```

## 2、不支持原型继承

- 工厂函数创建的对象不会自动绑定到原型链，无法直接使用继承机制。
- 如果需要扩展功能，可能需要手动实现继承逻辑。

::: tip 注意
工厂函数在项目中属于常见的几种模式，建议还是深入了解，如抽象工厂函数的使用等。
:::





# 参考文献：

<CustomLink title='《前端必须掌握的7种设计模式》'  href='https://juejin.cn/post/7215967453929586748?searchId=20241119111427B4F091518F009CBC2971'/>
<CustomLink title='《设计模式在前端开发中的实践（十三）——工厂模式》'  href='https://juejin.cn/post/7326080299943002152'/>