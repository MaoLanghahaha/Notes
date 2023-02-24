### 一、起步

安装npm
安装vue
安装vue-cli
安装git
#### 1. vue-cli
##### 1.1 什么是CLI
命令行界面（CLI-command-line interface），又称字符用户界面（CUI）
##### 1.2 什么是vue-cli
Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统。
##### 1.3 优势
* 通过 @vue/cli 实现的交互式的项目脚手架。 （通过执行命令方式下载相关依赖，例如bootstrap、jQuery）
* 通过 @vue/cli + @vue/cli-service-global 实现的零配置原型开发。（项目创建伊始就涵盖vuejs vue-router babel等。（类似于Springboot的快速初始化））
* 一个运行时依赖 (@vue/cli-service)，该依赖：
  * 可升级；（一条命令升级依赖）
  * 基于 webpack 构建，并带有合理的默认配置；（项目打包方式，类似于maven中的jar或bar包打包的插件，编译好的项目源码===>部署到服务器上直接使用）
  * 可以通过项目内的配置文件进行配置；（通过修改提供的默认的配置文件达到自己想要的项目环境）
  * 可以通过插件进行扩展。 （v-charts、element-ui）
* 一个丰富的官方插件集合，集成了前端生态中最好的工具。 nodejs(tomcat) vue vue-router webpack yarn
* 一套完全图形化的创建和管理 Vue.js 项目的用户界面。
#### 2. vue-cli安装
##### 2.1 环境准备
nodejs：vue-cli将前端做成一个完整的系统，需起一个服务的方式去运行，所以需要nodejs，而管理依赖的过程中则使用nodejs中的npm（类似于maven，只不过npm必须要node的环境），其次项目最终的部署需要nodejs

````Markdown
# 1.下载nodejs
# 2.配置nodejs环境变量
    NOOD_HOME = nodejs安装目录
    PATH = xxx;%NODE_HOME%/bin
    PATH = xxx;%NODE_HOME% （新版本）
    [最终执行node.exe]
# 3.验证nodejs环境是否成功
    node -v
# 4.npm介绍
    node package manager nodejs包管理工具
    随着发展，npm不仅仅只是nodejs包管理工具，可以对目前前端主流的所有技术进行管理
    maven 管理java后端依赖 远程仓库（中心仓库） 建议配置阿里云镜像
    npm   管理前端系统依赖 远程仓库（中心仓库） 建议配置淘宝镜像
# 5.配置淘宝镜像
    npm config set registry http://registry.npm.taobao.org
    npm config get registry
# 6.配置npm下载依赖位置(本地仓库)
    npm config set cache "nodejs安装目录\node_cache"
    npm config set prefix "nodejs安装目录\node_global"
    配置环境变量 PATH = xxx;%NODE_HOME%/node_global
# 7.验证npm下载依赖位置(本地仓库)
    npm config ls
    * 配置后：
      ; cli configs
      metrics-registry = "https://registry.npmjs.org/"
      ; userconfig C:\Users\Administrator\.npmrc
      cache = "D:\\Program Files\\nodejs\\node_cache"
      prefix = "D:\\Program Files\\nodejs\\node_global"
      ; node bin location = D:\Program Files\nodejs\node.exe
      ; cwd = C:\Users\Administrator
      ; HOME = C:\Users\Administrator
      ; "npm config ls -l" to show all defaults.
````
##### 2.2 安装vue-cli
````markdown
# 卸载cli
    npm uninstall -g @vue/cli  // 卸载3.x及以上版本的脚手架
    npm uninstall -g vue-cli  // 卸载2.x版本的脚手架
# 安装cli
    npm install -g vue-cli // 2.x
    npm install -g @vue/cli // 3.x及以上
````
##### 2.3 使用vue-cli2
````markdown
# 创建项目
vue init webpack 项目名称
# 目录结构
项目名称
  -bulid --> 用来使用webpack打包使用bulid依赖
  -config --> 用来做项目配置
# 运行项目
在项目根目录中执行
npm start
# 开发方式
一切皆组件 一个组件对应js代码、html代码、css代码
组件.vue 打包编译后为html（类似于.java .class）
````
##### 2.4 vue-cli打包部署
vue打包的项目必须在服务器上运行，不能直接双击运行
````markdown
# 打包
npm run build
# 部署
1. 将打包好的dist文件夹放到springboot项目中的static文件夹下，修改index.html的文件引用路径
2. 使用Nginx
3. 使用express
4. 等等
````

### 二、項目初始化

#### 1、目录结构划分

主要是对src的划分

* public -- 此文件夹下的文件，打包后会原封不动（但会丑化压缩）的复制到dist文件夹下
* src
  * common -- 公共js文件
    * const.js -- 公共常量
    * utils.js -- 公共工具方法
    * minxin.js -- 混入
  * assets -- 静态资源文件夹
    * img -- 图片
    * css -- 样式
  * components -- 组件（公共）
    * common -- 业务无关的公共组件（其他项目可复用）
    * content -- 业务相关的公共组件（当前项目业务相关的公共组件，其他项目不可复用）
  * view -- 视图
  * router -- 路由
  * store -- 状态管理
  * network -- api
  * App.vue
  * main.js

#### 2、统一浏览器初始化css样式

  ##### *normalize.css[^normalize.css]*
  下载复制到src/assets/css下, 新建base.css（当前项目初始化样式配置）,base.css @import normalize.css, App.vue @impot base.css, main.js import App.vue (模块依赖打包需要)

  ##### *初始化base.css*
  统一变量
  ```css
  :root {
    --color-text: #666;
    --color-high-text: #ff5777; /* 文字高亮色 */
    --color-tint: #ff8198; /* 组件背景色 */
    --color-background: #fff;
    --font-size: 14px;
    --line-height: 1.5;
  }
  ```
  样式初始化
  ```css
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Liberation Sans", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, SimSun, "WenQuanYi Zen Hei Sharp", sans-serif;
    font-size: var(--font-size);
    color: var(--color-text);
    background: var(--color-background);
    line-height: var(--line-height);
    user-select: none;
  }
  ```
#### 3、设置项目路径别名、定义项目编码规范

  ##### *创建vue.config.js*[^vue.config.js]文件
  ```javascript
  module.exports = {
    configureWebpack: { // 配置webpack
      resolve: { // 解决路径相关的一些问题
        // extensions:['.js', '.vue', '.json'], // 配置需要省略的文件后缀名，vue-cli3及以上默认的webpack配置（所以不需要再配置）
        alias: {
          // '@':'src' // vue-cli3及以上默认配置
          'assets':'@/assets', // vue-cli2写法：'assets':'src/assets'
          'common':'@/common',
          'components':'@/components',
          'network':'@/network',
          'views':'@/views',
        }
      }
    }
  }
  ```
  ```javacript
  //例子：
  App.vue
  import './assets/css/base.css' => import 'assets/css/base.css'
  ```
  ##### *创建.editorconfig*[^.editorConfig]文件
  ```.editorconfig
  # 告诉EditorConfig插件，这是根文件，不用继续往上查找
  root = true

  # 匹配全部文件
  [*]

  # 结尾换行符，可选"lf"、"cr"、"crlf"
  end_of_line = lf

  # 在文件结尾插入新行
  insert_final_newline = true

  # 删除一行中的前后空格
  trim_trailing_whitespace = true
  
  # 设置字符集
  charset = utf-8

  # 缩进风格，可选"space"、"tab"
  indent_style = space

  # 缩进的空格数
  indent_size = 2
  ```
  ##### *vsCode配置editorconfig*
  * 在当前项目根目录下添加.editorconfig文件
  * 安装EditorConfig扩展，插件市场搜索EditorConfig for vs code 安装
  * 全局安装或局部安装editorconfig依赖包(npm install -g editorconfig | npm install -D editorconfig)
  * 打开需要格式化的文件并手动格式化代码（Mac OS ：shift+option+f | Windows ：shift+alt+f）

  ##### [拓展 ESlint+Prettier+EditorConfig+VScode](https://juejin.cn/post/6844904138661330957)

### 三、项目模块划分
#### 框架组件创建
#### 框架路由搭建



### 将数据整合传递给子组件
> 对于复杂的数据，将其整合成一个对象传递给组件，组件只需面向一个对象进行开发。
```javascript
// network/detail.js
export class GoodInfo { // 定义一个类
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
      this.desc = itemInfo.desc;
      this.newPrice = itemInfo.price;
      this.oldPrice = itemInfo.oldPrice;
      this.realPrice = itemInfo.lowNowPrice;
      this.discount = itemInfo.discountDesc;
      this.columns = columns;
      this.services = services;
  }
}
```


[^normalize.css]:A modern alternative to CSS resets
[^vue.config.js]:vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。
    ```javascript
    // vue.config.js

    /**
     * @type {import('@vue/cli-service').ProjectOptions}
     */
    module.exports = {
      // 选项...
    }
    ```
[^.editorConfig]:editorConfig
    * editorConfig帮助开发人员在不同的编辑器和IDE之间定义和维护一致的编码样式
    * 此文件用来定义项目的编码规范，编辑器的行为会与.editorconfig 文件中定义的一致，并且其优先级比编辑器自身的设置要高，这在多人合作开发项目时十分有用而且必要
    * 编辑器默认支持editorConfig，如webstorm；而有些编辑器则需要安装editorConfig插件，如ATOM、Sublime、VS Code等。当打开一个文件时，EditorConfig插件会在打开文件的目录和其每一级父目录查找.editorconfig文件，直到有一个配置文件root=true
    * EditorConfig的配置文件是从上往下读取的并且最近的EditorConfig配置文件会被最先读取.。匹配EditorConfig配置文件中的配置项会按照读取顺序被应用, 所以最近的配置文件中的配置项拥有优先权。如果.editorconfig文件没有进行某些配置，则使用编辑器默认的设置