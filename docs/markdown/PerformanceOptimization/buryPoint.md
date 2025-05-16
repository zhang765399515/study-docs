# 埋点

埋点是指在应用中通过代码主动收集用户行为数据的过程，其核心目的是 **量化用户行为** 和 **产品表现**。

通过埋点数据，产品团队可以：

1. **优化用户体验**：发现用户流失点（如购物车放弃率）
2. **评估功能效果**：衡量新功能点击率、转化率
3. **驱动数据决策**：分析用户路径，优化产品流程
4. **监控业务健康**：实时跟踪关键指标（如支付成功率）

## 埋点的三种主流实现方式

**1. 代码埋点（侵入式）**

在业务代码中手动插入埋点代码，灵活性高但维护成本大。

**示例：按钮点击埋点**

```javascript
document.getElementById("login-btn").addEventListener("click", () => {
    trackEvent("login_click", {
        button_position: "header",
        referrer: document.referrer,
    });
});

function trackEvent(eventName, data) {
    fetch("/analytics", {
        method: "POST",
        body: JSON.stringify({
            event: eventName,
            data: data,
            timestamp: Date.now(),
            user_id: getUserId(), // 假设已登录
        }),
    });
}
```

**2. 无埋点（全量埋点）**
自动捕获所有用户行为，无需手动编写埋点代码。

```js
// 监听所有点击事件
document.addEventListener("click", (event) => {
    const target = event.target;
    const eventData = {
        element_id: target.id,
        element_class: target.className,
        element_text: target.innerText,
        page_path: location.pathname,
    };
    sendAutoTrack("click", eventData);
});

// 监听页面浏览
window.addEventListener("load", () => {
    sendAutoTrack("page_view", {
        load_time: performance.now(),
        referrer: document.referrer,
    });
});
```

**3. 可视化埋点（半自动）**

通过可视化界面配置埋点位置，无需修改代码。一半不由开发来做。

**实现流程：**

1. **开发埋点管理平台**：提供界面选择元素并配置参数
2. **注入埋点脚本**：在页面中嵌入可视化工具
3. **选择埋点元素**：通过点击页面元素选择埋点位置
4. **配置参数**：设置事件名、上报字段等
5. **生成配置**：平台生成埋点配置并推送到生产环境

## 埋点的关键指标设计

**1. 用户行为指标**

-   **页面浏览**：PV（页面浏览量）、UV（独立访客数）
-   **点击行为**：点击率、热点图
-   **转化漏斗**：注册转化率、支付转化率
-   **用户留存**：次日留存率、7 日留存率

**2. 业务指标**

-   **电商**：客单价、购物车放弃率、复购率
-   **内容平台**：平均阅读时长、点赞 / 收藏率
-   **SaaS 产品**：功能使用率、付费转化率

**3. 技术指标**

-   页面加载时间
-   JavaScript 错误率
-   内存占用情况

## 埋点的挑战与解决方案

**1. 性能影响**

-   **问题**：频繁上报导致页面卡顿
-   **解决方案**： - 使用 requestIdleCallback 在浏览器空闲时执行上报 - 控制上报频率，避免密集操作

**2. 隐私合规**

-   **问题**：收集用户敏感信息可能违反 GDPR、《个人信息保护法》
-   **解决方案**：

    -   匿名化处理用户标识（使用 UUID 而非真实 ID）
    -   过滤敏感数据（如密码、信用卡号）
    -   获得用户明确授权后再收集数据

**3. 数据准确性**

-   **问题**：重复上报、数据丢失
-   **解决方案**： - 实现去重机制（如对相同事件设置防抖时间） - 本地缓存未成功上报的数据，下次启动时重试

**4. 跨平台一致性**

-   **问题**：多端（Web、App、小程序）埋点逻辑不一致
-   **解决方案**：
    -   统一埋点协议和数据结构
    -   使用跨平台埋点 SDK（如 Google Analytics、Mixpanel）
