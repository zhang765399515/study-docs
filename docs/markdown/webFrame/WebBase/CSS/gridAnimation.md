
本文主要记录一个通过grid布局实现的动画效果。

## 效果

布局实现的动画效果。

![alt text](/img/gif/PixPin_2025-05-14_22-02-32.gif)
<!-- ![alt text](/img/JS/factoryPatternUML.png) -->

## 代码

重点是style scss代码，最后有完整代码
```vue{36-50}
<style lang="scss" scoped>
.hello-world {
  .container {
    width: 400px;
    height: 400px;
    margin: 0 auto;
    margin-top: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 10px;
    transition: all 0.5s ease;
  }
  @for $i from 1 through 9 {
    .item:nth-child(#{$i}) {
      background: hsl($i * 40%, 100, 40%);
    }

    .container:has(.item:nth-child(#{$i}):hover) {
      $r: floor(($i - 1) / 3) + 1;
      $c: ($i - 1) % 3 + 1;
      $arr: 1fr 1fr 1fr;
      $rows: set-nth($arr, $r, 2fr);
      $cols: set-nth($arr, $c, 2fr);
      
      grid-template-columns: $cols;
      grid-template-rows: $rows;
    }
  }
}
</style>
```
### 解释相关代码

这段 SCSS 代码使用了 @for 循环来动态生成样式规则，实现了一个九宫格布局的交互效果。当用户悬停在任意一个格子上时，该格子所在的行和列会同时放大，形成一种动态聚焦的效果。下面我来详细解释其工作原理：
**颜色循环部分**
```scss
@for $i from 1 through 9 {
  .item:nth-child(#{$i}) {
    background: hsl($i * 40%, 100, 40%);
  }
  // ...
}
```
- **功能**：为 9 个格子分别设置不同的背景色

- **实现**：
    - `@for $i from 1 through 9`：循环变量 $i 从 1 到 9
    - `.item:nth-child(#{$i})`：选择第 i 个 `.item `元素
    - `hsl($i * 40%, 100, 40%)`：使用 HSL 颜色模式，色相值随循环递增（每次增加 40），饱和度 100%，亮度 40%

**动态网格调整部分**
```scss
.container:has(.item:nth-child(#{$i}):hover) {
  $r: floor(($i - 1) / 3) + 1;
  $c: ($i - 1) % 3 + 1;
  $arr: 1fr 1fr 1fr;
  $rows: set-nth($arr, $r, 2fr);
  $cols: set-nth($arr, $c, 2fr);
  grid-template-columns: $cols;
  grid-template-rows: $rows;
}
```
**功能**：当某个格子被悬停时，调整整个网格布局，使该格子所在行和列同时放大

**实现**：

- 1. **行号和列号计算**：

    - `$r: floor(($i - 1) / 3) + 1`：计算当前格子所在的行号（1-3）
    - `$c: ($i - 1) % 3 + 1`：计算当前格子所在的列号（1-3）

- 2. **动态修改网格模板**：

    - `$arr: 1fr 1fr 1fr`：定义初始的网格模板（3 行 3 列）
    - `$rows: set-nth($arr, $r, 2fr)`：将第 $r 行的大小从 1fr 改为 2fr
    - `$cols: set-nth($arr, $c, 2fr)`：将第 $c 列的大小从 1fr 改为 2fr
    - `grid-template-columns`: $cols 和 grid-template-rows: $rows：应用修改后的行列模板

**核心技术点**

1. **:has()** 伪类：这是一个相对较新的 CSS 选择器，允许根据元素的后代来选择元素。在这里，`.container:has(.item:hover)` 表示当容器内的某个格子被悬停时，选择该容器
2. **SCSS 变量插值**：`#{$i}` 语法将 SCSS 变量插入到 CSS 选择器中
3. **网格布局**：使用 `grid-template-columns` 和 `grid-template-rows` 动态调整网格尺寸
4. **数学运算**：使用 `floor()、%（取模）`等函数计算行列位置