# webpack 配置分析

这里将配置项分为了 3 个文件

::: tip
`base.config.ts`

`client.config.ts`

`server.config.ts`

:::
其中 `base.config.ts` 为通用基础文件,为 `client.config` 和 `server.config` 使用的文件,放在文件最后解析.

## **server.config.ts**

本文件主要是运行环境为 `server` 环境的时候使用

其中源码为

```js
import path from 'path';
import webpack, { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import merge from 'webpack-merge';

import baseConfig, { isDev } from './base.config';

const config: Configuration = {
  target: 'node',//指定打包目标是 Node.js 环境，Webpack 会处理一些 Node.js 特有的模块，比如 fs 和 path。
  devtool: isDev ? 'inline-source-map' : 'source-map',
  entry: './src/server',
  output: {
    filename: 'index.js',
    chunkFilename: '[id].js',
    path: path.resolve(process.cwd(), 'public/server'),
    libraryTarget: 'commonjs2',
  },
  node: { __dirname: true, __filename: true },
  externals: [
    '@loadable/component',
    nodeExternals({
      // Load non-javascript files with extensions, presumably via loaders
      allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
    }),
  ] as Configuration['externals'],
  plugins: [
    // Adding source map support to node.js (for stack traces)
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
    }),
  ],
};

export default merge(baseConfig(false), config);

```

### 引入模块 解析

- **import path from 'path'**
  - `path` 模块是 Node.js 的核心模块，提供了一些用于处理文件路径的小工具,Node.js **内置模块**，用于处理文件和目录路径。

- **import webpack, { Configuration } from 'webpack'**
  - `webpack` 是一个模块打包器，它将根据模块的依赖关系和配置，将所有的模块打包成一个或多个 bundle。
  - `Configuration` 用于类型检查
- **import nodeExternals from 'webpack-node-externals'**
  - `webpack-node-externals` 是一个 webpack ��件，可以让 webpack 排除掉一些模块，这些模块在 Node.js 环境中可以正常运行。
- **import merge from 'webpack-merge'**
  - `webpack-merge` 是一个 webpack ��件，可以将多个 webpack 配置片段合并成一个。

### 配置文件 解析

**1. target: 'node'**

指定打包目标是 Node.js 环境，Webpack 会处理一些 Node.js 特有的模块，比如 fs 和 path。

**2. devtool**

用于生成 Source Map，方便调试。

- `isDev` 为 `true` 时 (开发环境): 使用 **'inline-source-map'**，方便快速调试。

- `isDev` 为 `false` 时 (生产环境): 使用 **'source-map'**，分离的 **Source Map** 文件，减少生产环境体积。

**🎯 inline-source-map 和 source-map 的区别**

  两者都是用于生成 **Source Map** 的配置选项，方便在调试时看到原始代码，而不是压缩后的代码。它们的主要区别在于 **Source Map 的存储位置和形式**。

  | 区别项 | inline-source-map|  source-map|
  | ------ | ----------- |----------- |
  | Source Map 存储位置|  直接内嵌在打包后的 JS 文件里|  独立的 .map 文件|
  | 体积大小|  文件大，因为内嵌了 Source Map|  文件小，.map 文件单独存在|
  | 适合场景|  开发环境，方便调试|  生产环境，便于管理 .map 文件|
  | 安全性|  不适合生产环境，可能暴露源码|  可以选择不发布 .map 文件，安全性高|
  | 配置示例 | devtool: 'inline-source-map'|  devtool: 'source-map'|
**总结**

- '`inline-source-map`':
  - 开发环境好用，方便调试，但文件大，不安全。
- '`source-map`':
  - 生产环境常用，性能好，可选择性发布 .map 文件。
  
**3. entry: './src/server'**

- 表示 Webpack 会从 ./src/server 这个文件开始，递归地解析、打包它所依赖的所有模块。

**4. output**

- **filename: 'index.js'**
  - 打包后主文件名为 `index.js`

- **chunkFilename: '[id].js'**

  动态加载模块的文件命名格式，如 0.js、1.js 等。
  - `[id]`:
    - 是 Webpack 自动分配给每个 `chunk`(分片) 的一个 ID（通常是数字）。
  - `[.js]`:
    - 文件后缀，表示这些 `chunk`(分片) 是 JavaScript 文件。
  - `[name]`:
    - 按需加载模块的名字，比如 模块about 就生成 about.js。
  - `[contenthash]`:
    - 根据文件内容生成的哈希，适合防缓存。
    例：

    ```js
    chunkFilename: '[name].[contenthash].js'
    //生成js
    about.abcdef123.js, contact.ghijk456.js, ...
    ```

  - `[chunkhash]`:
    - 根据 chunk 内容生成的哈希。
  - `[hash]`:
    - 整个项目的哈希（不推荐用在 chunkFilename）。
- **path: path.resolve(process.cwd(), 'public/server')**
  - 指定打包后的文件输出路径为 public/server 目录， process.cwd()是项目根路径。

    - 实际输出： `process.cwd() + public/server`

- **libraryTarget: 'commonjs2'**
  - 指定模块规范为 CommonJS (适用于 Node.js 的模块加载方式)。

**5. node: { __dirname: true, __filename: true }**

- `__dirname: true` 和 `__filename: true`:
  - 保留 Node.js 原生的 __dirname 和__filename 值。
  - 如果不配置，Webpack 会替换成相对路径，导致服务端代码找不到路径。

**6. externals**

- **1. '@loadable/component'**

  - 这是一个外部依赖模块。Webpack 会认为这个模块是外部的，因此不会将它打包进你的输出文件。
  - @loadable/component 是一个用于支持代码分割和懒加载的 React 组件库。

- **2. nodeExternals({...})**

  - nodeExternals 是一个函数，来自 webpack-node-externals 包。
  - 它用于告诉 Webpack 排除 Node.js 环境下的外部模块，即这些模块不会被打包。
  - 它通常用于服务端代码，避免把 Node.js 内置模块（如 fs, path 等）和项目的 node_modules 目录中的依赖都打包进来。

- **3. allowlist: [ ... ]**

  - allowlist 配置项用于指定一些特定的模块或文件类型，尽管它们被 nodeExternals 排除，但这些模块仍然可以被打包。
  - 在这里，正则表达式 \.(?!(?:jsx?|json)$).{1,5}$/i 表示允许一些特定的 非 JavaScript 和非 JSON 文件（如图片、CSS 文件等）被 - Webpack 处理，默认情况下这些文件会被 nodeExternals 排除。

**7. plugins**

- **BannerPlugin**:
  - 在打包后的文件头部添加代码或注释。
- **banner 配置项:**
  - 添加 `require("source-map-support").install()`
    - 这段代码的作用是 安装 `source-map-support` 模块，这个模块可以让 Node.js 更好地支持 源映射 (source maps)，用于调试打包后的代码时提供原始的文件和行号，而不是打包后的文件和行号。
- **raw: true:**
  - 表示 banner 的内容是代码而不是注释，直接插入到打包后的文件顶部。
举个例子：

假设你有一段代码：

```ts
// src/app.ts
const add = (a: number, b: number) => a + b;
console.log(add(2, 3));
```

经过打包后，代码可能会变成一行压缩代码：

```js
const add = (a,b)=>a+b;console.log(add(2,3));
```

如果启用了 `source-map-support`，即使是压缩后的代码抛出错误，错误堆栈会指向源代码中的准确行号，而不是压缩后的行号。

## **client.config.js**

本文件主要是运行环境为 `dev` 环境的时候使用

其中源码为

```js
import path from 'path';
import webpack, { Configuration } from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import merge from 'webpack-merge';

import baseConfig, { isDev } from './base.config';

const getPlugins = () => {
  let plugins = [
    new MiniCssExtractPlugin({
      // Don't use hash in development, we need the persistent for "renderHtml.ts"
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
    }),
  ];

  if (isDev)
    plugins = [
      ...plugins,
      new webpack.HotModuleReplacementPlugin(),//热更新
      new ReactRefreshWebpackPlugin({ overlay: { sockIntegration: 'whm' } }),//快速局部更新，状态保留功能
    ];

  return plugins;
};

const config: Configuration = {
  devtool: isDev && 'eval-cheap-source-map',
  entry: isDev ? ['webpack-hot-middleware/client?reload=true', './src/client'] : './src/client',
  output: {
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDev ? '[id].js' : '[id].[contenthash].js',
    path: path.resolve(process.cwd(), 'public/assets'),
    publicPath: '/assets/',
  },
  optimization: { minimizer: [new CssMinimizerPlugin()] },
  plugins: getPlugins(),
};

export default merge(baseConfig(true), config);

```

### 引入模块 解析

- **path**:
  - 用来处理路径，确保在不同操作系统下路径的一致性。
- **webpack**:
  - 导入 Webpack 本身。
- **ReactRefreshWebpackPlugin**:
  - 用于支持 React Fast Refresh（开发环境下让 React 应用能够`快速更新`）。
- **MiniCssExtractPlugin**:
  - 用于将 CSS 提取到单独的文件中，`优化 CSS 加载`。
- **CssMinimizerPlugin**:
  - 用于压缩 CSS，`减少文件体积`。
- **merge**:
  - 用来合并多个 Webpack 配置文件。

### 配置文件 解析

`server.config.js` 中已提过的不再重复

**1. output**

- **publicPath**
  - 用来指定 Webpack 构建时，静态资源访问的路径（相对 URL）。这里设置为 /assets/，意味着你在 HTML 文件中引入的静态资源路径会以 /assets/ 开头。

**2. optimization**

- 使用 CssMinimizerPlugin 来压缩 CSS 文件，减小文件体积。
- 这个插件只有在生产环境下才会启用，以优化 CSS 文件的大小。

**3. MiniCssExtractPlugin**:

- 用于将 CSS 提取到独立的文件中。
- 在开发环境中，使用 `[name].css` 来确保文件名不包含哈希，以便更方便的调试；在生产环境中，使用 `[name].[contenthash].css` 生成*带哈希的文件名，帮助浏览器缓存管理。

**4. webpack.HotModuleReplacementPlugin**:

- 只在开发环境使用，启用 热模块替换（HMR），允许在不刷新页面的情况下替换模块。

**5. ReactRefreshWebpackPlugin**:

- 仅在开发环境使用，启用 React Fast Refresh 支持，允许你在开发过程中对 React 组件的修改进行快速更新。

## base.config.ts

```js
import path from 'path';
import webpack, { Configuration, WebpackPluginInstance, RuleSetUseItem } from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export const isDev = process.env.NODE_ENV === 'development';

const getStyleLoaders = (isWeb: boolean, isSass?: boolean) => {
  let loaders: RuleSetUseItem[] = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: isSass ? 2 : 1,
        modules: {
          auto: true,
          localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64]',//即开发环境，类名会按照 [path][name]__[local] 的格式生成，这样便于调试，生成的类名包含了文件路径和文件名。
          exportOnlyLocals: !isWeb,//不是 Web 环境，exportOnlyLocals: true 会仅导出局部 CSS 类名
        },
      },
    },
    { loader: 'postcss-loader' },
  ];

  if (isWeb) loaders = [MiniCssExtractPlugin.loader, ...loaders];

  if (isSass) loaders = [...loaders, { loader: 'sass-loader' }];

  return loaders;
};

const getPlugins = (isWeb: boolean) => {
  let plugins = [
    new webpack.ProgressPlugin(),//进度插件
    new WebpackManifestPlugin({//通用名称 seo？
      fileName: path.resolve(process.cwd(), 'public/webpack-assets.json'),
      filter: (file) => file.isInitial,
    }),
    new LoadablePlugin({//代码分割
      writeToDisk: true,
      filename: '../loadable-stats.json',
    }),
    // Setting global variables
    new webpack.DefinePlugin({//注入window变量
      __CLIENT__: isWeb,
      __SERVER__: !isWeb,
      __DEV__: isDev,
    }),
  ];

  if (isDev)
    plugins = [
      ...plugins,
      new ForkTsCheckerWebpackPlugin({//ts检查工具
        eslint: { files: './src/**/*.{js,jsx,ts,tsx}' },
      }),
    ];

  if (!isDev)
    plugins = [
      ...plugins,
      new BundleAnalyzerPlugin({
        analyzerMode: process.env.NODE_ENV === 'analyze' ? 'server' : 'disabled',
      }),
    ];

  return plugins;
};

const config = (isWeb = false): Configuration => ({
  mode: isDev ? 'development' : 'production', //判断运行环境（开发环境/生产环境），
  stats: 'minimal',//配置 Webpack 输出的构建信息，这里设置为 minimal，仅输出必要的信息。
  context: path.resolve(process.cwd()),//读取当前文件路径，决定了 Webpack 在什么目录下查找入口文件及其相关资源。
  output: { clean: true },//是否清理上次输出，确保本次打包文件清晰。
  optimization: {//优化
    minimizer: [
      new TerserPlugin({//使用 TerserPlugin 来压缩 JavaScript，移除 console 调用，减小文件体积。压缩代码\混淆变量名\移除控制台日志
        // See more options: https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        terserOptions: { compress: { drop_console: true } },
      }),
    ],
  },
  plugins: getPlugins(isWeb) as WebpackPluginInstance[],//打包分析
  module: {
    rules: [
      {//使用 babel-loader 处理 .js 文件，将其从现代 JavaScript（如 ES6）转换为兼容的 ES5 代码，以便在老旧浏览器中运行。
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          caller: { target: isWeb ? 'web' : 'node' },
          cacheDirectory: isDev,
        },
      },
      {
        test: /\.css$/,
        use: getStyleLoaders(isWeb),
      },
      {
        test: /\.(scss|sass)$/,
        use: getStyleLoaders(isWeb, true),
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset',
        generator: { emit: isWeb },
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset',
        generator: { emit: isWeb },
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],//Webpack 在查找模块时，会先在 src 目录中查找，然后再在 node_modules
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],//导入文件时可以省略尾缀
  },
});

export default config;
```

这里做一些特殊的点做详细解释

1. `mode`

- 1. `development 模式`

  在开发模式下，Webpack 会以更适合开发过程的方式来构建项目。它主要关注开发效率和调试体验，具体表现为：
  ::: tip
  - 更快的构建速度：Webpack 启用一些开发优化来提高构建速度。
  - 不压缩代码：开发模式下的代码不会进行压缩，保持原样方便调试。
  - 启用 Source Maps：帮助调试，允许你在浏览器的开发者工具中查看源代码，而不是打包后的代码。
  - 启用模块热替换（HMR，Hot Module Replacement）：允许你在不刷新页面的情况下更新页面中的某些模块，从而加快开发过程。
  :::
- 2. `production 模式`

  在生产模式下，Webpack 会启用一系列优化来尽可能减小构建结果的体积，并提高加载和执行的性能：
  ::: tip
  - 代码压缩：Webpack 会自动压缩 JavaScript 和 CSS 文件，减少文件体积。比如会使用 TerserPlugin 来压缩 JavaScript 代码。
  - Tree Shaking：移除项目中未使用的代码，从而减小最终输出文件的大小。
  - 优化代码分割：自动生成更合理的代码分割，使得页面加载时能够按需加载模块，减少初次加载的文件大小。
  - Source Map：生产模式下，Webpack 会生成对应的 source-map，但一般会使用更合适的配置（如 hidden-source-map），避免暴露源代码。
  :::
