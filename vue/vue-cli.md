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