# Promise

本文主要内容为 手写Promise

## Promise

## 手写Promise

### 1. 初始化MyPromise

这一步需要完成的内容

- MyPromise状态不可逆
- resolve 执行，MyPromise的状态会更改为fulfilled
- reject 执行，MyPromise的状态会更改为rejected
- 如果代码中有throw的话，MyPromise的状态会更改为rejected

```js
class MyPromise{
    constructor(executor){
        try {
            this.initValue();
            this.initBind() // [!code warning]
            executor(this.resolve,this.reject)
        } catch (e){
            this.reject(e)
        }
    }
    initValue(){
        this.PromiseState = "padding"
    }
    initBind() { // [!code warning]
        this.resolve = this.resolve.bind(this) // [!code warning]
        this.reject = this.reject.bind(this) // [!code warning]
    } // [!code warning]
    resolve(value){
        if(this.PromiseState == "padding"){
            this.PromiseResult = value;
            this.PromiseState = "fulfilled"
        }
    }
    reject(reason){
        if(this.PromiseState == "padding"){
            this.PromiseResult = reason;
            this.PromiseState = "rejected"
        }
    }
}

```

- 其中需要重点关注`initBind`这个方法，因为是将`resolve`输出到外部调用，不使用`bind`的方法固定`resolve`的this作用域，那此时的this指向为`undefined`

**测试一下**

```js

const test1 = new MyPromise((resolve, reject) => {
    resolve('success')
})
console.log(test1) // MyPromise { PromiseState: 'fulfilled', PromiseResult: 'success' }

const test2 = new MyPromise((resolve, reject) => {
    reject('rejected')
})
console.log(test2) // MyPromise { PromiseState: 'rejected', PromiseResult: 'rejected' }

// 不可更改
const test3 = new MyPromise((resolve, reject) => {
    resolve("success")
    reject('fail')
})
console.log(test3) // MyPromise { PromiseState: 'fulfilled', PromiseResult: 'success' }
```

### 2. 实现then的效果

- 可以`.then`

```js
class MyPromise{
    //只展示新增内容

    ...... // [!code ++]

    then(onFulfilled, onRejected) {
      // 接收两个回调 onFulfilled, onRejected
      
      // 参数校验，确保一定是函数
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
      onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

      if (this.PromiseState === 'fulfilled') {
          // 如果当前为成功状态，执行第一个回调
          onFulfilled(this.PromiseResult)
      } else if (this.PromiseState === 'rejected') {
          // 如果当前为失败状态，执行第二哥回调
          onRejected(this.PromiseResult)
      }

    }
}
```

测试一下：

```js
const test = new MyPromise((resolve, reject) => {
    resolve('success')
}).then(res => console.log(res), err => console.log(err))
// 输出 ”success“
```

### 3. 定时器问题

如果在以下代码中会出现这么一个问题,这里只会在一秒后输出 `1`

```js
new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
        console.log(1);
        resolve()
    })
}).then(()=>{
    console.log(2)
})
```

**原因**

因为在执行到定时器的时候，放入了下一个循环，此时会直接执行 `.then` 的方法，由于此时状态还是`padding`,所以不会输出 `2`

**解决**

解决思路为 在 `then` 中加入判断，只要状态是pending，那就证明定时器还没跑完，因为如果定时器跑完的话，那状态肯定就不是pending，而是fulfilled或者rejected，使用 `数组`，因为一个promise实例可能会多次then，用数组就一个一个保存了，

此时如果继续使用定时器，定时器执行resolve时，去检查数组中是否还有未执行的回调（此回调是 `.then` 的回调），

```js
class MyPromise{
    constructor(executor){
        try {
            this.initValue();
            this.initBind()
            executor(this.resolve,this.reject)
        } catch (e){
            this.reject(e)
        }
    }
    initValue() {
        // 初始化值
        this.PromiseResult = null // 终值
        this.PromiseState = 'pending' // 状态
        this.onFulfilledCallbacks = [] // 保存成功回调// [!code ++]
        this.onRejectedCallbacks = [] // 保存失败回调// [!code ++]
    }
    initBind() {
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
    }
    resolve(value) {
        // state是不可变的
        if (this.PromiseState !== 'pending') return
        // 如果执行resolve，状态变为fulfilled
        this.PromiseState = 'fulfilled'
        // 终值为传进来的值
        this.PromiseResult = value
        // 执行保存的成功回调
        while (this.onFulfilledCallbacks.length) {// [!code ++]
            this.onFulfilledCallbacks.shift()(this.PromiseResult)// [!code ++]
        }// [!code ++]
    }

    reject(reason) {
        // state是不可变的
        if (this.PromiseState !== 'pending') return
        // 如果执行reject，状态变为rejected
        this.PromiseState = 'rejected'
        // 终值为传进来的reason
        this.PromiseResult = reason
        // 执行保存的失败回调
        while (this.onRejectedCallbacks.length) {// [!code ++]
            this.onRejectedCallbacks.shift()(this.PromiseResult)// [!code ++]
        }// [!code ++]
    }
    
    then(onFulfilled, onRejected) {
        // 接收两个回调 onFulfilled, onRejected

        // 参数校验，确保一定是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        if (this.PromiseState === 'fulfilled') {
            // 如果当前为成功状态，执行第一个回调
            onFulfilled(this.PromiseResult)
        } else if (this.PromiseState === 'rejected') {
            // 如果当前为失败状态，执行第二哥回调
            onRejected(this.PromiseResult)
        } else if (this.PromiseState === 'pending') {// [!code ++]
            // 如果状态为待定状态，暂时保存两个回调// [!code ++]
            this.onFulfilledCallbacks.push(onFulfilled.bind(this))// [!code ++]
            this.onRejectedCallbacks.push(onRejected.bind(this))// [!code ++]
        }// [!code ++]

    }
}
```

### 4. 链式调用，值穿透

这一步需要完成的内容

- 链式调用，`.then`
- 值穿透

**思路**

    在`.then`中输出一个MyPromise 示例

```js
class MyPromise{
    // 只展示新增部分
    ...
    then(onFulfilled, onRejected) {
        // 接收两个回调 onFulfilled, onRejected

        // 参数校验，确保一定是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        if (this.PromiseState === 'fulfilled') {
            // 如果当前为成功状态，执行第一个回调
             (this.PromiseResult)
        } else if (this.PromiseState === 'rejected') {
            // 如果当前为失败状态，执行第二哥回调
            onRejected(this.PromiseResult)
        } else if (this.PromiseState === 'pending') {
            // 如果状态为待定状态，暂时保存两个回调
            this.onFulfilledCallbacks.push(onFulfilled.bind(this))
            this.onRejectedCallbacks.push(onRejected.bind(this))
        }
        var thenPromise = new MyPromise((resolve,reject)=>{})// [!code ++]
        return thenPromise// [!code ++]
    }
}
```

这里完成了链式调用，现在有一个问题就是值穿透问题。就是此次 `.then` 的值可以作为下次 `.then` 的数据

```js
class MyPromise{
    // 只展示新增部分
    ......

    then(onFulfilled, onRejected) {
        // 接收两个回调 onFulfilled, onRejected

        // 参数校验，确保一定是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }


        var thenPromise = new MyPromise((resolve, reject) => {

            const resolvePromise = cb => {
                try {
                    const x = cb(this.PromiseResult)
                    if (x === thenPromise) {
                        // 不能返回自身哦
                        throw new Error('不能返回自身。。。')
                    }
                    if (x instanceof MyPromise) {
                        // 如果返回值是Promise
                        // 如果返回值是promise对象，返回值为成功，新promise就是成功
                        // 如果返回值是promise对象，返回值为失败，新promise就是失败
                        // 谁知道返回的promise是失败成功？只有then知道
                        x.then(resolve, reject)
                    } else {
                        // 非Promise就直接成功
                        resolve(x)
                    }
                } catch (err) {
                    // 处理报错
                    reject(err)
                    throw new Error(err)
                }
            }

            if (this.PromiseState === 'fulfilled') {
                // 如果当前为成功状态，执行第一个回调
                resolvePromise(onFulfilled)
            } else if (this.PromiseState === 'rejected') {
                // 如果当前为失败状态，执行第二个回调
                resolvePromise(onRejected)
            } else if (this.PromiseState === 'pending') {
                // 如果状态为待定状态，暂时保存两个回调
                // 如果状态为待定状态，暂时保存两个回调
                this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
                this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
            }
        })

        // 返回这个包装的Promise
        return thenPromise

    }
}
```

### 5. 实现 all 方法

**作用：**
::: tip
 如果所有都成功了，那就返回一个成功的数组。
:::

这一步需要完成的内容

- 1. 接收一个Promise数组，数组中如有非Promise项，则此项当做成功；
- 2. 如果所有Promise都成功，则返回成功结果数组；
- 3. 如果有一个Promise失败，则返回这个失败结果；

```js
class MyPromise{
    ..... //只展示新增内容
    
    static all(promises){
        const result = []
        let count = 0
        return new MyPromise((resolve,reject)=>{
            const addData = (index, value) => {
                result[index] = value
                count++
                if (count === promises.length) resolve(result)
            }
            promises.forEach((promise, index) => {
                if (promise instanceof MyPromise) {
                    promise.then(res => {
                        addData(index, res)
                    }, err => reject(err))
                } else {
                    addData(index, promise)
                }
            })
        })
    }
}
```

### 6. 实现 race 方法

**作用：**
::: tip
返回第一个成功的数据。
:::

这一步需要完成的内容

- 1. 接收一个Promise数组，数组中如有非Promise项，则此项当做成功；
- 2. 哪个Promise最快得到结果，就返回那个结果，无论成功失败；

```js
class MyPromise{
    ..... //只展示新增内容
    
    static race(promises){
        
        return new MyPromise((resolve,reject)=>{
            promises.forEach(e=>{
                if (promise instanceof MyPromise) {
                    promise.then(res => {
                        resolve(res)
                    }, err => {
                        reject(err)
                    })
                } else {
                    resolve(promise)
                }
            })
        })
    }
}
```

### 6. 实现 allSettled 方法

**作用：**
::: tip
返回所有成功的数据（数组）
:::

这一步需要完成的内容

- 1. 接收一个Promise数组，数组中如有非Promise项，则此项当做成功；
- 2. 把每一个Promise的结果，集合成数组后返回；

```js
class MyPromise{
    ..... //只展示新增内容
    static allSettled(promises){
        
    
        return new MyPromise((resolve,reject)=>{
            const res = []
            let count = 0
            const addData = (status, value, i) => {
                res[i] = {
                    status,
                    value
                }
                count++
                if (count === promises.length) {
                    resolve(res)
                }
            }
            promises.forEach((promise, i) => {
                if (promise instanceof MyPromise) {
                    promise.then(res => {
                        addData('fulfilled', res, i)
                    }, err => {
                        addData('rejected', err, i)
                    })
                } else {
                    addData('fulfilled', promise, i)
                }
            })
        })
    }
}
```
### 7. 实现 any 方法

**作用：**
::: tip
只要有一个成功就返回所有的数据，如果全部失败就返回错误。
:::

这一步需要完成的内容

- 1. 接收一个Promise数组，数组中如有非Promise项，则此项当做成功；
- 2. 把每一个Promise的结果，集合成数组后返回；

```js
class MyPromise{
    ..... //只展示新增内容
    static any(promises) {
        return new Promise((resolve, reject) => {
            let count = 0
            promises.forEach((promise) => {
                promise.then(val => {
                    resolve(val)
                }, err => {
                    count++
                    if (count === promises.length) {
                        reject(new AggregateError('All promises were rejected'))
                    }
                })
            })
        })
    }
}
```