# Generator 的使用

generator函数跟普通函数在写法上的区别就是，多了一个星号*，并且只有在generator函数中才能使用 `yield` ，而 `yield` 相当于generator函数执行的 `中途暂停点`

**案例**

比如下方有3个暂停点。而怎么才能暂停后继续走呢？那就得使用到next方法，next方法执行后会返回一个对象，对象中有value 和 done两个属性。

```js
    function* gen() {
        yield 1
        yield 2
        yield 3
    }
    const g = gen()
    console.log(g.next()) // { value: 1, done: false }
    console.log(g.next()) // { value: 2, done: false }
    console.log(g.next()) // { value: 3, done: false }
    console.log(g.next()) // { value: undefined, done: true }
```

## yield 后接函数

yield后面接函数的话，到了对应暂停点yield，会马上执行此函数，并且该函数的执行返回值，会被当做此暂停点对象的value

```js
    function fn(num) {
        console.log(num)
        return num
    }
    function* gen() {
        yield fn(1)
        yield fn(2)
        return 3
    }
    const g = gen()
    console.log(g.next()) 
    // 1
    // { value: 1, done: false }
    console.log(g.next())
    // 2
    //  { value: 2, done: false }
    console.log(g.next()) 
    // { value: 3, done: true }
```

## yield后接promise

```js
function fn(num) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num)
    }, 1000)
  })
}
function* gen() {
  yield fn(1)
  yield fn(2)
  return 3
}
const g = gen()
console.log(g.next()) // { value: Promise { <pending> }, done: false }
console.log(g.next()) // { value: Promise { <pending> }, done: false }
console.log(g.next()) // { value: 3, done: true }

//要获取1，2必须使用.then的方式
const next1 = g.next()
next1.value.then(res1 => {
  console.log(next1) // 1秒后输出 { value: Promise { 1 }, done: false }
  console.log(res1) // 1秒后输出 1

  const next2 = g.next()
  next2.value.then(res2 => {
    console.log(next2) // 2秒后输出 { value: Promise { 2 }, done: false }
    console.log(res2) // 2秒后输出 2
    console.log(g.next()) // 2秒后输出 { value: 3, done: true }
  })
})
```

## next函数传参

generator函数可以用next方法来传参，并且可以通过yield来接收这个参数，注意两点

1. 第一次next传参是没用的，只有从第二次开始next传参才有用；
2. next传值时，要记住顺序是，先右边yield，后左边接收参数；

```js
function* gen() {
  const num1 = yield 1
  console.log(num1)
  const num2 = yield 2
  console.log(num2)
  return 3
}
const g = gen()
console.log(g.next()) // { value: 1, done: false }
console.log(g.next(11111))
// 11111
//  { value: 2, done: false }
console.log(g.next(22222)) 
// 22222
// { value: 3, done: true }
```

## Promise&next传参

根据上文可以知道：

1. yield后面接Promise；
2. next函数传参；

```js
function fn(nums) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(nums * 2)
    }, 1000)
  })
}
function* gen() {
  const num1 = yield fn(1)
  const num2 = yield fn(num1)
  const num3 = yield fn(num2)
  return num3
}
const g = gen()
const next1 = g.next()
next1.value.then(res1 => {
  console.log(next1) // 1秒后同时输出 { value: Promise { 2 }, done: false }
  console.log(res1) // 1秒后同时输出 2

  const next2 = g.next(res1) // 传入上次的res1
  next2.value.then(res2 => {
    console.log(next2) // 2秒后同时输出 { value: Promise { 4 }, done: false }
    console.log(res2) // 2秒后同时输出 4

    const next3 = g.next(res2) // 传入上次的res2
    next3.value.then(res3 => {
      console.log(next3) // 3秒后同时输出 { value: Promise { 8 }, done: false }
      console.log(res3) // 3秒后同时输出 8

       // 传入上次的res3
      console.log(g.next(res3)) // 3秒后同时输出 { value: 8, done: true }
    })
  })
})
```
