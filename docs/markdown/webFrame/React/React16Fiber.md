# React 16 中的 Fiber 介绍

React Fiber 是 React 16 版本引入的核心渲染协调算法，它是并发模式的基础，为后续 React 18 引入并发模式提供了底层支持。下面从几个方面详细介绍 React 16 中的 Fiber：

## 1. 什么是 Fiber

Fiber 可以理解为一种数据结构，也代表一种新的协调算法。从数据结构角度看，Fiber 是一个 JavaScript 对象，它包含了组件的各种信息，如组件的类型、状态、属性等，同时还包含了指向其他 Fiber 节点的指针，用于构建一棵 Fiber 树。从算法角度看，Fiber 算法将渲染过程拆分成多个` 小 `的工作单元，每个工作单元就是一个 Fiber 节点的处理过程。

## 2. 为什么引入 Fiber

在 React 16 之前，React 使用的是基于栈的协调算法，这种算法在处理复杂组件树时存在一些问题：

- **阻塞主线程**：一旦开始渲染，渲染过程会一直进行直到完成，期间会阻塞主线程，导致页面无法响应用户的交互，出现卡顿现象。
- **无法中断和暂停**：渲染过程是不可中断的，即使有更高优先级的任务（如用户输入），也必须等到当前渲染任务完成后才能处理。

Fiber 算法的引入就是为了解决这些问题，它允许渲染过程可以被` 中断、暂停和恢复 `，从而提高应用的响应性能。

## 3. Fiber 的工作原理

Fiber 算法将渲染过程分为两个阶段：`协调阶段（Reconciliation Phase）`和 `提交阶段（Commit Phase）`。

### 协调阶段

- **`可中断`**：这个阶段 React 会遍历组件树，比较新旧虚拟 DOM 的差异，计算出需要更新的部分。
  - 由于这个阶段的工作是可以中断的，React 可以将这个阶段的工作拆分成多个小的工作单元，每个工作单元完成后，React 会检查是否有更高优先级的任务需要处理，如果有，则暂停当前的工作，先处理高优先级任务。

- **`基于 Fiber 节点`**：React 会为每个组件创建一个 Fiber 节点，这些 Fiber 节点构成了一棵 Fiber 树。在协调阶段，React 会从根节点开始，依次处理每个 Fiber 节点，计算出需要更新的部分。

### 提交阶段

- **`不可中断`**：一旦协调阶段完成，React 会进入提交阶段。这个阶段 React 会将协调阶段计算出的更新应用到真实的 DOM 上。由于这个阶段涉及到真实 DOM 的更新，所以是不可中断的，必须一次性完成。

## 4. 代码示例理解

虽然在实际开发中一般不会直接操作 Fiber 节点，但可以通过一个简单的组件示例来感受 Fiber 算法的作用：

```jsx
import React, { useState } from 'react';

const App = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <button onClick={handleClick}>Click me: {count}</button>
            {/* 模拟一个复杂的渲染 */}
            {Array.from({ length: 10000 }).map((_, index) => (
                <div key={index}>Item {index}</div>
            ))}
        </div>
    );
};

export default App;
```

## 可能存在的 `疑问`

###  **1. 默认js的任务分配时间是几ms？**

在 React Fiber 架构里，并没有固定的、全局统一的 JavaScript 任务分配时间，但它运用了` 时间切片（Time Slicing） `技术来控制渲染任务在每一帧的执行时长，下面为你详细介绍相关内容：

**时间切片机制**

Fiber 算法把渲染任务拆分成多个小的工作单元（每个工作单元对应一个 Fiber 节点的处理过程），并且在每一帧里分配一定的时间来执行这些小任务。通常情况下，浏览器会以 60 帧每秒（FPS）的频率进行页面渲染，也就是每帧的时间大概是 16.67ms（1000ms / 60） 。在 React Fiber 中，会尽量保证在一帧的部分时间（一般是 5ms 左右，但并非严格固定）内完成一个或多个小任务，然后把控制权交还给浏览器，让浏览器有时间去处理其他事务，例如绘制页面、响应用户输入等。

**背后的原理**

React 会在每一帧开始时检查当前帧剩余的可用时间。当开始执行一个 Fiber 节点的处理任务时，React 会持续追踪任务的执行时间。一旦任务执行时间快要达到这一帧分配给 React 渲染的时间上限，React 就会暂停当前任务，把控制权交还给浏览器，等到下一帧再继续执行未完成的任务。

**代码模拟理解**
以下是一个简单的代码示例，用于模拟 React Fiber 的时间切片机制：

```js
// 模拟 Fiber 节点
class FiberNode {
    constructor(name) {
        this.name = name;
        this.next = null;
    }
}

// 模拟 Fiber 任务队列
let firstFiber = null;
let currentFiber = null;

// 创建一些 Fiber 节点并构建队列
function createFibers() {
    const fiber1 = new FiberNode('Fiber 1');
    const fiber2 = new FiberNode('Fiber 2');
    const fiber3 = new FiberNode('Fiber 3');

    fiber1.next = fiber2;
    fiber2.next = fiber3;

    firstFiber = fiber1;
    currentFiber = firstFiber;
}

// 模拟时间切片处理
function workLoop(deadline) {
    // 检查当前帧剩余时间是否足够执行任务
    while (currentFiber && deadline.timeRemaining() > 1) { 
        // 处理当前 Fiber 节点
        performUnitOfWork(currentFiber);
        // 移动到下一个 Fiber 节点
        currentFiber = currentFiber.next; 
    }

    // 如果还有未完成的任务，请求下一帧继续处理
    if (currentFiber) {
        requestIdleCallback(workLoop);
    }
}

// 处理单个 Fiber 节点的工作
function performUnitOfWork(fiber) {
    console.log(`Processing ${fiber.name}`);
    // 模拟一些工作
    for (let i = 0; i < 1000000; i++) {} 
}

// 开始创建 Fiber 节点
createFibers();
// 使用 requestIdleCallback 开始工作循环
requestIdleCallback(workLoop);
```

在这个示例里：

- `FiberNode` 类用来模拟 Fiber 节点。
- `createFibers` 函数创建了一些 Fiber 节点并构建成一个队列。
- `workLoop` 函数是核心的工作循环，它会检查当前帧剩余的时间，若时间足够就处理一个 Fiber 节点，若时间不足则暂停处理，请求下一帧继续。
- `performUnitOfWork` 函数模拟了处理单个 Fiber 节点的工作。

需要注意的是，`requestIdleCallback` 是一个浏览器 API，用于在浏览器空闲时执行回调函数，这里只是用于模拟 React Fiber 的时间切片机制，实际的 React Fiber 实现要复杂得多。

### **2. 如果5ms未完成会怎么样？**

在 React Fiber 的时间切片机制里，如果在分配的约 5ms 时间内任务未完成，会出现以下情况：

**暂停当前任务**

当达到分配的时间上限时，React 会暂停当前正在处理的 Fiber 节点的渲染任务。这是为了保证浏览器有足够的时间去处理其他关键任务，如响应用户输入、绘制页面等，从而避免页面出现卡顿，提升用户体验。

例如，在处理一个复杂的组件渲染时，如果在 5ms 内还没有完成对该组件的所有子节点的比较和更新操作，React 会暂时停止这个过程。

**保存任务状态**

在暂停任务之前，React 会保存当前任务的状态，包括已经处理到哪个 Fiber 节点、这个节点处理到了什么程度等信息。这些信息会被记录下来，以便后续继续执行任务时能够从暂停的地方接着进行。

可以把这个过程类比为我们阅读一本书，当时间到了需要暂停阅读时，我们会标记好当前读到的页码，下次再接着读的时候就可以从标记的地方继续。

**让出主线程**

暂停任务后，React 会将控制权交还给浏览器的主线程。这样浏览器就可以利用这段时间来完成其他工作，比如：

- **处理用户交互**：如果用户在页面上进行了点击、滚动等操作，浏览器可以及时响应用户的这些交互，让用户感受到流畅的操作体验。
- **页面渲染**：浏览器可以利用这段时间来绘制页面，更新页面的视觉效果，确保页面的正常显示。

**等待下一帧继续执行**

React 会在浏览器的下一帧开始时，继续执行之前暂停的任务。它会根据之前保存的任务状态，从上次暂停的 Fiber 节点开始，继续进行渲染工作。
