本文记录了GitHubAction的配置文件

```js
# This is a basic workflow to help you get started with Actions

name: docs

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [ main ]
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2
      - name: install Node.js
        uses: actions/setup-node@v2.5.0
        with:
          node-version: "20.X"  # 这里可以指定 Node.js 的版本
      - name: install deps  
        run: npm install      # 安装依赖
      - name: build app
        run: npm run docs:build  # 打包命令
      - name: copy new files
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.SERVER_IP }} # 服务器IP
          username: administrator       # 服务器用户名
          password: ${{ secrets.SERVER_PASSWORD }}  # 服务器密码
          port: 22                      # 服务器端口
          source: "study-docs/"         # 打包后的文件目录
          target: "C:/nginx/html/study-docs"  # 服务器上的目标目录
          strip_components: 1          # 去除打包后的文件目录中的一级目录
```