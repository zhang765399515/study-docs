# css 颜色混合

本文主要记录一个通过根据背景自适应的 css。

## 效果

布局实现的动画效果。

![alt text](/img/gif/PixPin_2025-05-16_22-02-32.gif)

代码很简单，主要是通过 `mix-blend-mode: difference;`实现这个功能；

## 什么是 mix-blend-mode 呢？

**mix-blend-mode: difference;** 是 CSS 中的一个 **混合模式** 属性，它可以让元素与底层内容以 `"差值"` 方式混合显示。这种混合会对比两个颜色的 `RGB` 值，用较亮颜色的 RGB 值减去较暗颜色的 `RGB` 值，得到的结果就是混合后的颜色。当两个颜色完全 **相同** 时，会产生黑色；当两个颜色 **互补** 时，会产生白色。

## 案例代码

```vue
<template>
    <div class="aaa">
        <div class="font">Docs 自律</div>
        <div class="bbb"></div>
        <div class="ccc"></div>
    </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style lang="scss" scoped>
.aaa {
    position: relative;
    width: 1000px;
    height: 510px;
    padding: 20px;
    font-size: 50px;
    background: gray;
    .font {
        position: absolute;
        width: 100%;
        text-align: center;
        top: 50%;
        left: -20%;
        z-index: 10;
        color: #fff;
        mix-blend-mode: difference;
        transition: all 0.5s;
        &:hover {
            left: 20%;
        }
    }
    .bbb {
        width: 455px;
        height: 500px;
        position: absolute;
        left: 65px;
        background: #000;
    }
    .ccc {
        width: 455px;
        height: 500px;
        position: absolute;
        right: 65px;
        background: #fff;
    }
}
</style>
```
