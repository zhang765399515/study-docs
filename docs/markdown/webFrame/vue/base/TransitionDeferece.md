# Transition在vue2和vue3的差异

## 1. 类名差异

Vue 2 的类名规则

```css
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
```

类名：

+ v-enter / v-leave-to：进入/离开开始的状态。
+ v-enter-active / v-leave-active：进入/离开时的过渡状态。
+ v-enter-to / v-leave：进入完成 / 离开时结束状态。

Vue 3 的类名规则

```css
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
```

类名：

+ v-enter-from / v-leave-to：进入/离开的初始状态。
+ v-enter-active / v-leave-active：过渡进行中。
+ v-enter-to / v-leave-from：进入/离开结束时状态。

差异点：

Vue 3 使用了 -from 和 -to，让类名更具描述性和可读性。

这改进了对动画过程的理解，使动画更符合直观逻辑：

enter-from 表示动画从哪里开始，enter-to 表示动画结束的状态。

## 2. 性能优化

Vue 3 更高效的 DOM 操作，减少了 DOM 更新次数，过渡动画更流畅。

移除了 JavaScript 过渡钩子限制：在 Vue 2 中，Transition 组件的 JavaScript 钩子会导致额外的 DOM `强制重排（Reflow）`。Vue 3 优化了这一点，使动画更加高效。

## 3. 过渡多个元素

Vue 2 限制：在 Vue 2 中，`<transition>`只能包裹一个根元素。

Vue 3 支持多个子元素过渡，通过 TransitionGroup，可以让`多个`元素同时进行过渡。

## 4. 支持异步过渡和 Promise

Vue 3 支持在 enter 和 leave 钩子中返回一个 Promise，以便实现异步动画：

```vue
<transition @enter="onEnter">
  <div v-if="show">Hello</div>
</transition>

<script setup>
async function onEnter(el) {
  el.style.opacity = 0;
  await new Promise(resolve => setTimeout(resolve, 1000));
  el.style.opacity = 1;
}
</script>
```

Vue 2 不支持异步动画，需要手动调用 done 回调。

## 5. appear 属性改进

Vue 3 的 appear 默认更友好，首次渲染时可以直接触发动画，而 Vue 2 需要额外定义类或手动设置。

```vue
<transition appear>
  <div v-if="show">Hello</div>
</transition>
```

## 6. Transition 的 JS 钩子差异

Vue 3 直接在 setup 函数中定义钩子，并且支持使用 onBeforeEnter、onAfterLeave 等组合式 API。

```vue
<transition @before-enter="beforeEnter">
  <div v-if="show">Hello</div>
</transition>

<script setup>
function beforeEnter(el) {
  console.log('Animation start', el);
}
</script>
```

Vue 2 需要在 methods 中定义钩子，结构相对分散。

## 7. TransitionGroup 的差异

Vue 3 中的 TransitionGroup 支持多个根元素，并允许通过 tag 属性指定渲染的包裹标签。

类名规则同样采用了 -from 和 -to 的形式，使动画更直观。

```vue
<transition-group name="list" tag="ul">
  <li v-for="item in items" :key="item">{{ item }}</li>
</transition-group>
```

## 8. 支持的钩子扩展

Vue 3 新增更多钩子，例如：

+ onEnterCancelled：动画进入被取消时触发。

+ onLeaveCancelled：动画离开被取消时触发。

这些钩子在复杂动画交互中更加实用，而 Vue 2 只提供了基本的 enter 和 leave 钩子。

## 9. 自定义过渡名的简化

在 Vue 3 中，可以更直观地动态绑定过渡类名：

```vue
<transition :name="transitionName">
  <div v-if="show">Hello</div>
</transition>
```

## 总结差异对比

| 特性                       | Vue 2                          | Vue 3                                    |
| -------------------------- | ------------------------------ | --------------------------------------- |
| 类名规则                   | v-enter / v-leave              | v-enter-from / v-leave-to                |
| 多根元素支持               | 不支持                         | 支持                                     |
| DOM 性能优化               | 较慢，存在 Reflow              | 更高效，减少不必要的重排                  |
| 异步动画支持               | 不支持，需手动调用 done        | 支持 Promise 异步动画                    |
| appear 属性                | 需要额外配置                   | 默认支持                                 |
| 钩子定义方式               | 在 methods 中定义              | 直接在 setup 中或组合式 API 注册         |
| TransitionGroup 多子元素   | 仅支持单个根元素               | 支持多个根元素                           |
| 动画取消钩子               | 不支持                         | 支持 onEnterCancelled / onLeaveCancelled |

Vue 3 的 Transition 更灵活且性能更优，类名规则更加清晰，钩子和动画过程也更可控。
