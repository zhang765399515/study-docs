# React 针对CPU卡顿做了些什么？

本文主要针对React 在Cpu上的优化做了一些总结。

## 1. 为什么会有卡顿？

在 React 中，CPU 卡顿通常是由于大量的计算或复杂的渲染逻辑导致 JavaScript 主线程被长时间占用，从而影响页面的响应性能。为了解决这个问题，React 提供了一些方法和特性，以下是详细介绍：

### 1.1 使用 React.memo 进行组件浅比较

`React.memo` 是一个高阶组件，它可以对函数组件进行浅比较，只有当组件的 props 发生变化时才会重新渲染组件。这可以避免不必要的渲染，减少 CPU 的计算量。

**示例代码：**

```jsx
import React from 'react';

// 被包裹的组件
const MyComponent = React.memo((props) => {
  return <div>{props.message}</div>;
});

// 父组件
const ParentComponent = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      {/* 即使 count 变化，只要 message 不变，MyComponent 就不会重新渲染 */}
      <MyComponent message="Hello, World!" />
    </div>
  );
};

export default ParentComponent;
```

### 1.2 使用 useMemo 和 useCallback 缓存计算结果和函数

- `useMemo`：用于缓存计算结果，只有当依赖项发生变化时才会重新计算。

- `useCallback`：用于缓存函数，只有当依赖项发生变化时才会重新创建函数。

**示例代码：**

```jsx
import React from 'react';

const ParentComponent = () => {
  const [count, setCount] = React.useState(0);

  // 使用 useMemo 缓存计算结果
  const expensiveValue = React.useMemo(() => {
    // 模拟一个耗时的计算
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += i;
    }
    return sum;
  }, []);

  // 使用 useCallback 缓存函数
  const handleClick = React.useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <p>Count: {count}</p>
      <p>Expensive Value: {expensiveValue}</p>
    </div>
  );
};

export default ParentComponent;
```

### 1.3 使用 React.lazy 和 Suspense 进行代码分割和懒加载

使用 React.lazy 和 Suspense 进行代码分割和懒加载，将大型组件或模块分割成多个小的代码块，只有在需要时才加载这些代码块，从而减少初始加载时间和 CPU 负担。

- `React.lazy`：用于动态加载组件，只有在组件被渲染时才会加载。

- `Suspense`：用于在组件加载过程中显示一个加载指示器。

**示例代码：**

```jsx

import React, { Suspense } from 'react';

// 懒加载组件
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
};

export default App;
```

### 1.4 使用 React 的并发模式（Concurrent Mode）

React 的并发模式是一种新的渲染模式，它允许 React 在渲染过程中暂停、继续和中断渲染任务，从而提高页面的响应性能。在并发模式下，React 可以将渲染任务拆分成多个小任务，并且可以在空闲时间逐步执行这些任务，避免长时间占用主线程。

**示例代码：**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  return <div>Hello, Concurrent Mode!</div>;
};

// 使用 createRoot 启用并发模式
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**核心概念**

**1. 可中断渲染**
在传统的 React 渲染模式中，一旦开始渲染，渲染过程会一直进行直到完成，期间会阻塞主线程。而并发模式引入了可中断渲染的概念，React 可以将渲染任务拆分成多个小的工作单元，并在每个工作单元完成后暂停渲染，检查是否有更高优先级的任务需要处理，如用户的点击或输入事件。如果有，React 会暂停当前的渲染任务，先处理这些高优先级任务，处理完后再继续之前的渲染任务。

**2. 时间切片`（Time Slicing）`**
并发模式利用时间切片技术，将渲染任务分散到多个帧中执行。在每一帧中，React 只会执行一小段渲染工作，然后将控制权交还给浏览器，让浏览器有时间处理其他任务，如绘制页面、处理用户输入等。这样可以避免长时间占用主线程，使页面保持流畅响应。

**3. 优先级调度**
并发模式引入了优先级调度机制，不同的更新可以有不同的优先级。例如，用户的输入事件（如点击按钮）通常具有较高的优先级，而一些后台数据的更新（如定期的数据拉取）可以具有较低的优先级。React 会根据更新的优先级来调度渲染任务，优先处理高优先级的更新，确保用户交互能够得到及时响应。

**并发模式相关的新特性**

**1. startTransition**

`startTransition` 是并发模式中一个重要的 API，用于标记某些更新为低优先级的过渡更新。当使用 startTransition 包裹一个更新时，React 会将这个更新标记为过渡更新，允许在有更高优先级的任务时中断这个更新的渲染。

```jsx
import React, { useState, startTransition } from'react';

const App = () => {
  const [isPending, setIsPending] = useState(false);
  const [list, setList] = useState([]);

  const handleClick = () => {
    // 模拟一个耗时的更新
    const newList = Array.from({ length: 10000 }, (_, i) => i);

    // 使用 startTransition 标记为过渡更新
    startTransition(() => {
      setIsPending(true);
      setList(newList);
      setIsPending(false);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Load List</button>
      {isPending && <p>Loading...</p>}
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```

**2.  useDeferredValue**

`useDeferredValue` 是一个 React Hook，用于创建一个延迟值。它可以将一个值延迟更新，直到高优先级的任务处理完成。这在处理大量数据或复杂渲染时非常有用，可以避免阻塞主线程。

```jsx
import React, { useState, useDeferredValue } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  // 使用 useDeferredValue 创建延迟值
  const deferredValue = useDeferredValue(inputValue);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p>Immediate value: {inputValue}</p>
      <p>Deferred value: {deferredValue}</p>
    </div>
  );
};

export default App;
```
