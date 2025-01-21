# Loader 和 Plugin 的作用和区别

在 Webpack 3 中，Loader 和 Plugin 是两种不同的机制，用于不同的目的和阶段，理解它们的区别对于使用 Webpack 来构建项目非常重要。

## 1. Loader

Loader 主要用于转换或处理文件的内容。Webpack 是一个模块打包工具，而 Loader 用于告诉 Webpack 如何处理模块中的源代码（如 JavaScript、CSS、图片等）。Loader 通常是处理文件内容的转换器，例如将 ES6 代码转为 ES5，或者将 SASS 文件编译成 CSS。

`特点：`

+ 功能：处理文件转换。Loader 主要负责对文件内容进行转换和处理。
+ 执行时机：Loader 在 Webpack 编译阶段的构建流程中执行，具体来说，它会在打包之前处理文件内容。
    ::: info 使用场景
  + 转换 ES6 代码到 ES5（如使用 babel-loader）。
  + 处理样式文件，如 style-loader、css-loader。
  + 加载图片、字体等资源（如 url-loader、file-loader）。
    :::
示例：

```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: 'babel-loader'
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}
```

附一些常用的Loader：

+ `babel-loader`：将ES6+的代码转换成ES5的代码。
+ `css-loader`：解析CSS文件，并处理CSS中的依赖关系。
+ `style-loader`：将CSS代码注入到HTML文档中。
+ `file-loader`：解析文件路径，将文件赋值到输出目录，并返回文件路径。
+ `url-loader`：类似于file-loader，但是可以将小于指定大小的文件转成base64编码的Data URL格式
+ `sass-loader`：将Sass文件编译成CSS文件。
+ `less-loader`：将Less文件编译成CSS文件。
+ `postcss-loader`：自动添加CSS前缀，优化CSS代码，适配各种浏览器等。
+ `vue-loader`：将Vue单文件组件编译成JavaScript代码。

## 2. Plugin

Plugin 是 Webpack 更加通用的工具，用于执行更复杂的操作，它可以用于构建生命周期的各个阶段。与 Loader 只专注于文件内容的转换不同，Plugin 可以干预整个构建过程，例如优化代码、生成 HTML 文件、提取 CSS、压缩代码等。

`特点：`

+ 功能：执行复杂的构建过程和优化任务。例如生成 HTML 文件、代码压缩、提取和合并文件等。
+ 执行时机：Plugin 是在 Webpack 的生命周期中各个阶段执行的，通常它在 Loader 之后执行，并且它的作用是对 Webpack 的输出结果进行处理或优化。
    ::: info 使用场景：
  + 优化打包结果（如使用 TerserPlugin 压缩代码）。
  + 生成和插入 HTML 文件（如 HtmlWebpackPlugin）。
  + 提取公共代码（如 CommonsChunkPlugin）。
  + 打包分析（如 BundleAnalyzerPlugin）。
    :::
示例：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```

附一些常用的Plugin：

+ `HtmlWebpackPlugin`：生成HTML文件，并自动将打包后的javaScript和CSS文件引入到HTML文件中。
+ `CleanWebpackPlugin`：清除输出目录。
+ `ExtractTextWebpackPlugin`：将CSS代码提取到单独的CSS文件中。
+ `DefinePlugin`：定义全局变量。
+ `UglifyJsWebpackPlugin`：压缩JavaScript代码。
+ `HotModuleReplacementPlugin`：热模块替换，用于在开发环境下实现热更新。
+ `MiniCssExtractPlugin`：与ExtractTextWebpackPlugin类似，将CSS代码提取到单独的CSS文件中。
+ `BundleAnalyzerPlugin`：分析打包后的文件大小和依赖关系。

## 总结

::: tip
Loader：用于文件转换，处理文件的内容。它是用来加载和处理源文件的，在构建过程中早期阶段使用。

Plugin：用于执行更复杂的任务，可以在构建的各个阶段进行干预，通常用于优化、生成和处理构建输出。
:::
简单来说，Loader 负责转换文件内容，Plugin 负责对整个构建过程进行优化和增强。两者配合使用，以实现 Webpack 的强大功能。
