# vue3独有的图片引入

在 Vue 3 中，随着工具链（如 Vite）的引入以及生态的变化，图片加载方式也引入了一些 Vue 3 独有的特性和最佳实践。以下是 Vue 3 独有的图片加载方式：

## 1. import.meta.url

Vue 3 和 Vite 支持通过 `import.meta.url` 获取当前模块的 URL，这在动态生成资源路径时非常方便：

```js
<template>
  <img :src="imageSrc" alt="图片" />
</template>

<script setup>
const imageSrc = new URL('@/assets/example.jpg', import.meta.url).href;
</script>
```

- 其中第一个参数是相对于第二个参数（文件）的位置

`优点`：适合动态加载资源或与模块路径相关的操作。

`注意`：需要使用 Vite 或其他支持 `import.meta.url` 的工具链。

## 2. import.meta.glob 批量导入

Vite 支持使用 `import.meta.glob` 批量导入文件，这在需要动态加载多个图片时非常强大。

```js
<template>
  <div v-for="(url, name) in images" :key="name">
    <img :src="url" :alt="name" />
  </div>
</template>

<script setup>
const images = import.meta.glob('@/assets/*.jpg', { eager: true, as: 'url' });
</script>
```

`优点`：
自动生成文件路径，无需手动管理。
提供动态资源管理的便利性。

## 3. 内联 SVG 的支持

Vue 3 和 Vite 对 SVG 的处理更加灵活，可以直接将 SVG 文件作为组件导入使用：

在模板中直接使用：

```js
<template>
  <ExampleIcon />
</template>

<script setup>
import ExampleIcon from '@/assets/icon.svg';
</script>
```

`优点`：SVG 文件被视为组件，可以直接操作其样式或动态绑定属性。
如果想将 SVG 转换为 URL，也可以：

```js
<template>
  <img :src="iconSrc" alt="SVG图片" />
</template>

<script setup>
import iconSrc from '@/assets/icon.svg';
</script>
```

## 4. 动态组件加载图片

Vue 3 支持更简洁的动态组件加载方式，可以结合动态路径：

```js
<template>
  <img :src="getImageUrl(imageName)" alt="动态加载" />
</template>

<script setup>
const getImageUrl = (name) => new URL(`@/assets/${name}.jpg`, import.meta.url).href;
const imageName = 'example';
</script>
```

适用场景：动态管理资源时非常高效。

## 5. CSS 中通过变量绑定图片路径

Vite 和 Vue 3 中支持 CSS 变量结合 JS 导入路径的方式，可以动态更改 CSS 背景图片：

```js
<template>
  <div class="image-container"></div>
</template>

<script setup>
import imageSrc from '@/assets/example.jpg';
document.documentElement.style.setProperty('--background-image', `url(${imageSrc})`);
</script>

<style>
.image-container {
  width: 300px;
  height: 200px;
  background-image: var(--background-image);
  background-size: cover;
}
</style>
```

`优点`：适合主题切换或动态背景图片的场景。


## 6. 使用 ES Modules 的动态导入

Vue 3 和现代工具链对动态导入支持更好，可以在运行时按需加载图片模块：

```js
<template>
  <button @click="loadImage">加载图片</button>
  <img v-if="imageSrc" :src="imageSrc" alt="动态导入图片" />
</template>

<script setup>
import { ref } from 'vue';

const imageSrc = ref(null);

const loadImage = async () => {
  const image = await import('@/assets/example.jpg');
  imageSrc.value = image.default;
};
</script>
```

`优点`：按需加载图片，减少初始加载时间。

## 7. SSR 场景中的图片处理

在 Vue 3 的服务端渲染（SSR）场景中，图片路径需要正确解析。Vite 的 ssrLoadModule 可以解决图片路径的解析问题：

```js
const { createServer } = require('vite');

const vite = await createServer({
  server: { middlewareMode: 'ssr' }
});

const module = await vite.ssrLoadModule('/src/assets/example.jpg');
const imageUrl = module.default;
```

适用场景：构建 SSR 应用时确保图片资源路径正确。

# 注意：图片资源的 Base64 自动转换

Vite 默认会将小于一定大小（如 4KB）的图片自动转换为 `Base64`，直接嵌入到打包后的代码中：

`特点`：
不需要额外配置，小图片资源自动内联。
减少 `HTTP` 请求，提升性能。


::: tip 总结
Vue 3 在图片加载方面提供了更多灵活的方式，特别是借助 Vite 的工具链增强了动态加载和批量导入能力。独有方式如 import.meta.url、import.meta.glob、内联 SVG 支持和更好的动态导入机制，使图片加载更高效、现代化。
:::
