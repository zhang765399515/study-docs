# 什么是监控？

监控就是指对网页或应用的性能、错误、用户行为等进行实时监测和分析的过程。

## 一、性能监控的关键指标与实现

前端性能直接影响用户体验和转化率，核心监控指标包括：

**1. 核心 Web Vitals 指标**

-   **LCP (Largest Contentful Paint)**：最大内容绘制时间

```js
new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        console.log("LCP时间:", entry.startTime);
        // 上报到监控系统
        reportToServer("lcp", entry.startTime);
    }
}).observe({ type: "largest-contentful-paint", buffered: true });
```

-   **FID (First Input Delay)**：首次输入延迟

```javascript
new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        console.log("FID时间:", entry.processingStart - entry.startTime);
    }
}).observe({ type: "first-input", buffered: true });
```

-   **CLS (Cumulative Layout Shift)**：累积布局偏移

```javascript
let clsScore = 0;
new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
            clsScore += entry.value;
            console.log("CLS分数:", clsScore);
        }
    }
}).observe({ type: "layout-shift", buffered: true });
```

**2. 传统性能指标**

-   **TTFB (Time To First Byte)**：首字节响应时间
-   **FP (First Paint)**：首次绘制时间
-   **FCP (First Contentful Paint)**：首次内容绘制时间
-   **TTI (Time To Interactive)**：可交互时间

**获取完整性能数据：**

```javascript
window.addEventListener("load", () => {
    setTimeout(() => {
        const perfEntries = performance.getEntriesByType("navigation");
        if (perfEntries.length > 0) {
            const navEntry = perfEntries[0];
            console.log("TTFB:", navEntry.responseStart - navEntry.startTime);
            console.log(
                "FP:",
                performance.getEntriesByName("first-paint")[0]?.startTime
            );
            console.log(
                "FCP:",
                performance.getEntriesByName("first-contentful-paint")[0]
                    ?.startTime
            );
        }
    }, 0);
});
```

## 二、错误监控的深度实现

**1. 全面错误捕获方案**

```js
// 1. JavaScript 运行时错误
window.onerror = function(message, source, lineno, colno, error) {
  reportError('js_error', { message, source, lineno, colno, stack: error?.stack });
  return true;
};

// 2. 未捕获的 Promise 错误
window.onunhandledrejection = function(event) {
  reportError('promise_rejection', {
    reason: event.reason,
    promise: event.promise
  });
};

// 3. 资源加载错误
window.addEventListener('error', function(event) {
  if (event.target instanceof HTMLScriptElement ||
      event.target instanceof HTMLLinkElement ||
      event.target instanceof HTMLImageElement) {
    reportError('resource_load_error', {
      url: event.target.src || event.target.href,
      type: event.target.tagName
    });
  }
}, true);

// 4. Vue 框架错误
import Vue from 'vue';
Vue.config.errorHandler = function(err, vm, info) {
  reportError('vue_error', { err, component: vm.$options.name, info });
};

// 5. React 框架错误（Error Boundary）
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, errorInfo) {
    reportError('react_error', { error, errorInfo });
  }
  render() { ... }
}

```

**2. 跨域错误处理**

1. 服务器添加 CORS 头：Access-Control-Allow-Origin:
2. 脚本标签添加 crossorigin 属性：

```html
<script src="https://example.com/script.js" crossorigin="anonymous"></script>
```

**3. 错误聚合与去重**

```js
const errorCache = new Map();

function reportError(type, errorData) {
    const errorKey = `${type}_${errorData.message || errorData.reason}`;
    const cacheEntry = errorCache.get(errorKey);

    if (cacheEntry) {
        cacheEntry.count++;
        cacheEntry.lastOccurrence = Date.now();
        // 每10分钟上报一次相同错误
        if (Date.now() - cacheEntry.lastReport > 600000) {
            cacheEntry.lastReport = Date.now();
            sendErrorToServer({ ...errorData, count: cacheEntry.count });
        }
    } else {
        errorCache.set(errorKey, {
            count: 1,
            firstOccurrence: Date.now(),
            lastOccurrence: Date.now(),
            lastReport: Date.now(),
        });
        sendErrorToServer(errorData);
    }
}
```

## 三、用户体验监控

**1. 长任务监控（Long Tasks）**

检测执行时间超过 50ms 的任务，可能导致页面卡顿：

```javascript
new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        console.log("长任务检测:", entry.duration, entry.attribution);
        reportToServer("long_task", {
            duration: entry.duration,
            culprit: entry.attribution[0]?.name || "unknown",
        });
    }
}).observe({ type: "longtask", buffered: true });
```

**2. 交互响应监控**

测量用户点击到实际响应的时间：

```javascript
document.addEventListener("click", function (event) {
    const startTime = performance.now();
    const originalHandler = event.target.onclick;

    if (typeof originalHandler === "function") {
        event.target.onclick = function () {
            const responseTime = performance.now() - startTime;
            console.log("交互响应时间:", responseTime);
            reportToServer("interaction_response", {
                element: event.target.id || event.target.tagName,
                responseTime,
            });
            return originalHandler.apply(this, arguments);
        };
    }
});
```

**3. 页面加载体验**

使用 `Intersection Observer` 监控关键元素的可见性：

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const loadTime =
                performance.now() - window.performance.timing.navigationStart;
            console.log(`${entry.target.id} 元素可见时间:`, loadTime);
            reportToServer("element_visibility", {
                element: entry.target.id,
                loadTime,
            });
            observer.unobserve(entry.target);
        }
    });
});

// 监控轮播图、首屏图片等关键元素
document.querySelectorAll(".hero-image, .carousel-item").forEach((el) => {
    observer.observe(el);
});
```

## 四、监控优化

**1.性能影响**：

-   使用 `requestIdleCallback` 执行非关键上报
-   批量上报数据，减少请求次数
-   采样上报：对高流量应用，按比例采样（如 10% 用户）

-   分层上报：错误严重程度分级上报

**2. 隐私合规**：

-   匿名化用户标识（使用 UUID 而非真实 ID）
-   过滤敏感信息（如 URL 参数中的密码）
-   遵守 GDPR、CCPA 等法规

**3. 复杂场景处理**：

-   SPA 单页应用的路由切换监控
-   微前端架构下的跨应用监控
-   WebWorker、Service Worker 中的错误捕获

## 总结

前端监控是保障应用质量和用户体验的关键手段，通过全面监控性能、错误和用户行为，可以及时发现问题并驱动产品优化。现代监控系统需要兼顾数据准确性、性能开销和隐私合规，选择合适的工具和技术栈至关重要。