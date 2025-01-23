# 什么是预请求？为什么会发生预请求？

## 什么是预请求？

预请求（Preflight Request） 是一种由浏览器自动发起的 CORS（跨域资源共享） 检查请求。它的作用是在真正的跨域请求之前，验证目标服务器是否允许实际的请求方法和请求头。

## 为什么会发生预请求

预请求是浏览器在满足以下条件时，为了保护用户安全而发起的：

+ `跨域请求`：当客户端和服务器的协议、域名、端口号不同，就会被视为跨域。
+ `非简单请求`：如果跨域请求不符合 简单请求 的标准，浏览器会先发起预请求。

### 简单请求的标准

浏览器认为以下情况是简单请求：

+ __使用的 HTTP 方法是__：
  + GET
  + POST
  + HEAD
+ __自定义的请求头限制为__：
  + Accept
  + Accept-Language
  + Content-Language
  + Content-Type（且值只能是 text/plain、application/x-www-form-urlencoded、multipart/form-data）
+ __请求中没有使用 ReadableStream。__

只要请求超出了这些限制，浏览器就会认为它是非简单请求，并发起预请求。

## 预请求的流程

1. __发送 `OPTIONS 请求`__

浏览器会发送一个 OPTIONS 请求到服务器，询问：

> + 服务器是否允许该跨域请求。
> + 哪些 HTTP 方法和请求头是被允许的。

2. __`服务器响应`__

服务器通过响应头（如 Access-Control-Allow-Origin、Access-Control-Allow-Methods 等）告知浏览器是否允许该请求。

3. __发送`实际请求`__

如果服务器返回允许跨域，浏览器会发送实际的请求；否则，实际请求被拦截。

## 常见触发预请求的情况

::: info

1. 使用了自定义请求头，如 `Authorization`。

2. 请求方法是 `PUT`、`DELETE` 或其他不在简单请求范围内的方法。

3. `Content-Type` 的值不属于简单请求的范围（如 `application/json`）。

4. 启用了 `Credentials`（带有身份凭证，如 Cookies）。

5. CORS 配置中要求严格检查。
:::

## 如何减少预请求？

1. __确保请求是简单请求__

    + 使用 GET 或 POST 方法。
    + 避免自定义请求头。
    + 使用 application/x-www-form-urlencoded 代替 application/json。

2. __合并请求__

    + 减少请求的频率，减少发起多个跨域请求的次数。

3. __在服务器端配置 CORS__

    + 设置合理的 Access-Control-Max-Age 值，以缓存预请求的结果，减少重复发送。

4. __使用同源策略__

    + 尽量保持客户端和服务端在同一个域名或子域下，避免跨域问题。
