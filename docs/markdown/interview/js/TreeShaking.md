# 树摇（Tree Shaking）优化

树摇（Tree Shaking） 是一种在 JavaScript 项目中通过静态分析代码，`移除未使用的代码` 的技术。

其目的是减少最终打包文件的大小，提升应用的加载性能。

## 为什么叫“树摇”？

“树摇”这个名字来自于一种类比：你可以想象代码库是一个“树”，树上有许多“叶子”（模块）。树摇的过程就是“摇晃”这棵树，掉落那些没有被使用的“叶子”，最终留下你真正需要的代码。这个过程有点像摇晃一棵树，掉下的部分就是不再需要的代码。

## 如何工作？

树摇基于 JavaScript 模块化的静态结构，它依赖于 **ES6 模块系统**（`import` 和 `export`）的静态特性。通过静态分析，树摇可以识别出哪些代码块、函数、变量或类并没有在项目中被使用，从而将它们从最终的打包文件中移除。

## 基本流程

1. **代码分析**：构建工具（如 Webpack、Rollup、Vite 等）会分析你的代码，查找哪些模块、函数、变量是被引用的，哪些是没有被使用的。
2. **删除未使用的部分**：工具会移除那些没有被使用的代码（即所谓的“死代码”）。
2. **打包输出**：最终，只有那些被引用和需要的代码会被打包到最终的输出文件中，减少了打包体积。

## 树摇的前提条件

- **使用 ES6 模块系统**：树摇技术依赖于 import 和 export 的静态语法特性，因此 CommonJS 或其他模块化系统（如 AMD）不支持树摇。
- **构建工具支持树摇**：树摇是通过构建工具实现的，常见的构建工具如 Webpack、Rollup 和 Vite 都支持树摇。

示例：树摇的效果

假设你有一个模块 `math.js`，其中包含多个功能函数：

```js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  return a / b;
}
```

然后，你只在某个文件中使用了 `add` 和 `subtract` 函数：

```js
import { add, subtract } from './math';

console.log(add(1, 2));
console.log(subtract(5, 3));
```

在没有树摇优化的情况下，如果你导入整个 math.js 文件，打包工具会将 math.js 中所有的代码（包括 `multiply` 和 `divide` 函数）都打包到最终文件中，即使你并没有用到它们。

而 `树摇` 技术会分析出你只使用了 `add` 和 `subtract`，因此 `multiply` 和 `divide` 函数 将不会被包含在最终打包文件中，从而减少了不必要的代码。

## 树摇的实现方式

- **静态分析**：树摇的关键是通过 `静态分析` 代码结构（例如 import、export）来找出哪些代码没有被使用。构建工具在打包时会依赖这项技术进行死代码的移除。

  - 静态分析可以查看每个导入的模块，判断它们的依赖关系，确保只有实际被使用的部分会被保留。

- 死代码移除：如果构建工具发现某个模块或某个函数没有在其他地方被使用，那么它会在打包时把这些代码移除。

## 树摇的限制

- **无法应用于动态导入**：树摇**只对静态 `import` 和 `export` 起作用**。对于动态导入（如 import()），由于动态导入是按需加载的，打包工具通常无法在构建时分析这些模块的使用情况，所以不能进行树摇优化。

- **使用了 CommonJS 模块无法进行树摇**：树摇依赖于 ES6 的静态导入和导出语法。对于 `CommonJS` 模块，由于其导出方式是动态的，构建工具无法做静态分析，因此无法进行树摇优化。

树摇的配置：

不同的构建工具提供了不同的方式来启用树摇：

1. Webpack：
在 Webpack 中，树摇的默认行为是开启的，只要你的项目使用了 **ES6 模块** 和 **生产环境构建模式**。你可以通过设置 mode: 'production' 来启用树摇：

```js
module.exports = {
  mode: 'production',  // 开启生产模式，启用树摇优化
  optimization: {
    usedExports: true,  // 显示哪些导出没有被使用
  },
};
```

2. Rollup：
Rollup 天生就支持树摇，因为它原生支持 **ES6 模块**。只需要确保你使用的是 ES6 的静态导出：

```js
export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  treeshake: true,  // 启用树摇
};
```

3. Vite：
Vite 默认使用 **ESM** 和 **Rollup** 作为构建工具，因此树摇是自动启用的。只要构建模式为生产模式，就会自动进行树摇：

```js
// Vite 会自动启用树摇，无需额外配置
```

## 树摇的好处

::: tip

1. **减小打包体积**：通过移除未使用的代码，可以显著减小打包文件的大小，提高应用加载速度。
2. **提升性能**：减少了下载和执行无用代码，尤其是对于大型应用来说，能够提升性能。
3. **优化用户体验**：应用加载更快，响应时间更短，提供更流畅的用户体验。
:::

## 总结

**树摇（Tree Shaking）** 是一种优化技术，通过静态分析代码，移除项目中未使用的代码，从而减少最终打包的大小。它通常依赖于 **ES6 模块化**，并且需要构建工具（如 Webpack、Rollup 或 Vite）支持。正确配置树摇优化，可以显著减小最终的打包文件，提升应用的加载速度和性能。
