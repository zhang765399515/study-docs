# 单例模式

设计原理：确保一个类只有一个实例，并且提供一个访问它的全局访问点。

优势： 由于只有一个实例，所以全局唯一性，并且更好地`控制共享资源优化性能`。

示例：

```js
const test = {
  name: 'testName',
  age: '18',
};

export default test;
```

```js
import test from './test';

console.log(test.name，test.age);
```
上述例子定义test并且export defaul暴露唯一的实例test，符合确保一个类只有一个实例，并且提供一个访问它的全局访问点原则。

其实单例模式有很多种实现方式，并且不同的实现方式有不同的适用场景，这种只是为了通过例子去理解这种设计模式的思想。