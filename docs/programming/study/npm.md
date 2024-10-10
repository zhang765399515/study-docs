
# NPM 发布包记录

最近公司使用了一部分重复组件，为了以后方便各个项目灵活使用，想直接将模块发布成npm包，这里记录下发布遇到的问题。

基础流程：新建项目，跟着命令选择对应的方案
流程如下：

#### 1：新建项目

#### 2：新建导出访问入口和命令
    package新建npm 命令
```js
    "package": "vue-cli-service build --target lib ./src/package/index.js --name drag-window-dz --dest drag-window-dz"
```
    跟着命令新建对应文件，index编写导出代码
```js
import component from './component';
//引入自执行的js文件
import "./js";


const component = [component];
const install = function (Vue) {
    component.forEach(item => {
        //此处name为模块的name值
        Vue.component(item.name, item)
    })
}
export default install;
```
#### 3：执行package打包命令


#### 4：进入打包完成的文件 cd ..
    不要直接发布，不要直接发布，不要直接发布，发布和git的原理差不多，直接发布会将整个文件上传，必须进入生成的文件再发布和生成package
#### 5：初始化项目，并更改对应版本号
    主要是为了生成package.js文件，跟着命令走就行

```js
    npm init
```
#### 6：登录并发布到npm
    此处注意问题：需注册账号，注意账号名称，密码输入不会显示字符，提交版本大于当前npm库存在的版本

```js
npm login
npm publish
```
其他问题：1：图片引用问题（未解决）
          2：如果你npm i 使用的是淘宝镜像，新发布的版本无法直接获取，需要去https://npm.taobao.org/package/{projectName} 进行实时同步，大概一分钟后更新就行了