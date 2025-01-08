# Composition API是什么？

Composition API 是 Vue 3 引入的一组新的 API，允许开发者以更灵活、模块化的方式组织组件逻辑。通过使用 setup 函数，可以将组件逻辑按功能进行拆分，而不是按照生命周期钩子分散在不同的位置。

## 1、核心组成部分

+ reactive 和 ref：创建响应式数据
+ computed：计算属性
+ watch 和 watchEffect：监听数据变化
+ provide/inject：跨层级依赖注入
+ lifecycle hooks：生命周期钩子（如 onMounted, onUnmounted）

## 2. Composition API与Options API的区别

Options API 是 Vue 2 及 Vue 3 兼容模式下常用的组件逻辑组织方式，主要通过 data、methods、computed 等选项来定义组件。

主要区别：

| 特性 | Composition API | Options API |
| ------ | ----------- | ----------- |
| 组织方式 | 基于函数，按功能组织 | 按选项分类，逻辑分散 |
| 代码复用 | 通过函数提取和组合复用逻辑 | 通过 mixin 和扩展组件实现复用 |
| 类型支持 | 更容易与 TypeScript 集成 | 类型推断较为复杂 |
| 可读性与维护性 | 复杂组件更容易组织，代码可读性高 | 复杂组件容易导致逻辑混乱 |
| 逻辑拆分 | 将相关逻辑集中在一起，避免拆散在不同钩子中 | 同一逻辑可能分散在 data、methods 等中 |
| 性能 | 轻量，运行时更少的开销 | 稍微有更多运行时开销 |
| 学习曲线 | 需要学习新的 API 和范式 | 易于上手，符合直觉 |

## 3. 选择使用哪个API？

::: tip Composition API
    复杂组件需要更好的逻辑组织和代码复用
    使用 TypeScript 进行开发
    开发大型项目或长生命周期的项目
:::

::: tip Options API
    简单或中小型项目
    以 Vue 2 习惯为主的小型团队
    不需要复杂逻辑复用
:::
在实际项目中，可以根据需求灵活选择或组合使用两种 API。

## 4. Composition API 的优势

+ 代码复用更简单：通过抽离组合函数，逻辑复用更加清晰。
+ 可维护性更高：组件逻辑集中在 setup 函数中，复杂组件更容易维护。
+ 更强的类型推断：在 TypeScript 项目中，Composition API 提供更好的类型支持。
+ 更贴近函数式编程：符合现代 JavaScript 开发趋势，更易于集成其他库和工具。

Composition API 在大型项目和需要复杂逻辑复用的场景中尤为适用，而 Options API 则更适合快速开发和小型项目。
