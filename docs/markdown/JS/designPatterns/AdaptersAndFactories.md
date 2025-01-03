# 适配器模式和工厂模式的差异

先说下两种模式的定义和目的

## 适配器模式 (Adapter Pattern)

::: info
定义：适配器模式的作用是将一个接口转换成另一个接口，使原本因为接口不兼容而无法工作的类能够一起工作。

目的：解决接口不兼容问题，让现有的代码能够无缝集成到新的需求中。

核心：“适配”现有接口，将其转换为目标接口。
:::

## 工厂模式 (Factory Pattern)

::: info
定义：工厂模式通过定义一个工厂类或工厂方法，来创建一组相关或依赖的对象，而无需指定具体的类。

目的：隐藏对象创建的具体细节，提供一种灵活的创建对象的方式。

核心：“封装”创建对象的过程，让客户端无需关心实例化的逻辑。
:::

## 两者的使用场景差异

| 模式  | 适用场景 |
| ------ | ----------- |
|适配器模式 | 当需要将旧系统（或接口）兼容新系统时，比如对接第三方库、处理不同的数据格式。 |
|工厂模式 | 当需要动态创建对象，并且希望隐藏创建逻辑时，比如创建多种不同类型的对象或管理对象的生命周期。 |

## 关键区别

| 对比点  | 适配器模式 | 工厂模式 |
| ------ | ----------- | -------- |
| 目标 | 解决接口不兼容的问题。 | 解决对象创建的问题。 |
| 设计重点 | 提供一个中间层，适配目标接口和现有接口。 | 提供一个接口或类，封装对象创建的细节。 |
| 何时使用 | 旧接口无法满足新需求，但不想修改旧代码时。 | 需要动态实例化不同对象，且不希望在客户端代码中显式使用 new 时。 |
| 是否创建对象 | 不创建新对象，只包装和转换已有的接口。 | 创建新对象，并决定如何创建、返回哪种具体对象。 |

## 类比举例

- 适配器模式： 就像手机充电器，可以把电压（220V）适配为手机可用的低压（5V USB），实现接口兼容。

- 工厂模式： 就像蛋糕店（工厂），根据客户的不同需求制作不同类型的蛋糕，但客户无需关心具体的制作流程。

## JS 示例对比

### 适配器模式示例

```js
class JSONToXMLAdapter {
  constructor(jsonData) {
    this.jsonData = jsonData;
  }

  getXMLData() {
    const json = this.jsonData.getData();
    let xml = `<data>`;
    for (let key in json) {
      xml += `<${key}>${json[key]}</${key}>`;
    }
    xml += `</data>`;
    return xml;
  }
}
```

### 工厂模式

```js
class Admin {
  constructor(name) {
    this.role = "Admin";
    this.name = name;
  }
}

class User {
  constructor(name) {
    this.role = "User";
    this.name = name;
  }
}

class UserFactory {
  static createUser(type, name) {
    if (type === "Admin") {
      return new Admin(name);
    } else if (type === "User") {
      return new User(name);
    }
    throw new Error("Invalid user type");
  }
}

// 工厂根据类型动态创建 Admin 或 User。
const admin = UserFactory.createUser("Admin", "Alice");
const user = UserFactory.createUser("User", "Bob");
```

## 总结

| 相似点 | 不同点 |
| ------ | ----------- |
| 都是封装一种复杂操作，提供更易用的接口。  | 适配器模式关注接口兼容，不关心对象创建；工厂模式关注对象创建，不关心接口兼容。 |
| 都能提高代码的复用性和灵活性。  | 适配器模式更多用于“让老代码兼容新需求”；工厂模式则更多用于“动态创建对象，提供统一接口”。 |

::: tip
两者可以一起使用，比如在一个工厂中使用适配器将旧对象适配成工厂期望的格式，从而实现动态创建兼容对象。
:::



# 参考文献：

<CustomLink title='《ChatGpt》' desc='即时答案。更高生产力。无尽灵感。'  href='https://chatgpt.com/c/67413949-5c1c-800a-9f85-b9b4fb73b699'/>
<CustomLink title='《设计模式在前端开发中的实践（六）——适配器模式》'  href='https://juejin.cn/post/7323203806795186210?searchId=202411231010403115E112E887A1F58703'/>
<CustomLink title='《一文总结Java的23种设计模式》'  href='https://juejin.cn/post/7211026540129157180?searchId=202411231101267F64C223198303FE0376'/>
<CustomLink title='《浅谈前端出现率高的设计模式》'  href='https://juejin.cn/post/7274146202496041018?searchId=202411231101267F64C223198303FE0376'/>