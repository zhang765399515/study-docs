# 什么是闭包？

本文记录自己对闭包的理解。

## 先总结

::: tip

- 闭包是指` 有权 `访问另一个函数作用域中的变量的函数。
- 创建闭包的常见方式是在一个函数内部创建另一个函数，内部函数引用了外部函数的变量，导致这些变量不会被回收。闭包使得函数可以记住并访问其词法作用域，即使函数在其词法作用域之外执行。
- 例如，在一个计数器函数中，返回一个增加计数器的函数，计数器变量被闭包保持，不会被销毁。
:::

## 理解

1. 专业的说，闭包就是JS中函数和其周围状态（词法环境）的组合

    - 也就是说，闭包允许函数访问并记住其创建时的作用域中的变量，即使这个函数在其词法作用域之外执行。

2. 粗略而言，内部函数可以访问外部函数的变量，即使外部函数已经执行完毕了，这就是闭包。

    - 举个例子，比如说，在一个函数内部定义了另一个函数，内部函数引用了外部函数的变量。当外部函数执行完后，内部函数仍然可以访问那些变量，这时候就会形成闭包。

## 优点

1. **数据封装与隐藏**: 闭包允许在函数外部无法访问到函数内部的变量，这就相当于在函数内部创建了私有变量。

    例如，可以将一些不希望暴露的变量封装在闭包中，只通过特定的方法来访问它们，从而实现数据的封装。

    ```js
    function counter() {
    let count = 0;
    return {
        increment: function() {
        count++;
        return count;
        },
        decrement: function() {
        count--;
        return count;
        },
        getCount: function() {
        return count;
        }
    };
    }

    const myCounter = counter();
    console.log(myCounter.increment()); // 1
    console.log(myCounter.getCount()); // 1
    ```

2. **保持状态**: 闭包可以“记住”其词法作用域中的变量，即使外部函数已经执行完毕，内部函数仍然可以访问外部函数的局部变量。

    例如，计数器、缓存等。

    ```js
    function createCounter() {
        let count = 0;
        return function() {
            count++;
            return count;
        };
    }

    const counter1 = createCounter();
    console.log(counter1()); // 1
    console.log(counter1()); // 2
    ```

3. **延迟执行与回调**: 闭包常用于回调函数和延迟执行的场景。由于闭包能够“记住”它的创建环境，它在异步编程中非常有用

    例如，setTimeout 和 setInterval 中的回调函数。

```JS
    function greet(name) {
        setTimeout(function() {
            console.log('Hello, ' + name);
        }, 1000);
    }

    greet('Alice');
```

3. **避免全局污染**: 使用闭包可以避免将变量暴露到全局作用域中，从而减少命名冲突和污染全局命名空间。

## 缺点

1. **内存泄漏**： 闭包会保持对外部函数作用域的引用，因此即使外部函数执行完毕，闭包仍然可以访问其内部变量。

    如果闭包被长时间持有而不释放，就可能导致这些变量无法被垃圾回收机制清理，从而导致内存泄漏。

```js

function createLargeObject() {
  let largeObject = new Array(1000).fill("large object");
  return function() {
    console.log(largeObject[0]);
  };
}

const closure = createLargeObject();
// 如果 closure 不再被清理，largeObject 会一直保留在内存中
```

`避免方法`：确保闭包不被不必要的引用所持有，或者在不再需要闭包时显式地将其置为 null。

2. **调试困难**：闭包可能会导致代码的调试和理解变得更加困难。

    尤其是在有多个嵌套函数的情况下，闭包使得变量的作用域不易追踪，错误可能并不显现为直观的作用域错误，这会增加调试的复杂性。

3. **性能问题**： 由于闭包会保存其外部函数的作用域，可能会导致性能上的问题。

    每当闭包被创建时，它会创建一个作用域链，这会占用额外的内存。如果闭包大量使用，尤其是在循环或高频调用的场景下，可能会对性能造成影响。

4. **容易造成“意外共享”**： 闭包中的变量会被多个函数共享，如果不小心使用，可能会引发意外的共享和修改。

    特别是在异步编程中，可能导致预期之外的行为。

    ```js
    function createCounter() {
        let count = 0;
        return function() {
            count++;
            console.log(count);
        };
    }

    const counter = createCounter();
    const counter2 = createCounter();
    counter();  // 1
    counter2(); // 1
    ```

虽然这两个 `counter` 函数有相同的名字，但它们的 `count` 是独立的，因为闭包会在每个 `createCounter` 执行时生成新的作用域。

闭包的存在可能会导致内存泄漏的问题，因为那些变量不会被垃圾回收机制回收，直到内部函数不再被引用。

5. **作用域链变长**： 闭包的作用域链相较于普通函数会更加复杂，尤其是嵌套闭包时。这使得变量查找的时间会变长，特别是在作用域链非常深的情况下，可能会导致性能下降。

    ```js
    function outer() {
        let a = 1;
        function middle() {
            let b = 2;
            function inner() {
                console.log(a + b);  // 需要在三个作用域中查找变量
            }
            inner();
        }
        middle();
    }
    outer()
    ```
