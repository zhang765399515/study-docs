---
作者: "Junlin Zhang"
date: 2023-09-12
---

# drag 可拖拽框

因为公司业务需求，需要一个包含以下功能的拖拽式组件

- 可拖拽
- 边缘不能超出浏览器
- 包含关闭、往下收缩
- 适配各种分辨率
- title 可更换
- 高度宽度自定义
- 关闭时内容可销毁，带有回调

本来这个组件之间写过一个，但是由于新增了部分功能，现在改起来逻辑太乱，想了想还不如自己写一个。

OK，让我们开始...

#### 先贴入已完成部分

```js
<template>
  <div class="dragComponent" v-dragModule :style="dragMainStyle">
    <drag-header :dragData="dragData" @handle-shrink="dialogShrink"></drag-header>
    <div class="dragBody">
      <span v-if="dragData.isShrink">内容</span>
    </div>
  </div>
</template>

<script>

import dragHeader from "./dragModule/dragHeader.vue";

export default {
  props:{
    dragData:{
      type: Object,
      default: ()=>{
        return {
        }
      }
    }
  },
  components: {
    dragHeader
  },
  computed:{
    dragMainStyle:{
      get(){
        let data = this.dragData;
        return data
      }
    }
  },
  methods:{
    dialogShrink(){
      this.dragData.isShrink  = !this.dragData.isShrink;
      this.dragData.shrink  = !this.dragData.shrink;
    }
  },
  watch: {
  },
}
```

大致内容为引入了一个头部文件，并传入了一个 dialogShrink（用于收缩按钮点击）回调

当然这不是主要的拖动效果，下面这个 drag.js 文件才是

```js
import Vue from "vue";

Vue.directive("dragModule", {
  bind($el) {
    //clientX 按下位置距离'浏览器可视区域'位置
    //offsetLeft 按下位置距离'内容边缘'位置
    let LastTimeClientX = 0;
    let LastTimeClientY = 0;
    $el.onmousedown = (e) => {
      //鼠标按下
      if (e.toElement._prevClass != "allow-drag") {
        return;
      }
      LastTimeClientX = e.clientX; //记录当前位置
      LastTimeClientY = e.clientY; //记录当前位置
      $el.style.left = e.clientX - e.offsetX + "px"; //重新初始化left值，否者style.left为空
      $el.style.top = e.clientY - e.offsetY + "px"; //重新初始化left值，否者style.top为空
      document.onmousemove = onmousemove;
      document.onmouseup = onmouseup;
    };
  },
});
```

:::

其原理就是使用自定义指令新增一个 dragModule 指令，为添加了该指令的标签并且包含了'allow-drag'

```js
if (e.toElement._prevClass != "allow-drag") {
  return;
}
```

的元素添加鼠标按下事件，就是整个框以及子元素 title 这一块添加鼠标按下事件，在这个时候记录整个 drag 框距离左侧\顶部的距离，并将其赋值进 style.left\top，并新增鼠标移动和抬起事件

#### 而在鼠标移动事件中

```js
let onmousemove = (move) => {
  // < left 内容>
  let afterLeft = move.clientX - LastTimeClientX; //计算移动前后的差异
  let left = $el.style.left.replace(/\px/g, "") * 1 + afterLeft; //计算DOM加上 差异 后位置
  let MaxLeft = window.innerWidth - $el.offsetWidth; // 为了避免超出边框，计算最大Left
  $el.style.left = (left > -1 ? (left < MaxLeft ? left : MaxLeft) : 1) + "px"; //避免超出
  LastTimeClientX = move.clientX; //重新记录本次位置
  // < top 内容>
  let afterTop = move.clientY - LastTimeClientY; //计算移动前后的差异
  let top = $el.style.top.replace(/\px/g, "") * 1 + afterTop;
  let MaxTop = window.innerHeight - $el.offsetHeight;
  $el.style.top = (top > -1 ? (top < MaxTop ? top : MaxTop) : 1) + "px"; //避免超出
  LastTimeClientY = move.clientY; //重新记录本次位置
};
```

先去计算移动前后的差异，然后使用鼠标按下时就赋值的 left 值加上移动的差异，并计算框和浏览器的大小获取是否超出了浏览器边框。然后重新将 left\top 赋值

#### 鼠标抬起就移除相关事件

```js
let onmouseup = (e) => {
  document.onmousemove = null;
  document.onmouseup = null;
};
```

#### 接下就是添加收缩功能

在顶组件中新增一个方法，将其传入 dragHeader 头部组件中，在执行点击时候后，将其中的 isShrink 更改为相反的值，此时，将自动调用计算属性中的 get 方法

```js
dialogShrink(){
    this.dragData.isShrink  = !this.dragData.isShrink;
    this.dragData.shrink  = !this.dragData.shrink;
}
```

在计算属性 get 中

```js
get() {
    let $el = this.$refs.drag;
    //动态新增和移除isShrinkIng名，主要是对动画的时间进行控制
    if ($el) {
        $el.classList.add('isShrinkIng')
        setTimeout(() => {
        $el.classList.remove('isShrinkIng')
        }, 300);
    }
    let data = this.dragData.style;
    if ("shrink" in this.dragData) {
        //提前备份height
        data['backupsHeight'] || (data['backupsHeight'] = data.height);
        if (this.dragData['isShrink']) {
            //将高度设为只有头部高度
            data['height'] = '40px';
            if ($el) {
                //让top值改为top加上 组件高度 减去 头部高度
                data['top'] = $el.style.top.replace(/\px/g, "") * 1 + data['backupsHeight'].replace(/\px/g, "") * 1 - 40 + 'px';

            }
        } else {
            if ($el) {
                //让top值改为top减去 组件高度 加上 头部高度，恢复原始状态
                data['top'] = $el.style.top.replace(/\px/g, "") * 1 - data['backupsHeight'].replace(/\px/g, "") * 1 + 40;
                // 恢复高度
                data['height'] = data['backupsHeight'];
            }
        }
    }
    return data
}
```

此时出现了一个 BUG，如果先将内容收缩，然后将组件提到页面上面的位置，再取消收缩，会发现窗口超出了顶部，想了想，是因为恢复窗口的时候，top 为负值了，简单，在恢复高度后判断 top 值就行了

```js
// 恢复高度
data["height"] = data["backupsHeight"];
// ++
data.top < 0 ? (data.top = 0) : (data.top = data.top + "px");
```
