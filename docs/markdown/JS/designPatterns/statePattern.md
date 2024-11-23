# 状态模式

## 什么是状态模式？

状态模式（State Pattern）是一种行为设计模式，用于让一个对象在其内部状态发生改变时，行为也随之改变。它将与特定状态相关的行为封装到独立的类中，从而使得对象的状态切换更加清晰且易于扩展。

### 状态模式的核心思想

状态模式通过将不同状态的行为封装到独立的状态类中，使得状态切换时，可以通过更改状态类而改变对象的行为。这样，避免了在对象中使用大量的条件语句（如 if-else 或 switch-case）。

### 适用场景

- 对象行为依赖于状态，且行为会随着状态变化而变化。
- 避免条件语句：不希望在代码中使用过多的 `if-else` 或 `switch-case。`

例如

 > 游戏中的角色状态（攻击、移动、防御）。

  >ATM 机的状态（待机、插卡、输入密码、取款）。

 > 流程状态控制（订单状态：待支付、已支付、发货中、已完成）。
:::

在状态模式中：
  ::: tip 核心
  1、环境类（Context）：维护当前状态，并提供方法切换状态。

  2、抽象状态类（State）：定义所有状态的共同接口。

  3、具体状态类（ConcreteState）：实现了抽象状态接口，包含与某个状态相关的具体行为。
:::

示例：订单状态管理

```js

// 抽象状态类
class State {
  handle(context) {
    throw new Error("This method must be overridden!");
  }
}

// 具体状态类
class PendingState extends State {
  handle(context) {
    console.log("订单处于待支付状态");
    context.setState(new PaidState());
  }
}

class PaidState extends State {
  handle(context) {
    console.log("订单已支付");
    context.setState(new ShippedState());
  }
}

class ShippedState extends State {
  handle(context) {
    console.log("订单已发货");
    context.setState(new CompletedState());
  }
}

class CompletedState extends State {
  handle(context) {
    console.log("订单已完成");
  }
}

// 环境类
class OrderContext {
  constructor() {
    this.state = new PendingState(); // 初始状态
  }

  setState(state) {
    this.state = state; // 切换状态
  }

  request() {
    this.state.handle(this); // 调用状态的行为
  }
}

// 使用示例
const order = new OrderContext();

order.request(); // 输出: 订单处于待支付状态
order.request(); // 输出: 订单已支付
order.request(); // 输出: 订单已发货
order.request(); // 输出: 订单已完成

```

### 状态模式的`优点`和`缺点`

::: info 优点

  状态独立：将状态相关的代码封装在独立的类中，符合单一职责原则。

  代码清晰：消除了大量条件语句，提高了代码的可维护性。

  扩展性强：易于扩展新的状态而无需修改现有代码。

:::

::: danger 缺点

  类增多：每种状态都需要一个类，可能导致类的数量增多。

  逻辑分散：行为分布在不同状态类中，可能增加代码追踪的难度。
:::

## 总结
  在状态模式中，对象的行为由状态决定，其核心思想是将状态转换与行为封装在独立的状态类中。对于复杂的状态切换场景（如订单流转、用户权限变化等），状态模式是一个非常优雅的解决方案。

# 参考文献


<CustomLink title='《ChatGpt》'  href='https://chatgpt.com/c/67413949-5c1c-800a-9f85-b9b4fb73b699'/>
<CustomLink title='《js设计模式之状态模式》'  href='https://juejin.cn/post/7326801745261183026?searchId=20241123110350B10C4CF8F3909CFEF709'/>
<CustomLink title='《JS 设计模式速成指南（上）》'  href='https://juejin.cn/post/7359107971999629352?searchId=20241123110350B10C4CF8F3909CFEF709'/>