# <font color=#9898E5> 高级前端开发 25 个 JavaScript 单行代码 </font>
::: tip
    本文记录一些常用的单行高级JS使用方法;
:::

## <font color=#9898E5> 1. 不使用临时变量来交换变量的值 </font>

例如我们想要将 a 于 b 的值交换

```js
let a = 1, b = 2;

// 交换值
[a, b] = [b, a];

// 结果: a = 2, b = 1
```

这行代码使用数组解构赋值的方式来交换两个变量的值，无需定义新的临时变量。这个巧妙的技巧可让代码看起来更简洁明了。语法[a, b] = [b, a]通过解构右侧的数组并将其分配给左侧来实现交换它们的值。

## <font color=#9898E5>2. 对象解构，让数据访问更便捷 </font>

```js
const { name, age } = { name: '张三', age: 23 };

// 结果: name = '张三', age = 23
```

这里使用对象解构赋值的方式将对象中的属性直接提取到新的变量中。这种方法简化了访问对象属性的过程，并增强了代码的可读性。

## <font color=#9898E5> 3. 浅克隆对象 </font>

```js
const originalObj = { name: '张三', age: 24 };

const clonedObj = { ...originalObj };

// 结果: clonedObj = { name: '张三', age: 24 }
// 此时改变 clonedObj 的属性，将不会影响到原始对象 originalObj
```

通过使用扩展运算符 (...) 创建originalObj的浅克隆对象。此技术将所有可枚举的自身属性从原始对象复制到新对象。

## <font color=#9898E5> 4. 合并对象 </font>

```js
const obj1 = { name: '张三' };
const obj2 = { age: 22 };

const mergedObj = { ...obj1, ...obj2 };

// 结果: mergedObj = { name: '张三', age: 22 }
```

与克隆类似，通过扩展运算符将obj1和合并obj2为一个新的对象。如果有重叠的属性，则最后一个对象的属性将覆盖前一个对象的属性。

## <font color=#9898E5> 5. 清理数组 </font>

```js
const arr = [ 0, 1, false, 2, '', 3 ];

const cleanedArray = arr.filter(Boolean);

// 结果: cleanedArray = [1, 2, 3]
```

通过Array.prototype.filter()函数并使用Boolean函数作为回调。它将会从数组中删除所有假值（ 0，false，null，undefined，''，NaN）。

## <font color=#9898E5> 6. 将 NodeList 转换为数组 </font>

```js
const nodesArray = [ ...document.querySelectorAll('div') ];
```

通过扩展运算符将NodeList( document.querySelectorAll函数的返回值) 转换为 JavaScript 数组，从而能够使用数组的map方法filter去操作查找到的元素。

## <font color=#9898E5> 7. 检查数组是否满足指定条件 </font>

例如我们要判断一个数组中是否存在负数

```js
const arr = [ 1, 2, 3, -5, 4 ];

// 数组中是否有负数
const hasNegativeNumbers = arr.some(num => num < 0);

// 结果: hasNegativeNumbers = true
```

Array.prototype.some()函数用于检查数组中是否至少有一个元素，通过所提供的回调函数实现的测试（此处判断是否是负数，返回true表示通过）

另外，还可以使用Array.prototype.every()来检查数组的所有元素是否全部通过测试（此处判断是否是正数）

```js
const arr = [ 1, 2, 3, -5, 4 ];

// 数组元素是否全部为正
const allPositive = arr.every(num => num > 0);

// 结果: allPositive = false
```

## <font color=#9898E5> 8. 将文本复制到剪贴板 </font>

```js
navigator.clipboard.writeText('Text to copy');
```

通过使用 Clipboard API 以编程方式将文本复制到剪贴板。这是一种最新的复制方法，可让文本复制变得无缝且高效（但目前各大浏览器支持度还不是很高，需要考虑兼容性问题）。

## <font color=#9898E5> 9. 删除数组重复项 </font>

```js
const arr = [1, 2, 2, 3, 4, 4, 5];

const unique = [...new Set(arr)];

// 结果: unique = [1, 2, 3, 4, 5]
```

这里利用了Set对象存储的值会保持唯一，以及扩展运算符能将Set转换回数组的特性。这是一种优雅的删除数组中重复项的方式。

```js
## <font color=#9898E5> 10. 取两个数组的交集 </font>
const arr1 = [1, 2, 3, 4];
const arr2 = [2, 4, 6, 8];

// 取两个数组中公共的元素
const intersection = arr1.filter(value => arr2.includes(value));

// 结果: intersection = [2, 4]
```

此示例通过使用Array.prototype.filter()函数去查找arr1与arr2中的公共元素。传入的回调函数会检查arr2是否包含arr1的每一个元素，从而得到两个数组的交集。

```js
## <font color=#9898E5> 11. 求数组元素的总和 </font>
const arr = [1, 2, 3, 4];

// 求总和
const sum = arr.reduce((total, value) => total + value, 0);

// 结果: sum = 10
```

此示例使用Array.prototype.reduce()方法将数组中所有的值全部累加起来。reduce方法接收一个回调函数和一个初始值（即前一个回调函数累加值的初始值），这个回调函数有两个参数：累加值total和当前值value。它将会遍历数组所有元素，将每个元素添加到总和中（总和初始为0）。

## <font color=#9898E5> 12. 根据指定条件判断，是否给对象的属性赋值 </font>

```js
const condition = true;
const value = '你好，世界';

// 如果条件为真，则将 value 变量的值赋给 newObject.key 属性
const newObject = {...(condition && {key: value})};

// 结果: newObject = { key: '你好，世界' }
```

此案例使用扩展运算符 (...) 与短路求值(&&)，将属性有条件地添加到对象中。 如果condition为真，则会将{key: value}扩展到对象中；否则不进行任何操作。

## <font color=#9898E5> 13. 使用变量作为对象的键 </font>

```js
const dynamicKey = 'name';
const value = '张三';

// 使用一个动态的变量作为 key
const obj = {[dynamicKey]: value};

// 结果: obj = { name: '张三' }
```

这种语法称为计算属性名，它允许使用变量作为对象的键。方括号内的dynamicKey表达式会计算其值，以将其用作属性名称。

## <font color=#9898E5> 14. 离线状态检查器 </font>

```js
const isOnline = navigator.onLine ? '在线' : '离线';

// 结果: isOnline = '在线' 或 '离线'
```

这段代码使用三元运算符检查浏览器的在线状态(navigator.onLine)，如果为真则返回'在线'，否则返回'离线'。这是一种动态检查用户网络连接状态的方法。

## <font color=#9898E5> 15. 离开页面弹出确认对话框 </font>

```js
window.onbeforeunload = () => '你确定要离开吗？';
```

这行代码与window的onbeforeunload事件挂钩，当用户离开页面时会弹出一个确认对话框，一般用于防止用户因未保存更改就关闭页面而导致数据丢失。

## <font color=#9898E5> 16. 对象数组，根据对象的某个key求对应值的总和 </font>

```js
const arrayOfObjects = [{x: 1}, {x: 2}, {x: 3}];

// 指定要求和的 key值
const sumBy = (arr, key) => arr.reduce((acc, obj) => acc + obj[key], 0);

// 传入 'x'，求元素对象 key 为 'x' 的值的总和
sumBy(arrayOfObjects, 'x'));

// 结果: 6
```

sumBy函数使用Array.prototype.reduce()对数组中元素特定键的值求和。这是一种根据给定键计算对象数组总和的灵活方法。

## <font color=#9898E5> 17. 将 url 问号后面的查询字符串转为对象 </font>

```js
const query = 'name=John&age=30';

// 将字符串解析为对象
const parseQuery = query => Object.fromEntries(new URLSearchParams(query));

// 结果: parseQuery = { name: 'John', age: '30' }
```

此示例将一个查询字符串转换为了一个对象。其中URLSearchParams会进行字符串解析，它将返回一个可迭代对象，然后在通过Object.fromEntries将它转换为对象，从而使 URL 参数检索变得方便多了。

## <font color=#9898E5> 18. 将秒数转换为时间格式的字符串 </font>

```js
const seconds = 3661; // 一小时是 3600 秒，多出 61 秒

const toTimeString = seconds => new Date(seconds * 1000).toISOString().substr(11, 8);

toTimeString(seconds));

// 结果: '01:01:01'
```

此示例将秒数转换为 HH:MM:SS 格式的字符串。它通过给定的秒数加上时间戳起始点来创建一个新的 Date 对象，然后将其转换为 ISO 字符串，并提取时间部分得到结果。

## <font color=#9898E5> 19. 求某对象所有属性值的最大值 </font>

```js
// 数学、语文、英语成绩
const scores = { math: 95, chinese: 99, english: 88 };

const maxObjectValue = obj => Math.max(...Object.values(obj));

// 最高分
maxObjectValue(scores));

// 结果: 99
```

此示例用于在对象所有的属性值中找到最大值。其中Object.values(obj)将对象所有的属性值提取为数组，然后使用展开运算符将数组的所有元素作为Math.max函数的参数进行最大值查找。

## <font color=#9898E5> 20. 判断对象的值中是否包含有某个值 </font>

```js
const person = { name: '张三', age: 30 };

const hasValue = (obj, value) => Object.values(obj).includes(value);

hasValue(person, 30);

// 结果: true
```

hasValue函数会检查对象的值中是否存在指定的值。其中Object.values(obj)用于获取对象中所有的值的数组，然后通过includes(value)检查指定值是否在该数组中。

## <font color=#9898E5> 21. 安全访问深度嵌套的对象属性 </font>

```js
const user = { profile: { name: '张三' } };

const userName = user.profile?.name ?? '匿名';

// 结果: userName = '张三'
```

此代码首先演示了如何使用可选链运算符 (?.) 安全地访问user.profile的name值。如果user.profile是undefined或null，它会短路并返回undefined，从而避免潜在的类型错误TypeError。

然后，使用空值合并运算符 (??) 检查左侧是否为null或undefined，如果是，则使用默认值'匿名'。这可确保后备值不会是其他假值（如''或0）。这对于访问数据结构中可能不存在某些中间属性的深层嵌套属性非常有用。

在 JavaScript 中，空值合并运算符 (??) 和逻辑或 (||) 都可以用于提供默认值，但它们处理假值的方式有所不同。

在上面的例子中，如果把??改为||，行为会稍微有些不同。||的左侧如果为假值，它将会返回右侧的值。JavaScript 中的假值包括null、undefined、0、NaN、''（空字符串）和false。这意味着||左边的值不仅仅是null或undefined，如果还是其他假值，那么都将返回右侧的值。

## <font color=#9898E5> 22. 条件执行语句 </font>

```js
const isEligible = true;

isEligible && performAction();

// 如果 isEligible 为真，则调用 performAction()
```

利用逻辑 AND ( &&) 运算符，函数performAction()仅会在isEligible结果为true时执行。这是一种无需if语句即可有条件地执行函数的简介语法。这对于根据某些条件执行函数非常有用，尤其是在事件处理或回调中。

如果想要条件赋值，则可以这样写

```js
const isEligible = true;
let value = '';

// 需要将赋值语句用用括号括起来
isEligible && (value = '条件达成');

// 如果 isEligible 为真，则执行 (value = '条件达成') 语句
```

## <font color=#9898E5> 23. 创建包含值为指定数字范围的数组 </font>

例如创建数字5以内所有正数的数组

```js
const range = Array.from({ length: 5 }, (_, i) => i + 1);

// 结果: range = [1, 2, 3, 4, 5]
```

Array.from()从类数组或可迭代对象创建一个新数组。这里，它接受一个具有属性length和映射函数的对象。映射函数 ( (_, i) => i + 1) 使用索引 ( i) 生成从 1 到 5 的数字。下划线 (_) 是一种惯例，表示未使用该参数。

## <font color=#9898E5> 24. 提取文件扩展名 </font>

```js
const fileName = 'example.png';

const getFileExtension = str => str.slice(((str.lastIndexOf(".") - 1) >>> 0) + 2);

// 结果: getFileExtension = 'png'
```

这个案例实现了从字符串中提取文件扩展名。它先找到最后一次出现点号 (.) 位置，然后截取从该位置到末尾的字符串。位运算符 (>>>) 确保了即使未找到点号 (.) ，操作也是安全的，因为在这种情况下仍然会返回一个空字符串。

## <font color=#9898E5> 25. 切换元素的 class </font>

```js
const element = document.querySelector('.my-element');

const toggleClass = (el, className) => el.classList.toggle(className);

toggleClass(element, 'active');
```

toggleClass函数使用classList.toggle()方法从一个元素的 class 列表中添加或移除某个 class。如果该 class 存在，则删除，否则添加。这是一种根据用户交互或应用程序状态动态更新 class 的方法。非常适合实现响应式设计元素，例如菜单根据用户操作显示或隐藏。

以上 25 个 JavaScript 单行代码，以简短高效的方式提供强大的功能。希望您今天能有所收获！
