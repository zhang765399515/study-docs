# UseToggle 的源码

## 1. useToggle 是什么

`useToggle` 通常是一个自定义的 `React Hook`，用于处理布尔值的切换逻辑。在 `React` 中，`Hook` 是一种特殊的函数，它可以让你在不编写 `class` 的情况下使用 `state` 以及其他 `React` 特性。`useToggle` 主要用于在两种状态之间进行切换，最常见的是 `true 和 false` 之间的`切换`。

## 2. 如何实现和使用 useToggle

```ts

**实现 useToggle**

下面是一个简单的 `useToggle Hook` 的实现：

```jsx
import { useState } from 'react';

// 自定义 useToggle Hook
const useToggle = (initialValue = false) => {
    // 使用 useState 来管理布尔值状态
    const [value, setValue] = useState(initialValue);

    // 定义切换函数
    const toggle = () => {
        setValue(prevValue => !prevValue);
    };

    // 返回状态值和切换函数
    return [value, toggle];
};

export default useToggle;
```

在上述代码中：

- 首先引入了 React 的 `useState` Hook。
- useToggle 函数接收一个可选的初始值 `initialValue`，默认值为 `false`。
- 使用 `useState` 来创建一个状态变量 `value` 以及对应的更新函数 `setValue`。
- 定义了一个 `toggle` 函数，用于切换 `value` 的值，它使用函数式更新来确保每次切换都是基于上一次的状态。
- 最后返回一个数组，包含当前的状态值 `value` 和切换函数 `toggle`。
**使用 useToggle**

```jsx
import React from 'react';
import useToggle from './useToggle';

const App = () => {
    // 使用 useToggle Hook
    const [isToggled, toggle] = useToggle(false);

    return (
        <div>
            <p>当前状态: {isToggled ? '开启' : '关闭'}</p>
            <button onClick={toggle}>切换状态</button>
        </div>
    );
};

export default App;
```

在这个示例中：

- 从自定义的 `useToggle` 文件中导入 `useToggle Hook`。
- 在 App 组件中调用 `useToggle` 并传入初始值 false，解构出当前的状态 `isToggled` 和切换函数 `toggle`。
- 在组件的返回值中，根据 `isToggled` 的值显示不同的文本，并提供一个按钮，点击按钮时调用 `toggle` 函数来切换状态。

## 3. 为什么要这样使用

- **提高代码复用性**
  - `useToggle` 把布尔值的切换逻辑封装起来，在多个组件中都可以复用这个逻辑。比如在一个应用里，有多个地方都需要实现开关的切换功能，只需要在这些组件中引入 `useToggle` 即可，而不需要在每个组件里重复编写切换逻辑。
- **分离关注点**
  - 将状态管理和切换逻辑从组件中分离出来，让组件的代码更加简洁，专注于 UI 渲染和事件处理。这样可以提高代码的可读性和可维护性，当切换逻辑需要修改时，只需要在 `useToggle` 中进行修改，而不会影响到使用它的组件。

## 4. 如果使用state,而不使用useToggle

则需要在每个组件都添加修改逻辑

```jsx
const ComponentA = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    };
    return (
        <button onClick={toggleOpen}>{isOpen ? '关闭' : '打开'}</button>
    );
};
```
