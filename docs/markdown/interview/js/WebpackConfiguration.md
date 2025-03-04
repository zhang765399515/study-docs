# webpack 配置分析

这里将配置项分为了 3 个文件

::: tip
`base.config.ts`

`client.config.ts`

`server.config.ts`

:::
其中 `base.config.ts` 为通用基础文件,为 `client.config` 和 `server.config` 使用的文件,放在文件最后解析.

## **server.config.ts**

本文件主要是运行环境为server环境的时候使用

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

1. **target: 'node'**

指定打包目标是 Node.js 环境，Webpack 会处理一些 Node.js 特有的模块，比如 fs 和 path。

2. **devtool**

用于生成 Source Map，方便调试。

- `isDev` 为 `true` 时 (开发环境): 使用 **'inline-source-map'**，方便快速调试。

- `isDev` 为 `false` 时 (生产环境): 使用 **'source-map'**，分离的 **Source Map** 文件，减少生产环境体积。

**🎯 inline-source-map 和 source-map 的区别**

两者都是用于生成 **Source Map** 的配置选项，方便在调试时看到原始代码，而不是压缩后的代码。它们的主要区别在于 **Source Map 的存储位置和形式**。