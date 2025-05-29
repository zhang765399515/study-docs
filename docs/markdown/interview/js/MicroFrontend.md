# 微前端的理解

**特点**

-   技术栈无关
-   独立开发、部署、仓库
-   增量升级
-   状态隔离
-   环境隔离
-   消息通信
-   依赖复用

## 主要的微前端框架

### iframe

**缺点**

-   URL 不同步
-   UI 不同步
-   完全隔离 
-   速度

### sigle-spa

注册应用->url 变化->app active->找到子应用->life cycle

**声明周期**

- bootstrap
- mount
- unmount

应用分类

- root-config
- app-parcel