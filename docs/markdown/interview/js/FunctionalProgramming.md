# 什么是函数式编程？

函数式编程（Functional Programming, FP） 是一种编程范式，强调使用 纯函数（Pure Function） 进行计算，并避免 可变状态（Mutable State） 和 副作用（Side Effects）。它起源于数学中的 λ（lambda）演算，主要特点包括：

## 1. 核心概念

### 纯函数（Pure Function）

- **相同输入** 必定 **返回相同输出**，不依赖或修改外部状态。

- **无副作用**（不会修改全局变量、文件、数据库等）。

✅ **例子（纯函数）**：

```js

function add(a, b) {
  return a + b; // 仅依赖参数，不修改外部变量
}
console.log(add(2, 3)); // 5
```

❌ **非纯函数（有副作用）**：

```js
let total = 0;
function addToTotal(value) {
  total += value; // 修改外部变量 total
}
addToTotal(5);
console.log(total); // 5
```


### 不可变数据（Immutability）

- 变量**不能被修改**，只能返回新的数据。

- 避免**共享状态**，防止**竞态条件**（Race Condition）。

✅ **例子（不可变数据）**：

```js
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // 复制数组后添加新元素
console.log(newArr); // [1, 2, 3, 4]
```

❌ **可变数据（不推荐）**：

```js
let arr = [1, 2, 3];
arr.push(4); // 修改了原数组
console.log(arr); // [1, 2, 3, 4]
```

### 高阶函数（Higher-Order Function）

- **接受函数作为参数** 或 **返回一个函数**。

✅**例子（高阶函数）**：

```js
function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}
const double = multiplier(2);
console.log(double(5)); // 10
```

### 函数作为一等公民（First-Class Function）

- 函数可以**赋值给变量**，作为 **参数** 传递，**作为返回值**。
✅ **例子**：

```js
const greet = (name) => `Hello, ${name}`;
const sayHello = greet;
console.log(sayHello("Alice")); // "Hello, Alice"
```

### 递归（Recursion）替代循环

- **避免使用 for/while 循环**，用递归解决问题。
✅ **例子（递归求阶乘）**：

```js
function factorial(n) {
  return n === 0 ? 1 : n * factorial(n - 1);
}
console.log(factorial(5)); // 120
```

### 组合（Composition）

- 通过组合小函数 构建复杂功能，而不是写一个庞大的函数。
✅ **例子（函数组合）**：

```js
const toUpperCase = (str) => str.toUpperCase();
const appendExclamation = (str) => str + "!";
const excitedGreeting = (str) => appendExclamation(toUpperCase(str));

console.log(excitedGreeting("hello")); // "HELLO!"
```

## 2. 常见的函数式编程方法

### map()：映射

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
```

### filter()：过滤

```js
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
```

### reduce()：累加

```js
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
```

## 3. 函数式编程 vs 命令式编程

| 内容 | 函数式编程（FP）| 命令式编程（Imperative）|
| ------ | ------ | ----------- |
|**核心思想** | **声明式，描述“做什么”** | **命令式，描述“怎么做”** |
|**状态** | **不可变（Immutable）**| **可变（Mutable）**|
|**副作用**| **尽量避免** | **可能修改全局状态** |
|**循环**| **递归/高阶函数** | **for / while** |
|示例 |`arr.map(n => n * 2)` |`for (let i = 0; i < arr.length; i++)`|

## 4. JavaScript 框架中的 FP

**React**：`useReducer()`、`useMemo()`、`useCallback()` 等都基于函数式思想。
**Redux**：State `不可变`，使用纯函数 reducer()。
**Ramda/Lodash**：提供 FP 工具，如 compose()、curry()。

✅ React 例子（useReducer）：

```js
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};
const [count, dispatch] = useReducer(reducer, 0);
```

## 5. 总结

函数式编程的核心理念：

::: tip

- **使用纯函数**
- **避免副作用**
- **保持数据不可变**
- **利用高阶函数**
- **通过组合构建程序**
:::

在现代 JavaScript 开发中（尤其是 React/Redux），**函数式编程已成为主流趋势之一**。你可以尝试在项目中更多使用 map、filter、reduce 等方法，减少副作用，让代码更清晰、可维护
