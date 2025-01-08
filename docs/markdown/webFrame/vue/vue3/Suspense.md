# VUE 3 中的 Suspense 使用

## Suspense 是什么？

在 Vue.js 3 中，`<Suspense>` 是一个用于处理异步组件加载的内置组件，它可以在等待异步内容加载时显示占位内容，类似于 `React` 的 `Suspense`。它的主要作用是让开发者更方便地管理异步内容的加载状态，提供一种用户体验更友好的方式。

## 核心功能

::: tip 主要功能

+ 异步内容加载：等待组件中的异步任务完成后再展示内容。
+ 占位内容展示：在异步任务完成之前，渲染一个备用的占位内容（如加载动画）。
+ 优雅降级：如果异步任务失败，可以结合错误边界或者备用内容处理。
:::

## 1、基本用法

```vue
<template>
  <Suspense>
    <!-- 渲染异步内容 -->
    <template #default>
      <AsyncComponent />
    </template>
    <!-- 占位内容 -->
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

children页面

```vue
<template>
  <div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  async setup() {
    const data = ref(null)
    // 模拟API调用
    const fetchUser = () => new Promise(resolve => {
      setTimeout(() => {
        resolve({})
      }, 2000)
    })
    data.value = await fetchUser()
    return { data }
  }
}
</script>
```

### 解析

  `#default` 插槽：用于指定正常加载完成后要渲染的内容（异步组件）。

  `#fallback` 插槽：用于指定异步任务未完成前显示的占位内容。

## 2. 异步 setup 函数

在组件的 setup 函数中可以使用 await 进行异步操作。`<Suspense>` 会自动等待异步任务完成后再渲染组件。

```vue
<template>
  <Suspense>
    <template #default>
      <UserProfile />
    </template>

    <template #fallback>
      <div>Loading user data...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { ref } from 'vue';

const UserProfile = {
  async setup() {
    const user = ref(null);
    // 模拟异步数据请求
    user.value = await fetchUserData();
    return { user };
  },
  template: `<div>{{ user.name }}</div>`
};

async function fetchUserData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'John Doe' });
    }, 2000);
  });
}
</script>

```

### 解释

UserProfile 组件在 setup 中执行异步任务，直到 `fetchUserData` 完成后才渲染 user.name。

在加载数据期间，显示 Loading user data... 占位内容。

## 3. 多个异步组件嵌套

`<Suspense>` 允许多个异步组件同时加载，所有组件加载完成后一起渲染。

```vue
<template>
  <Suspense>
    <template #default>
      <div>
        <AsyncComponent1 />
        <AsyncComponent2 />
      </div>
    </template>

    <template #fallback>
      <div>Loading components...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncComponent1 = defineAsyncComponent(() => import('./Component1.vue'));
const AsyncComponent2 = defineAsyncComponent(() => import('./Component2.vue'));
</script>
```

### 解释

所有异步组件加载完毕后才会一起渲染，加载中显示 Loading components...。

## 4. 嵌套 Suspense

可以嵌套多个 `<Suspense>`，内层 Suspense 的加载完成不会影响外层，提升页面局部加载体验。

```vue
<template>
  <Suspense>
    <template #default>
      <div>
        <Suspense>
          <template #default><AsyncChild1 /></template>
          <template #fallback>Loading Child 1...</template>
        </Suspense>

        <Suspense>
          <template #default><AsyncChild2 /></template>
          <template #fallback>Loading Child 2...</template>
        </Suspense>
      </div>
    </template>

    <template #fallback>
      <div>Loading parent component...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncChild1 = defineAsyncComponent(() => import('./Child1.vue'));
const AsyncChild2 = defineAsyncComponent(() => import('./Child2.vue'));
</script>
```

### 解释

AsyncChild1 和 AsyncChild2 独立加载，加载完成后立即渲染，不用等待其他异步组件完成。

外层 Suspense 管理整体加载状态。

## 5. 异步加载错误处理

`<Suspense>` 可以与 ErrorBoundary 结合，优雅处理加载错误。

示例：错误捕获

```vue
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>

    <template #fallback>
      <div>Loading component...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(() =>
  import('./BrokenComponent.vue')
);
</script>

<script>
import { h } from 'vue';

export default {
  errorCaptured(err) {
    console.error('Async component failed to load:', err);
    return h('div', 'Failed to load component.');
  }
};
</script>
```

### 解释

如果异步组件加载失败，可以捕获错误并展示降级内容或错误提示。

## 6. 动态加载组件示例

```vue

<template>
  <Suspense>
    <template #default>
      <component :is="AsyncPage" />
    </template>

    <template #fallback>
      <div>Loading page...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';

const AsyncPage = ref(null);

// 动态加载组件
setTimeout(() => {
  AsyncPage.value = defineAsyncComponent(() => import('./DynamicPage.vue'));
}, 1000);
</script>
```

### 解释

在异步加载新页面时，显示加载动画，提升页面切换的流畅性。

## 注意事项

+ 兼容性：`<Suspense>` 仅支持异步组件或 async setup，不适用于普通同步组件。

+ 性能考虑：嵌套太多的 Suspense 可能会`影响页面性能`，应合理设计加载流程。

+ 占位内容优化：尽量使用轻量的加载动画或骨架屏作为占位内容，提升用户体验。

## 总结

+ `<Suspense>` 提供了一种简单优雅的方式处理异步加载，避免空白页面。

+ 可以在异步组件加载、异步数据请求等场景下使用，提升用户体验。

+ 与 ErrorBoundary 结合，可以优雅处理加载失败的情况。
