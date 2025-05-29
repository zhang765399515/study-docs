# Vue complier 的实现原理是什么样的?

在使用 `vue` 的时候，我们有两种方式来创建我们的 `HTML` 页面

- **第一种情况** 这是大多情况下，我们会使用模板 template 的方式，因为这更易读易懂也是官方推荐的方法
- **第二种情况** 使用 `render` 函数来生成 `HTML`，它比 `template` 更接近最终结果。

complier 的主要作用是解析模板，生成渲染模板的 render， 而 render 的作用主要是为了生成 `VNode`


## complier 主要分为 3 大块

### **1. 模板解析（Parsing）**

这一阶段会把模板字符串解析成抽象语法树（`AST`）。解析器会对模板字符串进行词法分析和语法分析。词法分析把模板字符串拆分成一个个的词法单元（`Token`），而语法分析则依据这些词法单元构建出 `AST`。

例如，对于以下模板：

```html
<div id="app">{{ message }}</div>
```

解析后得到的 AST 可能如下：

```javascript
{
  type: 'element',
  tag: 'div',
  attrs: [
    { name: 'id', value: 'app' }
  ],
  children: [
    {
      type: 'text',
      content: '{{ message }}'
    }
  ]
}
```

### **2. 优化（Optimization）**

遍历 `ast` 的每一个节点，标记静态节点，这样就知道哪部分不会变化，于是在页面需要更新时，通过 `diff` 减少去对比这部分 `DOM` ，提升性能

### **3. 代码生成（Code Generation）**

把前两步生成完善的 `ast`，组成 `render` 字符串，然后将 `render` 字符串通过 `new Function` 的方式转换成渲染函数

对于上面的 AST，生成的渲染函数代码可能如下：

```javascript
function render() {
  return _c('div', { attrs: { id: 'app' } }, [_v(_s(message))])
}
```

这里的 `_c`、`_v`、`_s` 都是 `Vue` 内部的辅助函数，分别用于创建元素节点、创建文本节点和对值进行字符串化处理。

## 总结

综上所述，**Vue Compiler** 的核心就是把模板字符串转换为渲染函数，通过解析、优化和代码生成这几个步骤来实现。这样做可以让 Vue 实例在运行时能够高效地渲染模板。
