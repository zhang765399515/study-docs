# axios.get 常用配置选项

## 1. params（参数）

描述：用于指定 URL 查询参数，axios 会自动将对象序列化为查询字符串。

示例：

```js
axios.get('/api/data', {
  params: {
    userId: 123,
    status: 'active'
  }
});
// 请求 URL: /api/data?userId=123&status=active
```

## 2. headers（请求头）

描述：用于设置请求头。

示例：

```js
axios.get('/api/data', {
  headers: {
    Authorization: 'Bearer token123',
  }
});
```

## 3. signal（中断请求）

描述：用于与 AbortController 配合，控制请求取消。

示例：

```js
const controller = new AbortController();
axios.get('/api/data', {
  signal: controller.signal,
});
controller.abort(); // 取消请求
```

## 4. timeout（请求时间）

描述：设置请求的超时时间（毫秒）。

示例：

```js
axios.get('/api/data', {
  timeout: 5000, // 超时时间 5 秒
});
```

## 5. auth（认证）

描述：用于发送 HTTP 基本认证。

示例：

```js
axios.get('/api/data', {
  auth: {
    username: 'admin',
    password: '12345'
  }
});
```

## 6. responseType（数据类型）

描述：指定响应数据的类型。

+ 支持的值：
  + json（默认）
  + arraybuffer
  + blob
  + document
  + text
  + stream（仅在 Node.js 中支持）

示例：

```js
axios.get('/api/data', {
  responseType: 'blob',
});
```

## 7. validateStatus（响应状态码）

描述：用于自定义 HTTP 响应状态码的验证规则，决定是否抛出错误。
示例：

```js
axios.get('/api/data', {
  validateStatus: function (status) {
    return status < 500; // 仅当状态码小于 500 时才会被认为是成功的
  }
});
```

## 8. paramsSerializer（序列方式）

描述：自定义查询参数的序列化方式。
示例：

```js
import qs from 'qs';
axios.get('/api/data', {
  params: { ids: [1, 2, 3] },
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
});
// 请求 URL: /api/data?ids=1&ids=2&ids=3
```

## 9. onDownloadProgress（进度）

描述：监听下载进度事件，仅在浏览器中有效。
示例：

```js
axios.get('/api/file', {
  onDownloadProgress: progressEvent => {
    console.log('下载进度:', progressEvent.loaded / progressEvent.total);
  }
});
```

## 10. proxy（代理）

描述：用于设置代理。
示例：

```js
axios.get('/api/data', {
  proxy: {
    host: '127.0.0.1',
    port: 9000,
  }
});
```
# 完整示例
```js
axios.get('/api/data', {
  params: { id: 123 },
  headers: { Authorization: 'Bearer token123' },
  timeout: 5000,
  responseType: 'json',
  signal: new AbortController().signal,
  validateStatus: status => status < 500,
});
```

以上配置项可以自由组合，适应各种需求。

#参考文献

<CustomLink title='《ChatGpt》' desc='即时答案。更高生产力。无尽灵感。' href='https://chatgpt.com/c/67413949-5c1c-800a-9f85-b9b4fb73b699'/>
