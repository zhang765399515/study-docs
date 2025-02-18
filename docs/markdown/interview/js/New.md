# 手写 new

开始手写之前我们需要知道new是什么，怎么样去使用？

## new 是什么？

在 JavaScript 中，new 是一个关键字，用来创建一个 对象实例。它常用于基于构造函数创建对象时，能够执行以下几个步骤：

- 创建一个新的空对象。
- 将该对象的 `__proto__` 属性指向构造函数的 prototype 属性。
- 执行构造函数中的代码（this 会指向新创建的对象）。
- 如果构造函数没有显式返回对象，new 会自动返回新创建的对象。

**基本语法**

```js
const obj = new ConstructorFunction();
```

## 示例

### 使用 new 创建实例

```javascript

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person("Alice", 30);
console.log(person1);  // 输出: Person { name: 'Alice', age: 30 }
```

### 如何 new 工作

- `new` 会创建一个新的空对象 `{}`
- 然后会将 `Person.prototype` 赋给这个新对象的 **proto**。
- `Person` 函数的代码会被执行，`this` 指向这个新对象，给新对象赋值 `name` 和 `age`。
- 返回的对象 `person1` 就是我们创建的 `Person` 类型的实例。

### 类（Class）和 new

从 ES6 开始，JavaScript 引入了 class 语法，它本质上还是使用了构造函数。new 用于实例化类的对象：

```javascript


class Animal {
  constructor(name) {
    this.name = name;
  }
}

const dog = new Animal("Dog");
console.log(dog.name);  // 输出: Dog
```

ok，接下来我们开始写new

## 实践

首先我们确定我们的目标：

::: info
使用new命令时， 它后面的函数依次执行下面的步骤。

1. 创建一个空对象， 作为将要自动返回的对象。

2. 将这个空对象的原型指向构造函数的 prototype 属性

3. 将空对象赋值给函数内部的 this 关键字

4. 开始执行构造函数内部的代码

:::

### 实践代码

```js
function _new() {
    // 转换为数组
    var arg = Array.prototype.slice.call(arguments);
    // 弹出第一个元素
    var constructor = arg.shift();
    // 声明空对象obj，并将obj的隐式原型指向构造函数的显式原型
    var obj = Object.create(constructor.prototype);

    // 执行构造函数
    var result = constructor.apply(obj, arg);

    // 返回构造函数的结果或新创建的对象
    return (typeof result === 'object' && result != null)
        ? result
        : obj;
}
```
