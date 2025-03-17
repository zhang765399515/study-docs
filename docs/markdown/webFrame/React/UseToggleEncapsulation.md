# UseToggle 封装

本文主要封装一个 UseToggle 组件，用于切换状态。

## 组件封装

封装之前，我们需要考虑要达到那些功能？

- **1. 切换状态**
- **2. 切换状态的方法**
- **3. 切换状态的类型**
- **4. 导出初始变量**
- **5. 导出切换状态的方法**

### 先写初始版本

```tsx
import { useMemo, useState } from 'react';
export interface Actions<T> {
  setLeft: () => void;
  setRight: () => void;
  set: (value: T) => void;
  toggle: () => void;
}
const useToggle = (defaultValue: boolean):[boolean, Actions<boolean>] => {
    const [state, setState] = useState(defaultValue);
    const action = {
        toggle:()=>{},
        set:()=>{},
        setLeft:()=>{},
        setRight:()=>{},
    }
    return [state, actions];
}
export default useToggle;
```

### 考虑不同传参的情况

 这里需要使用到 `函数重载` 使其不同类型的参数都可以使用。

**默认不传承**

 如果不传入参数，就`默认导出布尔类型
`
```tsx
function useToggle<T = boolean>(): [boolean, Actions<T>];
```

**只有一个参数的时候**

```tsx
function useToggle<T>(defaultValue: T): [T, Actions<T>];
```

**两个参数的时候**

```tsx
function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>];
```

### 添加切换状态的方法

```tsx
import { useMemo, useState } from 'react';

export interface Actions<T> {
  setLeft: () => void;
  setRight: () => void;
  set: (value: T) => void;
  toggle: () => void;
}

function useToggle<T = boolean>(): [boolean, Actions<T>];

function useToggle<T>(defaultValue: T): [T, Actions<T>];

function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>];

function useToggle<D, R>(defaultValue: D = false as unknown as D, reverseValue?: R) {
  const [state, setState] = useState<D | R>(defaultValue);

  const actions = useMemo(() => {
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R; // [!code ++]

    const toggle = () => setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue)); // [!code ++]
    const set = (value: D | R) => setState(value); // [!code ++]
    const setLeft = () => setState(defaultValue); // [!code ++]
    const setRight = () => setState(reverseValueOrigin); // [!code ++]

    return {
      toggle,
      set,
      setLeft,
      setRight,
    };
  }, []);

  return [state, actions];
}

export default useToggle;

```
