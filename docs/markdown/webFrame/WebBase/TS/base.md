# 前言

我们在讨论TS的时候，我注意到一些同事对使用TypeScript表示出了抵触情绪，提到：“TypeScript太麻烦了，我们不想用！”起初，我对此感到困惑：`TypeScript`真的有那么麻烦吗？整理了下同事和群里一些朋友的言语之后，我终于发现了问题所在。

在这篇文章中，我想和大家分享我的一些发现和解决方案。

## 一、类型复用不足

项目中存在大量自定义重复的类型，显著降低了代码的复用性，大量的可复用代码形成了项目的屎山。

我了解到许多人并不清楚如何在`TypeScript中`复用类型。`TypeScript`允许我们使用`type`和`interface`来定义类型。
当我询问他们`type`与`interface`之间的区别时，大多数人都表示不清楚，这也就难怪他们不知道如何有效地复用类型了。
type定义的类型可以通过交叉类型（&）来进行复用，而`interface`定义的类型则可以通过继承`（extends）`来实现复用。值得注意的是，`type`和`interface`定义的类型也可以互相复用。下面是一些简单的示例：

#### 复用type定义的类型：

```ts
interface Point {
  x: number;
  y: number;
};

interface Coordinate extends Point {// [!code focus]
  z: number;
}
```

#### interface复用type定义的类型：

```ts
type Point = {
  x: number;
  y: number;
};

interface Coordinate extends Point {// [!code focus]
  z: number;
}
```

## 二、复用时只会新增属性的定义

我还注意到，在类型复用时，他们往往只是简单地为已有类型新增属性，而忽略了更高效的复用方式。
例如，有一个已有的类型`Props`需要复用，但不需要其中的属性`c`。在这种情况下，会重新定义`Props1`，仅包含Props中的属性`a`和`b`，同时添加新属性`e`。

```ts
interface Props {
  a: string;
  b: string;
  c: string;// [!code focus]
}

interface Props1 {
  a: string;
  b: string;
  e: string;// [!code focus]
}
```

实际上，我们可以利用`TypeScript`提供的工具类型`Omit`来更高效地实现这种复用。

```ts
interface Props {
  a: string;
  b: string;
  c: string;
}

interface Props1 extends Omit<Props, 'c'> {// [!code focus]
  e: string;
}
```

类似地，工具类型`Pick`也可以用于实现此类复用。

```ts
interface Props {
  a: string;
  b: string;
  c: string;
}

interface Props1 extends Pick<Props, 'a' | 'b'> {// [!code focus]
  e: string;
}
```

Omit和Pick分别用于排除和选择类型中的属性，具体使用哪一个取决于具体需求。

## 三、未统一使用组件库的基础类型

在开发组件库时，我们经常面临相似功能组件属性命名不一致的问题，例如，用于表示组件是否显示的属性，可能会被命名为`show、open`或`visible`。这不仅影响了组件库的易用性，也降低了其可维护性。
为了解决这一问题，定义一套统一的基础类型至关重要。这套基础类型为组件库的开发提供了坚实的基础，确保了所有组件在命名上的一致性。
以表单控件为例，我们可以定义如下基础类型：

```ts
import { CSSProperties } from 'react';

type Size = 'small' | 'middle' | 'large';

type BaseProps<T> = {
  /**
   * 自定义样式类名
   */
  className?: string;
  /**
   * 自定义样式对象
   */
  style?: CSSProperties;
  /**
   * 控制组件是否显示
   */
  visible?: boolean;
  /**
   * 定义组件的大小，可选值为 small（小）、middle（中）或 large（大）
   */
  size?: Size;
  /**
   * 是否禁用组件
   */
  disabled?: boolean;
  /**
   * 组件是否为只读状态
   */
  readOnly?: boolean;
  /**
   * 组件的默认值
   */
  defaultValue?: T;
  /**
   * 组件的当前值
   */
  value?: T;
  /**
   * 当组件值变化时的回调函数
   */
  onChange: (value: T) => void;
}
```

基于这些基础类型，定义具体组件的属性类型变得简单而直接：

```ts
 interface WInputProps extends BaseProps<string> {
  /**
   * 输入内容的最大长度
   */
  maxLength?: number;
  /**
   * 是否显示输入内容的计数
   */
  showCount?: boolean;
}
```

## 四、处理含有不同类型元素的数组

在审查自定义`Hook`时，我发现他们倾向于返回`对象`，即使`Hook`只返回两个值。
虽然这样做并非错误，但它违背了自定义Hook的一个常见规范：当`Hook`返回两个值时，应使用数组返回。
他们解释说，他们不知道如何定义含有不同类型元素的数组，通常会选择使用`any[]`，但这会带来类型安全问题，因此他们选择返回对象。
实际上，元组是处理这种情况的理想选择。通过元组，我们可以在一个数组中包含不同类型的元素，同时保持每个元素类型的明确性。

```ts
function useMyHook(): [string, number] {
  return ['示例文本', 42];
}

function MyComponent() {
  const [text, number] = useMyHook();
  console.log(text);  // 输出字符串
  console.log(number);  // 输出数字
  return null;
}
```

在这个例子中，`useMyHook`函数返回一个明确类型的元组，包含一个`string`和一个`number`。在`MyComponent`组件中使用这个`Hook`时，我们可以通过解构赋值来获取这两个不同类型的值，同时保持类型安全。

## 五、处理参数数量和类型不固定的函数

沟通封装的函数时，我发现当函数的参数数量不固定、类型不同或返回值类型不同时，他们倾向于使用`any`定义参数和返回值。
他们解释说，他们只知道如何定义参数数量固定、类型相同的函数，对于复杂情况则不知所措，而且不愿意将函数拆分为多个函数。
这正是`函数重载`发挥作用的场景。通过`函数重载`，我们可以在同一函数名下定义多个函数实现，根据不同的参数类型、数量或返回类型进行区分。

```ts
function greet(name: string): string;
function greet(age: number): string;
function greet(value: any): string {
  if (typeof value === "string") {
    return `Hello, ${value}`;
  } else if (typeof value === "number") {
    return `You are ${value} years old`;
  }
}
```

在这个例子中，我们为`greet`函数提供了两种调用方式，使得函数使用更加灵活，同时保持类型安全。
对于箭头函数，虽然它们不直接支持函数重载，但我们可以通过定义函数签名的方式来实现类似的效果。

```typescript
 type GreetFunction = {
  (name: string): string;
  (age: number): string;
};

const greet: GreetFunction = (value: any): string => {
  if (typeof value === "string") {
    return `Hello, ${value}`;
  } else if (typeof value === "number") {
    return `You are ${value} years old.`;
  }
  return '';
};
```

这种方法利用了类型系统来提供编译时的类型检查，模拟了函数重载的效果。

## 六、组件属性定义：使用type还是interface？

沟通时发现在定义组件属性时既使用`type`也使用`interface`。
询问原因时，他们表示两者都可以用于定义组件属性，没有明显区别。
由于同名接口会自动合并，而同名类型别名会冲突，我推荐使用`interface`定义组件属性。这样，使用者可以通过`declare module`语句自由扩展组件属性，增强了代码的灵活性和可扩展性。

```ts
interface UserInfo {
  name: string;
}
interface UserInfo {
  age: number;
}

const userInfo: UserInfo = { name: "张三", age: 23 };
```

### 结语

::: tip 结语
`TypeScript`的使用并不困难，关键在于理解和应用其提供的强大功能。
:::