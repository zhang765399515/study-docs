# provide 和 inject

## provide 和 inject 是什么？

provide 和 inject 是 Vue 的依赖注入机制，允许在父组件中提供数据或方法，子组件（包括深层嵌套子组件）直接访问这些数据，而不需要通过 props 逐层传递。

这种方式非常适合在组件树中共享状态或方法，尤其是跨多层级组件时，可以避免 `道具钻取（prop drilling）`。

基本概念：
provide：在父组件中提供数据或方法。
inject：在子组件中注入父组件提供的数据或方法。

## 示例

父组件：提供数据

```vue
<script setup>
import { provide, ref } from 'vue';

const theme = ref('dark');
provide('themeKey', theme);
</script>

<template>
  <div>
    <ChildComponent />
  </div>
</template>
```

子组件：注入数据

```vue

<script setup>
import { inject } from 'vue';

const theme = inject('themeKey');
</script>

<template>
  <div>当前主题：{{ theme }}</div>
</template>
```

## 说明

在父组件中，provide 通过键值对的方式提供数据：

```js
provide('themeKey', theme);
```

子组件通过 inject，使用相同的键访问数据：

```js
const theme = inject('themeKey');
```

如果 theme 是响应式数据，子组件访问时同样保持响应性。

## 典型应用场景

+ 状态管理：共享全局状态，如主题、语言等。
+ 插件或库的配置：例如，国际化（i18n）设置或全局配置。
+ 复用逻辑的封装：配合 use 函数实现逻辑复用和跨组件共享。

## 注意事项

默认值：inject 可以设置默认值，当父组件没有提供时使用默认值。

```js
const theme = inject('themeKey', 'light');
```

## 响应性丢失

如果直接传递的是一个普通值（如字符串或数字），子组件不会自动保持响应性。

推荐使用 `ref` 或 `reactive` 包裹提供的数据，确保响应性。

## 总结

`provide/inject` 提供了一种简洁、优雅的方式，在组件树中共享数据和方法，避免了繁琐的 `props` 传递，提升了代码的可维护性和清晰度。
