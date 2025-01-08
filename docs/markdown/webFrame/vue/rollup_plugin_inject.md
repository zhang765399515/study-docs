# <font color=#9898E5>整理多组件频繁导入公用组件</font>

本文背景主要是受不了项目中频繁使用一些公共组件，但是在每个组件中都会去做导入，想做个一次性导入

在项目中有很多种方案可以做到这样的需求，我自己整理了两个方案；

## 方案一：使用 @rollup/plugin-inject（推荐）

这是使用了`rollup`的插件，通过在`vite.config`新增`插件`的方式注册到全局

### 步骤 1：创建一个工具方法封装

安装依赖 `rollup/plugin-inject`

```js
npm i @rollup/plugin-inject
```

### 步骤 2 使用该依赖导入对应文件

导入这儿根据项目的使用，团队的习惯有几种不同的方式，根据具体需求进行导入

#### 方法 1：为 auth.js 添加默认导出（推荐）

直接在 `auth.js` 末尾添加默认导出，将方法包装成一个对象：

```js
import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

// 添加默认导出
export default {
  getToken,
  setToken,
  removeToken
};
```

这样可以保持命名导出和默认导出共存，满足不同场景需求。

#### 方法 2：修改 `vite.config.ts` 的注入配置

如果你不希望修改 `auth.js` 文件，可以调整`@rollup/plugin-inject` 的配置，改用命名导出：

```js
import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  plugins: [
    inject({
      $auth: ['@/utils/auth', '*']  // 使用命名导出，全部引入到 $auth 下
    })
  ]
});
```

这样生成的代码相当于：

```js
import * as $auth from '@/utils/auth';
```

调用时可以这样使用：

```js
$auth.getToken();
$auth.setToken('token');
```

#### 方法 3：手动指定导出函数

如果只需要部分函数，可以这样配置：

```js
export default defineConfig({
  plugins: [
    inject({
      getToken: ['@/utils/auth', 'getToken'],
      setToken: ['@/utils/auth', 'setToken'],
      removeToken: ['@/utils/auth', 'removeToken']
    })
  ]
});
```

这样调用时就像是全局函数一样：

```js
getToken();
setToken('token');
removeToken();
```

选择合适的方法
如果可以修改 auth.js，`方法 1` 最简单且符合逻辑。
如果不想改动原始文件，`方法 2` 或`方法 3` 更适合，尤其是`方法 2` 能一次性引入全部方法。

## 方案二：使用 app.config.globalProperties

这是 Vue 3 提供的方式，可以将方法或对象挂载到全局。

### 步骤 1：创建一个工具方法封装

在 `src/utils/auth.js` 中已经有了方法，我们保持不变：

```js
// 文件路径 src/utils/auth.js
import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
```

### 步骤 2：封装一个插件并挂载到全局

创建一个 `src/plugins/globalMethods.js` 文件：

```js
import * as auth from '@/utils/auth';

export default {
  install(app) {
    app.config.globalProperties.$auth = auth;
  }
};
```

### 步骤 3：在 main.js 中注册插件

```js
import { createApp } from 'vue';
import App from './App.vue';
import globalMethods from './plugins/globalMethods';

const app = createApp(App);
app.use(globalMethods);
app.mount('#app');
```

### 步骤 4：在组件中直接使用

``` vue
<script setup>
const token = $auth.getToken();
$auth.setToken('new-token');
</script>
```

## 相关参考

<CustomLink title='《ChatGpt》'  desc='即时答案。更高生产力。无尽灵感。'   href='https://chatgpt.com/c/67413949-5c1c-800a-9f85-b9b4fb73b699'/>