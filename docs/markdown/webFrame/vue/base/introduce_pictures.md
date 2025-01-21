# Img的各种引入方式

废话少说，直入正题

## vue2 和 vue3 通用部分

因为vue2和vue3底层有部分差异，其中区别点包含但不限于
::: tip

`require`：Vue 2 支持，Vue 3 不推荐。

`import`：Vue 3 推荐，Vue 2 中不适用于 .vue 文件的模板直接绑定。

:::

### 1. 直接在模板中使用静态路径

无论是 Vue 2 还是 Vue 3，静态路径方法都是通用的：

```js
<template>
  <img src="/images/example.jpg" alt="静态图片" />
</template>
```

适用场景：当图片存放在 public 文件夹中时。

### 2. 动态绑定图片路径

使用 data 或 computed 绑定图片路径：

```js
<template>
  <img :src="imageSrc" alt="动态图片" />
</template>

<script>
export default {
  data() {
    return {
      imageSrc: '/images/example.jpg'
    };
  }
};
</script>
```

根据条件动态生成路径

```js
<template>
  <img :src="`/images/${imageName}.jpg`" alt="动态图片" />
</template>

<script>
export default {
  data() {
    return {
      imageName: 'example'
    };
  }
};
</script>
```

适用场景：需要动态加载不同图片时。


### 3. 远程图片 URL

远程图片的引入方式两者完全一致：

```js
<template>
  <img src="https://example.com/images/example.jpg" alt="远程图片" />
</template>
```

适用场景：当图片托管在 CDN 或第三方服务器上。

### 4. Base64 图片

直接在模板中绑定 Base64 编码字符串，两者通用：

```js
<template>
  <img :src="base64Image" alt="Base64 图片" />
</template>

<script>
export default {
  data() {
    return {
      base64Image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...'
    };
  }
};
</script>

```

适用场景：适用于小型图片或图标。

### 5. 借助 Vue 插件（如 vue-lazyload）进行懒加载

可以使用第三方插件，比如 vue-lazyload 来实现图片懒加载：


```js
npm install vue-lazyload
```

使用方式

```js
<template>
  <img v-lazy="'@/assets/example.jpg'" alt="懒加载图片" />
</template>

<script setup>
import { useLazyload } from 'vue-lazyload';

useLazyload({
  loading: '@/assets/loading.gif', // 加载时的占位图
  error: '@/assets/error.png',     // 错误时的占位图
});
</script>
```

适用场景：适合图片较多时，优化首屏加载。

### 6. 通过动态组件加载图片

可以将图片作为组件来动态引入：

```js
<template>
  <component :is="imageComponent" />
</template>

<script setup>
const imageComponent = defineAsyncComponent(() => import('@/assets/example.jpg'));
</script>
```

适用场景：当需要动态加载某些资源时。

### 7. 通过 props 动态传递图片路径

如果组件需要接收图片路径作为参数，可以通过 props 动态传递：

```js
<template>
  <img :src="imageSrc" alt="传递图片" />
</template>

<script setup>
defineProps(['imageSrc']);
</script>
```

使用组件时：

```js
<MyImageComponent imageSrc="@/assets/example.jpg" />
```

## Vue 2 和 Vue 3 共有的特性

### 1. 使用 @ 作为 src 别名

在 vue.config.js 或 webpack.config.js 中配置后，两者均可使用 @ 引用 src 目录：

```js
<template>
  <img src="@/assets/example.jpg" alt="别名图片" />
</template>
```

### 2. 配合环境变量

可以通过 process.env 在 vue.config.js 中配置动态图片路径：

```js
<template>
  <img :src="`${process.env.VUE_APP_BASE_URL}/images/example.jpg`" alt="环境变量图片" />
</template>
```

