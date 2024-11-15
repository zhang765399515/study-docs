# 数字类型度限制
### 问题来源

  Today，和一个离职的前同事聊天，主要是想从他哪儿了解下外面的行业发展状态和薪资水平，聊着聊着就聊到了最近遇见的面试题，这是其中一个属于我知识盲区的问题

## 面试官问题

  （因为数字类型浏览器有长度限制，所以利用string类型做超长字符计算），计算：

```js
function x(a,b){
    //计算string类型a+string类型b的合
}
```

老规矩，先处理：
::: info 问题需求
  1.处理两个可能非常长的数字，它们作为字符串输入。
  
  2.相加这两个数字，并转换会`string`
:::
然后，遇到这个问题，我首先是一懵，数字类型限制？和excel那样？超出长度会自动变成e点什么吗？

立马放下手机，打开电脑，百度，google，ChatGpt 走一套再说


::: tip 先说问题产生的原因
   在浏览器中，数字类型（Number）的长度限制实际上是由 JavaScript 的 Number 类型决定的，而 Number 类型是基于 IEEE 754 `双精度浮点数标准`。其最大安全整数值为 `2^53 - 1（即 9,007,199,254,740,991）`，任何超出这个范围的整数都可能无法精确表示。
:::
如：

```js
// 超过 Number 类型最大精度的数字
let largeNumber = 9007199254740992; // 2^53
console.log(largeNumber); // 9007199254740992
console.log(largeNumber + 1);//应该为  9007199254740993  ，实际为 9007199254740992
```

### 那么前同事是怎么回答的呢？

```js
function func(a, b) {
    const c = Math.max(a.length, b.length);
    let temp = 0;
    let result = "";
    let i = 0;
    while (i < c) {
        const x = a[a.length - 1 - i] || 0;
        const y = b[b.length - 1 - i] || 0;
        const sum = x * 1 + y * 1 + temp;
        temp = Math.floor(sum / 10);
        result = (sum % 10) + result;
        i++;
    }

    return result;
}
func("123456", "936");

```

我们来逐步解析下这个函数

1. 初始化变量

``` js
const c = Math.max(a.length, b.length);
let temp = 0;
let result = "";
let i = 0;
```

- `c = Math.max(a.length, b.length)`：这个计算了两个字符串 `a` 和 `b` 的长度中的最大值。这样做的目的是确保在后续的循环中，两个字符串的长度不影响加法的进行。如果一个字符串比另一个长，短的字符串会自动补上零。
- `temp = 0`：初始化一个变量 temp，用于存储进位。
- `result = ""`：初始化一个空字符串，用来存储最终的结果。
- `i = 0`：初始化一个计数器，用来控制循环的次数。

2. 开始循环

```js
    while (i < c) {
        const x = a[a.length - 1 - i] || 0;
        const y = b[b.length - 1 - i] || 0;
        const sum = x * 1 + y * 1 + temp;
        temp = Math.floor(sum / 10);
        result = (sum % 10) + result;
        i++;
    }
```

这里是加法的核心部分，它模拟了逐位相加的过程。具体做了以下几步：

- `const x = a[a.length - 1 - i] || 0;`

  - `a[a.length - 1 - i]`：从字符串 `a` 的末尾（即右边）取第 `i` 位字符。如果 `i` 超出了 `a` 的长度，则取 `0`。
  - `|| 0` 是为了防止索引越界，如果 `a` 的长度比 `b` 小，那么它会自动取 `0` 来补齐。

- `const y = b[b.length - 1 - i] || 0;`
  - 同样地，从字符串 `b` 的末尾取第 `i` 位字符，超出部分取 `0`。

- `const sum = x *1 + y* 1 + temp;`
  - `x *1` 和 `y* 1` 将字符串中的数字字符转换为数字类型（如果是数字字符，`*1` 会将它转换为相应的数字）。例如，  - `'9'* 1` 就是 `9`。
  - temp 是进位的值，它从上一位相加的结果中得到。
  - 然后把 `x`、`y` 和 `temp` 相加，得到当前位的和。

- `temp = Math.floor(sum / 10);`
  - 计算当前位的进位。`sum / 10` 得到的是浮动值，通过 `Math.floor()` 将其取整。例如，如果 `sum = 18`，那么 `Math.floor(18 / 10)` 就是 `1`，即进位。

- `result = (sum % 10) + result;`
  - 计算当前位的结果，并把它添加到结果的最前面。`sum % 10` 就是取当前位的余数，表示该位的数字。例如，`sum = 18`，那么 `sum % 10 = 8`，所以把 `8` 加到 `result` 的前面。
- `i++`：增加 `i`，进入下一个数字位。

3. 返回结果

```js
return result;
```

### 总结


::: tip 核心思路为：
    1.将两个字符串数字从低位（即右侧）开始逐位相加，模拟竖式加法。

    2.考虑进位：每一位相加后，如果和大于或等于 10，就产生进位。

    3.如果某个字符串的长度较短，则自动用 0 补齐，直到两个字符串都加完。

    4.最终返回一个字符串，表示两个数字相加的结果。
:::
  就我目前的知识来说回答的非常棒，其重点就是让个位分别相加，然后核心就是`Math.floor`的使用，让其`大于10`的进入下一次循环的`加法`中。


## 补充一个后续了解到的知识点

### 使用 BigInt 类型（适合现代 JavaScript 环境）

javaScript 的 `BigInt` 类型允许处理任意长度的整数，可以直接将字符串转换为 `BigInt` 再进行加法
```js
function addLargeNumbers(a, b) {
    const result = BigInt(a) + BigInt(b);
    return result.toString(); // 转回字符串
}

// 示例
console.log(addLargeNumbers("12345678901234567890", "98765432109876543210"));
// 输出: "111111111011111111100"
```
::: danger 缺点：
- 兼容性问题。BigInt 是现代 JavaScript 引入的特性，旧版浏览器可能不支持。
:::









