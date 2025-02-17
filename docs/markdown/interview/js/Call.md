# 手写Call

开始之前，我们需要了解什么是Call.

## 什么是Call?

`call` 是 `JavaScript` 中一个非常有用的函数方法，它是 Function 对象的一个`内置方法`。call 允许你以指定的 `this` 值来调用一个函数，并且可以传入参数。

```js
func.call(thisArg, arg1, arg2, ...)
```

- `thisArg`: 调用函数时 this 指向的对象。

- `arg1, arg2`, ...: 要传递给函数的参数。

**示例**：

```js
function greet(name, age) {
  console.log(`Hello, ${name}. You are ${age} years old.`);
}

// 使用 call 来改变 this 的指向
const person = { name: 'John' };
greet.call(person, 'Alice', 30);
// 输出: Hello, Alice. You are 30 years old.
```

在这个例子中，greet 函数的 this 被绑定到 person 对象上，虽然函数的参数是传递给 greet 的，但 this 的值是 person。

## 开始手写Call

先写一个基础的框架,要使每个数组都有Call这个方法，我们现在原型链上面新增这个方法，在写一个函数调用。

```js
Function.prototype.MyCall = function(ctx,...arg){
    
}
function method(a,b){
    return a + b
}
method.MyCall({},2,3)
```

这里使用了一个 `...arg`，可以接受剩下的所有参数为一个数组。

然后调用MyCall这个方法，我们需要将执行this这个方法，如果我们这个时候直接执行 `this()`,那MyCall的中的this指向就是method,而method方法中的this就是指向 `window`,所以我们需要将其保存，通过 `ctx.fn()` 执行

::: details 为什么这里的this是window?
    因为method.MyCall中的this作用域指向的是调用时候的作用域 `(window)`
    而此时在method.MyCall调用this(),那method方法内部的作用域是method.MyCall，那this一级一级往上找就是window
:::

**众所周知，函数作用域是谁调用，那this指向就是谁，那这个时候，`this` 的作用域就变成了传入的 `ctx`**

```js
Function.prototype.MyCall = function(ctx,...arg){
    ctx.fn = this; // [!code ++]
    ctx.fn(...arg) // [!code ++]
    delete ctx.fn
}
function method(a,b){
    return a + b
}
method.MyCall({},2,3)
```

现在有出现一个问题，如果传入的ctx中本身就有一个fn函数怎么办呢，这时需要介入一个随机非重复的Key才行，我们可以使用 `Symbol`

如果ctx中有返回值，那我们需要在MyCall返回该值

```js
Function.prototype.MyCall = function(ctx,...arg){
    let fnSymbol  = Symbol('myKey')// [!code ++]
    ctx[fnSymbol ] = this;
    let result = ctx[fnSymbol ](...arg)

    delete ctx[fnSymbol ]
    return result // [!code ++]
}
function method(a,b){
    return a + b
}
method.MyCall({},2,3)
```

然后我们再考虑如果传入的ctx不是一个函数呢，我们需要给一个默认的环境，正常是为window，但是涉及到可能有多个环境,比如node环境，所以我们需要修改为`globalThis`，让他直接指向全局对象

```js
Function.prototype.MyCall = function(ctx,...arg){
     if (typeof ctx === 'undefined' || ctx === null) {// [!code ++]
        ctx = globalThis// [!code ++]
    }else{// [!code ++]
        Object(ctx);// [!code ++]
    } // [!code ++]
    let fnSymbol  = Symbol('myKey')
    ctx[fnSymbol ] = this;
    let result = ctx[fnSymbol ](...arg)

    delete ctx[fnSymbol ]
    return result
}
function method(a,b){
    return a + b
}
method.MyCall(null,2,3)
```

好，一个完整的Call就完成了。