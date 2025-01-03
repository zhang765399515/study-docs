# 关于使用git代理后无法提交代码到GitHub

 看到这个模块说明又出现了各种GitHub提交时候报错了，这里记录了一些报错的原因和处理方式，按照这个步骤基本能解决提交到GitHub时候的报错问题

## 问题一 Failed to connect to github.com port 443 after 21051 ms: Couldn't connect to server

  这种从什么到什么的，最后以 `Couldn't connect to server` 结尾的报错，主要就是访问不到服务器导致的，出现这种报错，我已知的有使用了`国内代理问题`和无法访问到 GitHub

### 方法一：使用翻墙工具

  使用翻墙工具，毕竟 GitHub 是外网地址，虽然有时能直接连接访问，但大部分时候都无法直接访问，这是就需要一个工具来越过该`墙体`进行访问。
  
#### 如果使用了翻墙工具，且其他操作皆不可行

  这种情况需要手动将系统的代理端口同步的git的代理中去

  ```js
  git config --global http.proxy http://127.0.0.1:[port]
  git config --global https.proxy http://127.0.0.1:[port]
  ```

### 方法二：清除通用代理

  大部分时候，直接清除通用代理即可

  ```js
  git config --global --unset http.proxy
  git config --global --unset https.proxy
  ```

### 方法三：清除相关代理

  先确定报错信息，比如以下链接中：

  ```js
    fatal: unable to access `'https://github.com/zhang765399515/*****/'`: Failed to connect to github.com port 443 after 21051 ms: Couldn't connect to server
  ```

  其中项目链接是否为github.com的项目，如果你使用了代理的话可能会是以下几种其中的一种代理

  ```js
    hub.fastgit.xyz
    raw.fastgit.org
    assets.fastgit.org
    customer-stories-feed.fastgit.org
    download.fastgit.org
    archive.fastgit.org
  ```

  我们可以使用 `git config --global --list` 查看git的全局配置项，在这里面可以看到相关代理，比如以下代理：

  ```js
    url.https://hub.fastgit.xyz/.insteadof=https://github.com/
  ```

  该代理一般在输出的最后几行，原理就是使用`hub.fastgit.xyz`代理`github.com`，我们使用以下代码进行清除即可，请注意，这里清除需要将 `=` 前面的所有字符代入清除，注意空格。

  ```js
  git config --global --unset url.https://hub.fastgit.xyz/.insteadof
  ```
