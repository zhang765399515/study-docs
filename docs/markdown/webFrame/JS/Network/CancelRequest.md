# 取消请求的几种方式

在使用 axios 时，可以通过以下几种方式`取消请求`：

## 1. 使用 AbortController（推荐）

在 axios 中，推荐的取消请求方式是使用 `AbortController`。这是现代浏览器提供的一种取消异步操作的机制。

示例代码：

```js
const controller = new AbortController();

// 发起请求
axios.get('/api/data', {
  signal: controller.signal,
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.name === 'CanceledError') {
      console.log('请求已取消', error.message);
    } else {
      console.error('其他错误', error);
    }
  });

// 取消请求
controller.abort();
```

::: tip 特点：
推荐方式：AbortController 是现代标准，兼容性较好，支持多个库。

适用于 Axios v1.4.0 及以上版本。
:::

## 2. 使用 CancelToken (已废弃)

axios 早期版本通过 CancelToken 来实现取消请求，但在 v1.0 中被标记为废弃。

示例代码：

```
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// 发起请求
axios.get('/api/data', {
  cancelToken: source.token,
})
  .then(response => {
    console.log(response.data);
  })
  .catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('请求已取消', thrown.message);
    } else {
      console.error('其他错误', thrown);
    }
  });

// 取消请求
source.cancel('取消请求的原因');
```

::: info 特点：
不推荐使用：虽然部分旧项目中可能仍在使用，但已被废弃。
:::

## 3. 手动检查标志变量

通过在请求发起前设置标志变量的方式模拟取消。

示例代码：

```js
let isCanceled = false;

// 模拟取消请求
function fetchData() {
  return axios.get('/api/data')
    .then(response => {
      if (!isCanceled) {
        console.log(response.data);
      }
    })
    .catch(error => {
      if (!isCanceled) {
        console.error('请求错误', error);
      }
    });
}

// 发起请求
const request = fetchData();

// 设置取消标志
isCanceled = true;
```

::: danger 特点：
适用于无法使用 AbortController 的场景。

不是真正的取消请求，依然会消耗网络资源。
:::

# 相关文章

<CustomLink title='《axios.get 常用配置选项》'  href='http://localhost:8999/markdown/webFrame/JS/Network/AxiosGet.html'/>
