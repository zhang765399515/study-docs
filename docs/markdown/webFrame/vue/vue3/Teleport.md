# VUE 3 的 Teleport

## Teleport 是什么？

Teleport 是 Vue 3 引入的一个内置组件，允许将组件的 DOM 结构`渲染到指定的 DOM 节点`，而不是按照组件层级正常渲染在父组件的 DOM 层级中。

这在创建模态框（Modal）、弹窗、通知等需要脱离当前组件层级的 UI 组件时非常有用。

## 为什么需要 Teleport？

通常，在组件树中，子组件的 DOM 节点会嵌套在父组件内部。但有时我们需要让子组件在视觉或结构上脱离父组件，例如模态框需要直接 `渲染到 body 标签` 下，而不是嵌套在父组件内部。

### 问题示例（不使用 Teleport）

```vue
<template>
  <div class="parent">
    <button @click="show = true">打开模态框</button>
    <div v-if="show" class="modal">模态框内容</div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
```

#### 问题分析

modal 的 DOM 结构仍嵌套在 .parent 内部，这可能导致 z-index 或层级问题，难以脱离父组件的限制。

#### Teleport 解决方案：
通过 Teleport，可以将模态框`直接渲染到 body 下`，避免层级问题。

### 示例（使用 Teleport）

```vue
<template>
  <div class="parent">
    <button @click="show = true">打开模态框</button>

    <Teleport to="body">
      <div v-if="show" class="modal">
        模态框内容
        <button @click="show = false">关闭</button>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const show = ref(false);
</script>
```

#### 解析

Teleport 的 to 属性表示目标节点，例如 to="body" 会将模态框渲染到 body 下。

虽然模态框在 DOM 结构中脱离了 .parent，但`逻辑和数据依然由 Parent 组件管理`。

模态框即使渲染在 body 下，也可以访问 show 这个响应式数据，因为组件逻辑和 DOM 位置是`分离`的。

实际渲染结构：

```html

<body>
  <div id="app">
    <div class="parent">
      <button>打开模态框</button>
    </div>
  </div>
  <div class="modal">模态框内容</div> <!-- 被 Teleport 到 body 下 -->
</body>
```

典型应用场景：

+ 模态框
+ 全局通知
+ 弹窗（Popup）
+ 悬浮层
+ 工具提示（Tooltip）

## 注意事项

目标节点（to）需要在 DOM 中存在。可以是 `body、.custom-container 等任意有效的 CSS 选择器`。

如果目标节点不存在，Teleport 会等待目标节点出现后再渲染。

动态目标：to 属性可以是动态值，允许根据条件改变渲染位置。

```vue
<Teleport :to="dynamicTarget">
  <div>动态 Teleport</div>
</Teleport>
```

## 总结

Teleport 提供了一种优雅的方式，将组件的 DOM 渲染到组件层级之外，解决了模态框、弹窗等场景下的层级问题，使得组件在结构和功能上更加独立，逻辑更清晰。
