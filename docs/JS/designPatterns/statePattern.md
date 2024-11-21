状态模式（State Pattern）是行为型设计模式的一种。它用于在一个对象的内部状态发生改变时，动态地改变其行为，而无需修改其代码。

状态模式的核心思想
状态模式通过将不同状态的行为封装到独立的状态类中，使得状态切换时，可以通过更改状态类而改变对象的行为。这样，避免了在对象中使用大量的条件语句（如 if-else 或 switch-case）。

适用场景
对象行为依赖于状态，且行为会随着状态变化而变化。
避免条件语句：不希望在代码中使用过多的 if-else 或 switch-case。
例如：

游戏中的角色状态（攻击、移动、防御）。
ATM 机的状态（待机、插卡、输入密码、取款）。
流程状态控制（订单状态：待支付、已支付、发货中、已完成）。
状态模式的结构
环境类（Context）

维护当前状态，并提供方法切换状态。
抽象状态类（State）

定义所有状态的共同接口。
具体状态类（ConcreteState）

实现状态特有的行为。
JavaScript 实现示例
示例：订单状态管理
javascript
复制代码
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
状态模式的优点和缺点
优点
状态独立：将状态封装为独立类，清晰地管理不同状态的逻辑。
代码清晰：减少了复杂的条件语句。
扩展性强：新增状态时，只需添加新的状态类，而不影响其他代码。
缺点
类增多：每种状态都需要一个类，可能导致类的数量增多。
逻辑分散：行为分布在不同状态类中，可能增加代码追踪的难度。
总结
在状态模式中，对象的行为由状态决定，其核心思想是将状态转换与行为封装在独立的状态类中。对于复杂的状态切换场景（如订单流转、用户权限变化等），状态模式是一个非常优雅的解决方案。