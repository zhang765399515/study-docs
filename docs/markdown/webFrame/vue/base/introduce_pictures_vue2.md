
# vue2独有的图片加载方式

在 Vue 2 中，图片加载方式与 Vue 3 大体相似，但有一些 Vue 2 特有的实现方式或习惯，以下是 Vue 2 独有或更常用的图片加载方式：

## 1. require 引入图片

Vue 2 的 Webpack 配置默认支持 require，这是 Vue 2 中加载图片的经典方式：

```js
<template>
  <img :src="imageSrc" alt="示例图片" />
</template>

<script>
export default {
  data() {
    return {
      imageSrc: require('@/assets/example.jpg') // 使用 require 加载图片
    };
  }
};
</script>
```

## 2. 使用 static 文件夹中的图片

在 Vue 2 中，static 文件夹（Vue CLI 2.x 项目）是一个特殊的目录，存放在这里的文件不会被 Webpack 打包，可以通过相对路径直接访问：

```js
<template>
  <img src="/static/example.jpg" alt="静态图片" />
</template>
```

::: tip 特点
适合不需要 Webpack 处理的公共资源。

资源路径是相对于项目根目录的。

:::
注意：Vue CLI 3+ 以后，这种方式已被 public 文件夹替代。

## 3. 动态 require 加载图片

Vue 2 支持通过 require 实现动态加载图片路径：

```js
<template>
  <img :src="getImageUrl(imageName)" alt="动态图片" />
</template>

<script>
export default {
  data() {
    return {
      imageName: 'example'
    };
  },
  methods: {
    getImageUrl(name) {
      return require(`@/assets/${name}.jpg`);
    }
  }
};
</script>
```

- 优点：方便根据变量动态生成路径。

- 限制：路径必须是字符串字面量，不能使用模板字符串或复杂动态逻辑。

## 4. 使用 Vue 的 staticClass 和内联样式绑定图片

在 Vue 2 中，可以通过内联样式动态加载图片：

```js
<template>
  <div :style="{ backgroundImage: `url(${require('@/assets/example.jpg')})` }" class="image-container"></div>
</template>

<style>
.image-container {
  width: 300px;
  height: 200px; 
  background-size: cover;
}
</style>
```

优点：适合背景图场景。
