# 网络优化

可以从以下几个关键方面展开，结合原理和具体技术实现：

## **1. 资源加载优化**

**1. 压缩与最小化**

-   **代码压缩**：去除 JS/CSS 中的空格、注释，减少文件体积（如 UglifyJS、Terser）。
-   **图片压缩**：使用 WebP/AVIF 格式（比 JPEG/PNG 小 30%+），结合图片懒加载（Intersection Observer API）。
-   **GZIP/Brotli**：服务器启用压缩算法，减小传输内容体积。

**2. 资源合并与分割**

-   **CSS/JS** 合并：减少 HTTP 请求（如 Webpack 的 Code Splitting）。
-   **按需加载**：使用动态导入（Dynamic Import）延迟加载非关键资源。

**3. 缓存策略**

-   **强缓存**：设置 Cache-Control: max-age=31536000，避免重复请求静态资源。
-   **协商缓存**：使用 ETag 和 Last-Modified 验证资源是否更新。
-   **Service Worker**：离线缓存关键资源（如 PWA）。

## **2. 网络请求优化**

**1. CDN（内容分发网络）**

-   将静态资源分发到离用户最近的节点，减少传输延迟。
-   示例：使用 Cloudflare、阿里云 CDN 加载第三方库（如 React、jQuery）。

**2. HTTP/2 与 HTTP/3**

-   **二进制分帧**：并行处理多个请求（多路复用）。
-   **头部压缩**：HPACK 算法减少 HTTP 头大小。
-   **服务器推送**：主动推送资源（如 HTML 引用的 CSS/JS）。

**3. 请求优先级**

    通过preload、prefetch控制资源加载顺序：

```html
<link rel="preload" href="critical.js" as="script" />
<!-- 关键资源优先加载 -->
<link rel="prefetch" href="non-critical.js" />
<!-- 空闲时预加载 -->
```

## **3. 代码与架构优化**

**1. 懒加载与预加载**

-   **图片懒加载**：仅当图片进入视口时加载。
-   **组件懒加载**：如 React 的 React.lazy 和 Suspense。

**2. 减少重定向**

-   避免 HTTP 重定向（301/302），例如将 http://直接重定向到 https://。

**3. 数据请求优化**

-   **合并 API 请求**：减少请求次数（如 GraphQL 的批量查询）。
-   **长连接与 SSE**：适用于实时数据更新（如聊天、监控）。

## **4. 性能监控与分析**

**1. 工具链**

-   Lighthouse：分析性能指标（FCP、LCP、TTFB）。
-   Chrome DevTools：Network 面板查看请求瀑布图、Waterfall 分析。
-   WebPageTest：多地点测试，获取详细性能报告。

**2.关键指标优化**

-   TTFB（Time To First Byte）：优化服务器响应时间（如使用 CDN、缓存）。
-   FCP（First Contentful Paint）：减少关键渲染路径（如内联关键 CSS）。

## **5. 其他优化手段**

-   **DNS 预解析**

```html
<link rel="dns-prefetch" href="https://cdn.example.com" />
```

-   **Cookie 优化**
    -   减少 Cookie 大小，避免在静态资源域名下设置 Cookie。
-   **WebWorker**
    -   将耗时计算逻辑放到 Worker 线程，避免阻塞主线程。
    

## 总结

“优化网络性能需要从多个维度入手：首先通过压缩、缓存和 CDN 减少资源体积与传输距离；其次利用 HTTP/2 + 特性和请求优先级提升传输效率；然后通过懒加载、预加载和代码分割优化加载时机；最后结合性能监控工具持续改进。例如，我曾在项目中通过图片格式升级（JPEG→WebP）和 Service Worker 缓存，将首屏加载速度提升了 40%。”
