# 函数隐式转换

先来看道题

```js
var a = function () { return 5 }
a.toString = function () { return 3 }
console.log(a + 7); // 10
```

这题的输出结果为 `10`。

## 代码分析

```javascript
var a = function () { return 5 };
a.toString = function () { return 3 };
console.log(a + 7);
```

**1. 定义函数并赋值给变量**

```javascript
var a = function () { return 5 };
```

这里定义了一个匿名函数，并将其赋值给变量 a。此时 a 是一个`函数对象`，调用 `a()` 会返回 5。

**2. 重写 a 的 toString 方法**

```javascript
a.toString = function () { return 3 };
```

在 JavaScript 中，每个对象都有一个 `toString` 方法，当需要将对象转换为字符串时，会调用该方法。这里重写了 a 函数对象的 toString 方法，使其返回数字 `3`。

**3. 执行 a + 7 操作**

```javascript
console.log(a + 7);
```

在 JavaScript 中进行 + 运算时，若操作数中有对象，JavaScript 引擎会尝试将对象 `转换为原始值`。

对于对象而言，转换时会优先调用 `valueOf` 方法，如果 `valueOf` 方法返回的不是原始值，就会调用 `toString` 方法。

在这个例子中，a 作为函数对象，默认的 `valueOf` 方法返回的就是函数本身，并非原始值，所以引擎会接着调用我们重写后的 `toString` 方法。`toString` 方法返回 `3` ，这个 `3` 是一个原始值（数字类型）。

此时 `a + 7` 就相当于 `3 + 7` ，进行数值相加后结果为 `10` 。所以 `console.log(a + 7)` 最终输出的是 10 。
