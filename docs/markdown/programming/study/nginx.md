# nginx 的作用

::: tip
  Nginx 是一个高性能的`HTTP和反向代理服务器`，也是一个负载均衡器和邮件代理服务器，广泛用于Web服务和反向代理中。
:::

## Nginx 的主要作用

### 1. HTTP 服务器

作为静态资源服务器，直接提供 HTML、CSS、JS、图片等静态文件的访问。

性能高，能够处理大量并发请求，比传统的 Apache 服务器更轻量级。

示例：提供静态资源

```js
server {
    listen 80;
    server_name example.com;

    location / {
        root /var/www/html;
        index index.html;
    }
}
```

### 2. 反向代理

通过代理请求，将前端请求转发到后端服务器。

隐藏后端服务器，提升安全性和访问速度。

示例：反向代理到后端服务

  ```js
  server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
    }
  }
  ```

### 3. 负载均衡

将请求分发到多个后端服务器，提升系统性能和稳定性。

支持多种负载均衡策略，如轮询（round-robin）、最少连接（least_conn）等。

示例：负载均衡配置

```js
upstream backend {
    server 192.168.1.10;
    server 192.168.1.11;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

### 4. 防火墙与安全

`提供 SSL/TLS 加密支持，保障数据传输安全`

限制访问 IP，防止恶意攻击。

设置访问控制、请求限制，防止 DDoS 攻击。

示例：IP 访问限制

```js
server {
    listen 80;
    location / {
        allow 192.168.1.0/24;
        deny all;
    }
}
```

### 5. 动静分离

静态资源由 Nginx 直接返回，动态请求交给后端应用处理，减少后端压力。

示例：动静分离配置

```js
server {
    listen 80;
    server_name example.com;

    location /static/ {
        root /var/www/static;
    }

    location /api/ {
        proxy_pass http://localhost:5000;
    }
}
```

### 6. Gzip 压缩

启用 Gzip 压缩，减少页面加载时间，提高访问速度。

示例：开启 Gzip 压缩

```js
gzip on;
gzip_types text/plain application/json application/javascript text/css;
gzip_min_length 1000;
```

### 7.缓存功能

#### 1. 浏览器缓存（客户端缓存）

通过设置 Cache-Control、Expires 等 HTTP 头，让浏览器缓存静态资源，如 CSS、JS、图片等，减少重复请求。

示例：配置浏览器缓存

```js
server {
    listen 80;
    server_name example.com;

    location /static/ {
        root /var/www/html;
        # 缓存一年 // [!code focus]
        expires 1y; // [!code focus]
        add_header Cache-Control "public"; // [!code focus]
    }
}
```

解释：

expires 1y：设置资源缓存时间为 1 年。
Cache-Control: public：允许任何缓存（包括浏览器和 CDN）保存响应。

#### 2. 反向代理缓存

Nginx 作为反向代理时，可以缓存后端服务的响应，减少对上游服务器的请求压力。

示例：配置反向代理缓存

```js
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m use_temp_path=off;

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        
        # 启用缓存 // [!code focus]
        proxy_cache my_cache; // [!code focus]
        proxy_cache_valid 200 302 10m; // [!code focus]
        proxy_cache_valid 404 1m; // [!code focus]
        add_header X-Cache-Status $upstream_cache_status; // [!code focus]
    }
}
```

解释：

proxy_cache_path：指定缓存路径和区域，限制最大缓存空间和不活跃时间。
proxy_cache_valid：设置不同状态码的缓存时间，200 和 302 响应缓存 10 分钟，404 缓存 1 分钟。
X-Cache-Status：返回是否命中缓存，便于调试。

#### 3. 静态资源缓存

直接缓存静态文件到内存或磁盘，提高访问速度，避免频繁读取硬盘。

示例：静态资源缓存配置

```js
server {
    listen 80;
    server_name example.com;

    location /images/ {
        root /var/www/html;
        
        # 设置静态资源缓存  // [!code focus]
        open_file_cache max=1000 inactive=20s;  // [!code focus]
        open_file_cache_valid 30s;  // [!code focus]
        open_file_cache_min_uses 2; // [!code focus]
        open_file_cache_errors on; // [!code focus]
    }
}
```

解释：

open_file_cache：缓存已打开的文件句柄，减少磁盘 I/O。

max=1000：最多缓存 1000 个文件句柄。

inactive=20s：文件句柄在 20 秒内未被访问则移除缓存。

#### 4. FastCGI 缓存

在使用 PHP、Python 等 FastCGI 应用时，可以缓存动态页面生成的结果，减少动态请求对后端的压力。

示例：FastCGI 缓存配置

```js
fastcgi_cache_path /var/cache/nginx/fastcgi_cache levels=1:2 keys_zone=php_cache:10m inactive=60m max_size=1g;

server {
    listen 80;
    server_name example.com;

    location ~ \.php$ {
        root /var/www/html;
        fastcgi_pass unix:/run/php/php7.4-fpm.sock;
        include fastcgi_params;

        # 开启 FastCGI 缓存 // [!code focus]
        fastcgi_cache php_cache; // [!code focus]
        fastcgi_cache_valid 200 10m; // [!code focus]
        fastcgi_cache_valid 404 1m; // [!code focus]
        add_header X-FastCGI-Cache $upstream_cache_status; // [!code focus]
    }
}
```

解释：

fastcgi_cache_path：设置 FastCGI 缓存路径和大小。
fastcgi_cache_valid：配置缓存时间，200 响应缓存 10 分钟，404 缓存 1 分钟。
缓存状态查看
在配置缓存时，可以通过返回的响应头查看缓存状态：

HIT：命中缓存。
MISS：未命中缓存，请求已转发给上游服务器。
EXPIRED：缓存过期。
BYPASS：绕过缓存。
示例：在响应头中添加缓存状态

```js
add_header X-Cache-Status $upstream_cache_status;
```

清除缓存
直接删除缓存目录下的文件，例如：

```js
rm -rf /var/cache/nginx/*
```

或者设置短缓存时间让其自动失效。
总结
浏览器缓存：减少客户端重复请求，适合静态资源。
反向代理缓存：减少后端负载，适合动态接口。
静态资源缓存：提高静态资源访问速度。
FastCGI 缓存：减少动态页面生成压力。

## Nginx 的优势

+ 高并发：单机支持数万并发连接，性能优秀。
+ 轻量级：占用资源少，启动速度快。
+ 模块化设计：可以根据需求加载或禁用模块。
+ 热加载配置：修改配置后无需重启，可以平滑升级和重新加载配置。
+ 跨平台：支持 Linux、Windows 等多个系统。

## 常见应用场景

+ 静态资源托管
+ 反向代理和负载均衡
+ API 网关
+ 网站 HTTPS 证书配置
+ 文件上传和下载加速

Nginx 是 Web 部署和运维中不可或缺的工具之一。

## 完善的 配置


```bash
# 全局段配置

# 指定运行nginx的用户或用户组，默认为nobody。
#user administrator administrators;

# 设置工作进程数，通常设置为等于CPU核心数。
#worker_processes 2;

# 指定nginx进程的PID文件存放位置。
#pid /nginx/pid/nginx.pid;

# 指定错误日志的存放路径和日志级别。
error_log log/error.log debug;

# events段配置信息
# ------------------------------
events {
    # 设置网络连接序列化，用于防止多个进程同时接受到新连接的情况，这种情况称为"惊群"。
    accept_mutex on;

    # 设置一个进程是否可以同时接受多个新连接。
    multi_accept on;

    # 设置工作进程的最大连接数。
    worker_connections  1024;
}

# http配置段，用于配置HTTP服务器的参数。
# ------------------------------
http {
    # 包含文件扩展名与MIME类型的映射。
    include       mime.types;

    # 设置默认的MIME类型。
    default_type  application/octet-stream;

    # 定义日志格式。
    log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for';

    # 指定访问日志的存放路径和使用的格式。
    access_log log/access.log myFormat;

    # 允许使用sendfile方式传输文件。
    sendfile on;

    # 限制每次调用sendfile传输的数据量。
    sendfile_max_chunk 100k;

    # 设置连接的保持时间。
    keepalive_timeout 65;

    # 定义一个上游服务器组。
    upstream mysvr {   
      server 127.0.0.1:7878;
      server 192.168.10.121:3333 backup;  #此服务器为备份服务器。
    }

    # 定义错误页面的重定向地址。
    error_page 404 https://www.baidu.com;

    # 定义一个虚拟主机。
    server {
        # 设置单个连接上的最大请求次数。
        keepalive_requests 120;

        # 设置监听的端口和地址。
        listen       4545;
        server_name  127.0.0.1;

        # 定义location块，用于匹配特定的请求URI。
        location  ~*^.+$ {
           # 设置请求的根目录。
           #root path;

           # 设置默认页面。
           #index vv.txt;

           # 将请求转发到上游服务器组。
           proxy_pass  http://mysvr;

           # 定义访问控制规则。
           deny 127.0.0.1;
           allow 172.18.5.54;          
        } 
    }
}

```

## 参考文献

<CustomLink title='《nginx（前端必会-项目部署-精简通用篇）》'  href='https://juejin.cn/post/7424168473423020066'/>
