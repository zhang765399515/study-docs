# IO 操作

今天在项目中遇到一个问题，查询了很多资料后，了解到其中一个关键词 - `IO 操作`。

## 什么是 IO 操作？

在前端开发中，**I/O 操作（输入 / 输出操作）** 指的是浏览器与外部环境进行数据交换的过程。这些操作通常涉及 **网络请求**、 **文件处理**、 **存储读写** 等，且由于浏览器的单线程特性（主线程负责渲染 UI 和执行 JavaScript），I/O 操作必须以 **异步** 方式执行，否则会导致页面 **卡顿**。

## 前端常见的 I/O 操作类型

**（1）网络请求（核心）**

-   **场景**：与服务器交换数据（如获取 API 数据、上传文件）
-   **API**：`fetch`、`XMLHttpRequest`、`WebSocket`
-   **示例**：

```javascript
// 使用fetch获取JSON数据（异步）
fetch("https://api.example.com/users")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("请求失败:", error));
```

**（2）文件操作**

-   **场景**：读取用户上传的文件、生成文件供用户下载

-   **API**：File API、Blob、FileReader

-   **示例**：读取用户选择的图片文件

```javascript
document.getElementById("fileInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result; // 图片Base64数据
            document.body.appendChild(img);
        };
        reader.readAsDataURL(file); // 异步读取
    }
});
```

**（3）浏览器存储**

-   **场景**：本地缓存数据（如用户偏好、临时状态）
-   **API**：localStorage、sessionStorage、IndexedDB、Cookie
-   **示例**：

```javascript
// 存储数据（同步操作，但性能开销小）
localStorage.setItem("user", JSON.stringify({ name: "John" }));

// 读取数据
const user = JSON.parse(localStorage.getItem("user"));
```

**（4）用户交互**

-   **场景**：获取用户输入（如表单提交、键盘 / 鼠标事件）
-   **API**：事件监听（addEventListener）
-   **示例**：

```javascript
document.getElementById("submitBtn").addEventListener("click", () => {
    const inputValue = document.getElementById("input").value;
    console.log("用户输入:", inputValue); // 从UI读取数据（输入）
});
```

**（5）Web API（高级场景）**

-   **场景**：访问设备硬件（如摄像头、麦克风、地理位置）
-   **API**：navigator.mediaDevices、Geolocation API
-   **示例**：获取用户位置

```javascript
navigator.geolocation.getCurrentPosition(
    (position) => console.log("位置:", position.coords),
    (error) => console.error("获取位置失败:", error)
);
```

## 为什么前端 I/O 必须异步？

JavaScript 在浏览器中是单线程执行的，主线程同时负责：

-   执行 JavaScript 代码
-   渲染 DOM（更新页面）
-   处理用户事件（如点击、滚动）

如果 I/O 操作同步执行（如网络请求卡住主线程），会导致：

-   **页面卡顿**：用户无法点击按钮、滚动页面
-   **无响应状态**：浏览器可能显示 “脚本运行时间过长” 的警告

示例对比：

```javascript
// 错误：同步XHR（已被现代浏览器禁用）
const xhr = new XMLHttpRequest();
xhr.open("GET", "data.json", false); // 第三个参数false表示同步
xhr.send(); // 主线程会被阻塞直到请求完成

// 正确：异步请求（使用fetch或XHR的async=true）
fetch("data.json").then((response) => response.json()); // 立即返回Promise，不阻塞
```

## 前端 I/O 的性能优化

**（1）批量处理 vs 实时处理**

-   **反例**：每次用户输入都立即发送请求

```javascript
// 每输入一个字符就触发请求（低效）
inputElement.addEventListener("input", () => {
    fetch(`/search?q=${inputElement.value}`);
});
```

-   **优化**：使用防抖（Debounce）减少请求次数

```javascript
function debounce(func, delay) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
    };
}

inputElement.addEventListener(
    "input",
    debounce(() => {
        fetch(`/search?q=${inputElement.value}`);
    }, 300)
);
```

**（2）缓存机制**

-   使用`localStorage`缓存频繁访问的数据

-   利用 HTTP 缓存头`（如Cache-Control、ETag）`减少重复请求

**（3）流式处理**

大文件上传 / 下载时使用`ReadableStream`和`WritableStream`

```javascript
fetch("large-file.json")
    .then((response) => response.body.getReader())
    .then((reader) => {
        // 分块处理数据，避免一次性加载整个文件
        reader.read().then(function process({ done, value }) {
            if (done) return;
            console.log("处理数据块:", value);
            return reader.read().then(process);
        });
    });
```

## 参考文献

<CustomLink title='《IO模型详解》'  href='https://juejin.cn/post/7349410786816622626?searchId=20250529105451906211D15E1A87609385'/>