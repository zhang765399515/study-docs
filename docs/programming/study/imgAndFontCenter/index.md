---
作者: "Junlin Zhang"
date: 2023-10-10
---

### .className[******]

直接贴代码

```html
<div style="padding: 20px;">
        <p class="content">使用 line-height 实现文字和图标垂直居中对齐<i class="myIcon icon-arrow"></i></p>
    </div>
```

```css
.content {
        line-height: 20px;
    }
 
    .myIcon {
        width: 20px;
        height: 20px;
        display: inline-block;
    }
 
    .myIcon:before {
        /*\3000 为空格字符，  */
        content: '\3000';
    }
 
    .icon-arrow {
        background: url('url') no-repeat center;
    }
```
