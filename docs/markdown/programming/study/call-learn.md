---
作者: "Junlin Zhang"
date: 2023-04-18
---

# Call的详解

最近看 Promise 源码中提到了call更改this指向问题，对于长期为了业务而做开发的我似乎很久没用过这些东西了，现在来做下回顾

[参考路径](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

以下是示例代码
```js
var animals = [
  { species: "Lion", name: "King" },
  { species: "Whale", name: "Fail" },
];

for (var i = 0; i < animals.length; i++) {
  (function (i) {
    this.print = function () {
      console.log("#" + i + " " + this.species + ": " + this.name);
    };
    this.print();
  }).call(animals[i], i);
}
```
个人理解
```js
const A = {
  name:'小丁'
}
const mbs = {
  name: '麻不烧',
  say(prefix, age) {
    console.log(`${prefix},my name is ${this.name},i am ${age} year old`)
  }
}
mbs.say('hello',3)

* hello,my name is 麻不烧,i am 3 year old *
```

以上为基础代码和使用call的基础使用

解析：在所有的方法原型上都有一个call的方法，其中this指的即是本身对象，如上诉代码say函数内部的this指向的时mbs对象本身

接下来我们尝试在函数原型上添加各myCall来复现call的执行机制

```js
const A = {
  name:'小丁'
}
const mbs = {
  name: '麻不烧',
  say(prefix, age) {
    console.log(`${prefix},my name is ${this.name},i am ${age} year old`)
  }
}
mbs.say.myCall(A,'hello',3)
Function.prototype.myCall = function(target,...args){
  target = target || window //如果target为空则挂载到window
  const symbolKey = Symbol() //生成唯一的key值

  target[symbolKey] = this

  const res = target[symbolKey] (...args) 
  delete target[symbolKey]
  return res
}
*hello,my name is 小丁,i am 3 year old*
```
当执行 target[symbolKey] = this 时，因为此时的mayCall还是mbs的原型，this指向的即是mbs.say，该代码是将传入的target对象，即A新增一个唯一值[symbolKey]添加obs的say函数，此时A中的say函数指向即是A自己，接下来再去执行A的函数say