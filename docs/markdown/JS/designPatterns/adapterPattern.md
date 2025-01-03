# 适配器模式

## 什么是适配器模式

适配器模式是将一个接口（方法或数据格式）转换为客户端期望的另一个接口。通过适配器，原本接口不兼容的对象可以一起工作，避免修改原始代码，提高复用性和兼容性。

## 适配器模式的核心思想

> 1、不修改现有代码： 避免直接修改被适配的代码（可能是第三方库、老旧系统等），通过增加一层适配器来完成接口转换。

> 2、提供统一接口： 适配器将不同的接口规范化为统一的接口，简化调用方的逻辑。

> 3、降低耦合性： 客户端与适配器交互，而不直接依赖原始类或模块。

::: info 适配器包含的部分
1、被适配者（Adaptee）： 原始接口或功能，通常与当前需求不完全匹配。

2、目标接口（Target）： 客户端希望使用的标准接口。

3、适配器（Adapter）： 一个中间类，负责将被适配者的接口转换为目标接口。

:::

## 适配器模式的应用场景

> 1、对接旧系统或第三方库（例如，接口或数据结构不兼容）。

> 2、不同的数据格式（如 JSON 转 XML，或转换为特定的 API 数据格式）。

> 3、前端适配多种浏览器环境（不同 API 调用方式）。

### vue项目中使用到的适配器模式

在`uniapp`中有一个Api是`createApp`，在h5里，这个API是`vue`导出的，但是在小程序中，该Api是基于`wx`全局变量之上，在正常开发中，我们的思想就是尽量避免反复思考这种Api争对特定环境的使用方式，所以需要对针对不同环境来做一个适配器。

如

```js

import { createApp as createAppInH5 } from "vue";
// 微信小程序 适配器，适配在微信小程序中的处理
function wxAdaptor() {
  return wx.createApp();
}

// vue 适配器，适配在浏览器中的处理
function vueAdaptor() {
  return createAppInH5();
}

// 适配器工厂，根据mpx提供的宿主环境选择对应平台的API处理
function getAdaptor() {
  let selectedAdaptor = null;
  switch (mode) {
    case "wx":
      selectedAdaptor = wxAdaptor;
      break;
    default:
      selectedAdaptor = vueAdaptor;
      break;
  }
  return selectedAdaptor;
}

// 对外暴露一个包裹好的API，业务开发人员可以毫无心智负担的调用
export function createApp(...args) {
  const adaptor = getAdaptor();
  return adaptor.apply(this, args);
}
```

或者

```js
// 适配器：统一事件监听接口
class EventAdapter {
  static addEvent(element, event, handler) {
    if (element.addEventListener) {
      // 标准浏览器
      element.addEventListener(event, handler);
    } else if (element.attachEvent) {
      // 旧版 IE
      element.attachEvent(`on${event}`, handler);
    } else {
      // 兼容性兜底
      element[`on${event}`] = handler;
    }
  }
}

// 使用适配器
const button = document.getElementById("myButton");
EventAdapter.addEvent(button, "click", () => {
  console.log("Button clicked!");
});
```

其类似工厂模式，但针对不同场景的使用方式不一样，工厂模式主要针对的是各种对象的处理，而适配器模式主要争对的是各类接口，页面或者其它环境的自适应，增加代码的可适配度。

### 适配器模式的`优点`和`缺点`

::: info 优点

提高代码的复用性和灵活性。

解决接口不兼容问题，避免对原有代码进行修改。

降低系统耦合度，便于维护和扩展。

:::

::: danger 缺点

增加了代码复杂度，多了一层间接调用。

如果接口需求频繁变化，可能需要频繁修改适配器。

:::

## 适配器模式总结

在 JavaScript 中，适配器模式通过增加一个中间层来解决接口不兼容的问题，广泛应用于：

::: tip 总结

- 数据格式转换。

- 第三方库封装。

- 浏览器兼容问题处理。

:::

适配器模式的核心是“转换接口，而非改变功能”，非常适合需要与遗留系统或多样化接口打交道的场景。

# 参考文献：

<CustomLink title='《ChatGpt》' desc='即时答案。更高生产力。无尽灵感。' href='https://chatgpt.com/c/67413949-5c1c-800a-9f85-b9b4fb73b699'/>
<CustomLink title='《设计模式在前端开发中的实践（六）——适配器模式》'  href='https://juejin.cn/post/7323203806795186210?searchId=202411231010403115E112E887A1F58703'/>