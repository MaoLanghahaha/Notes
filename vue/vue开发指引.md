<!--
 * @Descripttion: 
 * @Author: maolang@invt.com.cn
 * @Date: 2022-04-18
 * @LastEditors: maolang@invt.com.cn
 * @LastEditTime: 2022-07-14
-->
**目录**
[toc]
### 一、搭建开发环境
#### 1.1 Nodejs
##### 1.1.1 下载
  * 地址：https://nodejs.org/en/download/
  * LTS：长期维护版
  * Windows 安装包 (.msi)
  * 安装完成检查：【win+R】==> cmd ==> 输入：node -v ==> 输入 npm -v ==> 均出现版本号即成功
##### 1.1.2 环境配置
  * 说明：配置的是npm全局模块安装路径，以及缓存cache的路径。全局安装默认路径：【C:\Users\用户名\AppData\Roaming\npm】
  * 配置：
    * 1、在目标路径【推荐nodejs安装目录】下创建两个文件夹【node_global】及【node_cache】
    * 2、
      * 2.1、方法1：任意位置cmd输入
        ````markdown
          #命令1：
          npm config set prefix "目标路径\node_global"
          #命令2：
          npm config set cache "目标路径\node_cache"
        ````
      * 2.2、方法2：直接修改【C:\Users\用户名\.npmrc】文件
        ````markdown
          prefix=目标路径\node_global
          cache=目标路径\node_cache
        ````
    * 3、“我的电脑”-右键-“属性”-“高级系统设置”-“高级”-“环境变量”
      * 【系统变量】下新建【NODE_PATH】输入【目标路径\node_global\node_modules】
      * 【用户变量】下的【Path】【C:\Users\用户名\AppData\Roaming\npm】修改为【目标路径\node_global】
  * 淘宝镜像：
    * 说明：npm安装模块时都是去国外的镜像下载的，有的时候由于网络原因会导致安装模块失败
    * 配置国内镜像：
      ````markdown
        #获取镜像地址
        npm get registry 

        #设置淘宝镜像 
        npm config set registry http://registry.npm.taobao.org/
      ````
##### 1.1.3 npm
  * 定义：npm (node package manager | 节点的包管理器)，npm是一个软件包管理器，主要进行Javascript的包管理。通过npm，我们可以很方便地进行Javascript包的下载、升级，我们也可以把我们开发的JavaScript包共享给其他使用者。可以简单地把npm当成一个JavaScript语言的==Maven==
  * npm常用命令：
    ````markdown
      #全局安装模块：模块安装在Node.js目录中【如配置了环境，则在上述环境配置的node_global中】
      npm install <Module Name> -g

      #本地安装模块：在当前路径下安装模块，安装后，模块放在当前路径的node_modules子目录中
      npm install <Module Name>

      #npm升级
      npm install npm -g

      #实际项目依赖安装：实际项目中，运行如下命令会读取当前目录中的package.json文件，然后下载其中要求的模块（本地安装）到node_modules子目录中
      npm install

      #移除依赖 
      npm uninstall <Module Name>

      #运行项目：运行命令具体看项目package.json文件的“scripts”属性配置，基本上是serve
      npm run <运行命令>

      #项目打包：打包命令具体看项目package.json文件的“scripts”属性配置，基本上是build
      npm run <打包命令>

      #项目错误检查：检查命令具体看项目package.json文件的“scripts”属性配置，基本上是lint
      npm run <检查命令>
    ````
#### 1.2 开发软件
##### 1.2.1 软件
  > 1、VSCode：开源免费；插件生态友好，个人开发维护数量丰富（下载插件、需进行配置）；
  2、Webstorm：JetBrains系IDE收费（或破解）；开箱即用，大多数插件官方开发维护；AI自动学习的智能提示、自动修复、重构等等一些开发体验友好；使用性能比较吃内存；

  > 本次分享主要针对VSCode进行
  
  * vscode下载地址：https://code.visualstudio.com/
    * Stable 稳定版 （推荐）
    *	Insiders 测试版
##### 1.2.2 vscode插件
  | 序号 | 插件名称 | 插件描述 | 备注 |
  | - | - | - | - |
  | 1 | Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code | 中文（简体）语言包 | 软件重启生效 |
  | 2 | Auto Rename Tag | 同步修改结束标签 | |
  | 3 | Vetur | vue开发工具 | |
  | 4 | Vue tooling for VS Code | 用于生成文件头部注释和函数注释的插件 | |
  | 5 | ESLint | 将 ESLint JavaScript 集成到 VS Code 中 | ESLint：语法规则和代码风格的检查工具 |
  | 6 | EditorConfig for VS Code | 定义项目编码规范 | 配合.editorconfig文件 |

  **插件配置**
  setting.json文件：ctrl + shift + p ==> 输入Open Setting(json)

  ````json
  setting.json：

  {
    // -------------- VSCode --------------
    "editor.tabSize": 2, // 缩进2个空格
    "editor.tabCompletion": "on", // 启用 Tab 补全
    "editor.quickSuggestions": {
        "strings": true
    },
    "files.autoSave": "afterDelay", // 自动保存延迟
    "files.autoSaveDelay": 1500, // 延迟时间
    "explorer.confirmDelete": true, // 文件删除时确认
    "explorer.confirmDragAndDrop": false // 文件拖拽或移动时确认

    // 让函数(名)和后面的括号之间加个空格
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    // 启用或禁用在 VS Code 中重命名或移动文件时自动更新导入路径的功能。always:始终自动更新路径
    "javascript.updateImportsOnFileMove.enabled": "always",

    // -------------- Vue tooling for VS Code ---------------
    // 自动注释-注释规范配置-doc:https://github.com/OBKoro1/koro1FileHeader/wiki/
    // 头部注释 window: ctrl+win+i / ctrl+alt+i
    "fileheader.customMade": {
        // 插件会自动将光标移动到Description选项中 方便输入 Description字段可以在specialOptions更改
        "Descripttion":"", // 介绍文件的作用、文件的入参、出参。
        "Author":"maolang@invt.com.cn", // 创建文件的作者
        "Date":"Do not edit", // 文件创建时间(不变)
        "LastEditors":"maolang@invt.com.cn", // 文件最后编辑者
        // 由于编辑文件就会变更最后编辑时间，多人协作中合并的时候会导致merge
        // 可以将时间颗粒度改为周、或者月，这样冲突就减少很多。搜索变更时间格式: dateFormat
        "LastEditTime":"Do not Edit" // 文件最后编辑时间 
    },
    // 函数注释 window：ctrl+win+t / ctrl+alt+t   alt+y快速移到下行末尾
    "fileheader.cursorMode": {
        "description":"", // 函数注释生成之后，光标移动到这里
        "param":"", // param 开启函数参数自动提取 需要将光标放在函数行或者函数上方的空白行
        "return":"" 
    },
    // 全局配置
    "fileheader.configObj": {
        "autoAdd": false, // 检测文件没有头部注释，自动添加文件头部注释
        "dateFormat": "YYYY-MM-DD",
    }

    // -------------- ESLint --------------
    // 每次保存的时候自动格式化 vscode自带格式化与eslint规范不兼容 所以关闭
    "editor.formatOnSave": false,
    // 每次保存的时候将代码按eslint格式进行修复
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html",
        "vue"
    ],

    // -------------- Vetur -----------------
    "vetur.validation.template": false// 防止 vetur 报错
  }
  ````
#### 1.3 浏览器插件
##### 1.3.1 插件
| 序号 | 插件名称 | 插件描述 | 备注 |
| - | - | - | - |
| 1 | Vue.js devtools | vue开发工具 | 下载地址：https://chrome.zzzmh.cn/info?token=nhdogjmejiglipccpnnnanhbledajbpd |
##### 1.3.2 安装
浏览器插件安装教程：https://blog.csdn.net/zhoujiajia123/article/details/115206091
安装成功，重启浏览器
##### 1.3.3 查看
【F12】打开浏览器控制台-->切换到Vue

### 二、手把手写代码

#### 2.1 写组件 https://cn.vuejs.org/v2/guide/index.html
##### 2.1.1 目录结构
![](./img/src.png)

##### 2.1.2 组件分类
1、通用组件(部件组件)：可复用、需要自己挂载使用的组件，放在 components 目录。
开发一个通用组件，将组件相关的代码放在以组件名称命名的文件夹下(使用大驼峰命名法)。
![](./img/components.png)
2、路由组件(页面组件)：: 由路由器规则匹配的组件，放在 views 目录。
页面组件目录结构通常由系统主导航决定。
![](./img/views-ui.png) ![](./img/views-ml.png)
当页面组件间共享一些组件时，可创建子组件文件夹
![](./img/list-ui.png) ![](./img/list.png)

【注意】：通用组件是针对于整个项目，即无论哪个页面组件均可以使用，与具体业务无关。

##### 2.1.3 简单编写
```html
  <!-- html元素 -->
  <template></template>

  <!-- js脚本 -->
  <script></script>

  <!-- css样式 -->
  <style scoped></style>

```
开发一个通用表格组件
```html
// MyTable.vue
  <template>
    <table class="userTable">
      <th>
        <td>序号</td>
        <td>姓名</td>
        <td>年龄</td>
      </th>
      <tr v-for="(item, index) in userData" :key="index">
        <td>{{index}}</td>
        <td>{{item.name}}</td>
        <td>{{item.age}}</td>
      </tr>
    </table>
  </template>
  <script>
  export default {
    name: 'MyTable',
    props: { // 父子组件通讯 https://cn.vuejs.org/v2/guide/components-props.html
      userData: {
        type: Array,
        default: []
      }
    }
    data () {
      return {
      }
    }
  }
  </script>
  <style scoped>
    .title { margin: 0; }
  </style>
```
使用通用表格组件
```html
// OtherComponent.vue
  <template>
    <my-table :userData="userData2"/> <!-- 短横线 -->
  </template>
  <script>
  import { MyTable } from '@/components/MyTable'
  export default {
    name: 'OtherComponent', // 大驼峰
    data () {
      return {
        userData2:...
      }
    },
    components: {
      MyTable
    }
  }
  </script>
  <style scoped>
    .title { margin: 0; }
  </style>
```
【注意】：组件名称命名使用大驼峰，组件使用时使用短横线命名

#### 2.2 写路由 https://router.vuejs.org/zh/introduction.html
##### 2.2.1 目录结构
在对应路由文件中写对应路由
![](./img/router.png) ![](./img/router2.png)
##### 2.1.2 布局组件介绍
![](./img/layouts.png) 
开发时常用：
* 1、RouteView.vue 无页头
![](./img/routeView.png) 
* 2、PageView.vue 有页头
![](./img/pageView.png) 
##### 2.1.3 简单编写
![](./img/dashboard.png) 
```js
// dashboard.js
// 第一步：导入上述布局组件
import { RouteView } from '@/layouts'

// 第二步：定义并导出路由
export default {
  path: 'dashboard', // 路由路径 path: 'dashboard' 相对路径(接在上一级路由后。最高级http://localhost:8000/)  path: '/dashboard' 绝对路径 (接在http://localhost:8000/后)
  name: 'dashboard', // 路由名称
  redirect: '/dashboard/workplace', // 路由重定向 （在这里是重定向到子路由workplace）
  component: RouteView, // 此路由要展示的组件（父路由一般展示布局组件）
  meta: { title: '仪表盘', keepAlive: true, icon: 'dashboard', permission: [ 'dashboard' ] }, // 路由携带的一些元数据。例如路由展示在菜单上时的名称（title）、是否缓存路由（keepAlive）、路由展示在菜单上时的图标,图标名称来自ant design vue组件库 简称antdv（icon）、路由权限（permission）等等，具体看（src/router/README.md）
  children: [ // 子路由（嵌套路由）访问时路径如：http://localhost:8000/dashboard/workplace
    {
      path: 'analysis/:pageNo([1-9]\\d*)?',
      name: 'Analysis',
      component: () => import('@/views/dashboard/Analysis'), // 路由懒加载，提高组件加载效率
      meta: { title: '分析页', keepAlive: false, permission: [ 'dashboard' ] }
    },
    {
      path: 'https://www.baidu.com/',   // 外部链接
      name: 'Monitor',
      meta: { title: '监控页（外部）', target: '_blank' }
    },
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/Workplace'),
      meta: { title: '工作台', keepAlive: true, permission: [ 'dashboard' ] }
    },
    {
      path: 'test-work',
      name: 'TestWork',
      component: () => import('@/views/dashboard/TestWork'),
      meta: { title: '测试功能', keepAlive: true, permission: [ 'dashboard' ] }
    }
  ]
}
```
```js
  // 第三步：使用路由
  // 方式1：声明式
  <router-link to="/about">Go to About</router-link>

  // 方式2：编程式
  this.$router.push('/dashboard')
  this.$router.push({ name: 'dashboard' })
  this.$router.push({ path: '/dashboard' })
```
##### 2.1.4 路由传参
* params传参
  * 第一种：动态路由匹配（地址栏显示参数）（刷新不丢失）
    * 声明式：
      ```js
        {
          path: '/child/:id',
          component: Child
        }
        <router-link :to="/child/1">跳转到子路由</router-link>
      ```
    * 编程式：
     ```js
        {
          path: '/child/:id',
          component: Child
        }
        this.$router.push('/child/1') // 跳转到子路由
      ```
    * 接收：```this.$route.params.id```
  * 第二种：（地址栏不显示参数）（刷新丢失）
    * 声明式：
      ```js
        {
          path: '/child,
          name: 'Child',
          component: Child
        }
        <router-link :to="{name:'Child',params:{id:1}}">跳转到子路由</router-link>
      ```
    * 编程式：
    ```js
        {
          path: '/child,
          name: 'Child',
          component: Child
        }
        this.$router.push({ 
          name:'Child',
          params:{
            id:1
          }
        })
      ```
    * 接收：```this.$route.params.id```
* query传参（地址栏显示参数）（刷新不丢失）
  * 声明式
    ```js
      {
        path: '/child,
        name: 'Child',
        component: Child
      }
      <router-link :to="{path:'/child',query:{id:1}}">跳转到子路由</router-link> // ../child?id=1
    ```
  * 编程式
    ```js
      {
        path: '/child,
        name: 'Child',
        component: Child
      }
      this.$router.push({ 
        path:'/child',
        query:{
          id:1
        }
      })
    ```
    * 接收：```this.$route.query.id```
#### 2.3 写网络请求 https://axios-http.com/zh/docs/intro
##### 2.3.1 目录结构
将相关的网络请求写在一个文件中进行集中管理，例如用户相关user.js、登录相关login.js等。
````markdown
|---src
    |---api
        |---user.js
        |---login.js
        |---xxx.js
````
##### 2.3.2 简单编写
````js
  // 第一步：导入axios封装文件
  import { axios } from '@/utils/request'

  // 第二步：集中管理接口路径
  const api = {
    login: '/auth/login',
    service: '/service',
    logout: '/auth/logout',
    userInfo: '/user/info'
  }

  export default api

  // 第三步：封装网络请求接口
  export function login (parameter) {
    return axios({
      url: api.login,
      method: 'post',
      data: parameter
    })
  }
````
````js
  // 第四步：导入网络请求接口
  import { login } from '@/api/login'

  const userInfo = {
    username: 'zhangsan',
    password: '123456'
  }
  
  // 第五步：调用网络请求接口
  login(userInfo).then(res => {
    // 处理成功情况
    console.log(res);
  })
  .catch(err => {
    // 处理错误情况
    console.log(err);
  })
  .then(()=>{
    // 总是会执行
  });
````
#### 2.4 写共享状态(共享数据操作) https://vuex.vuejs.org/zh/guide/
> 实现各组件间数据共享

##### 2.4.1 目录结构
```markdown
|---src
    |---store
        |---modules
            |---user.js             #用户状态模块
            |---login.js            #登录状态模块
            |---xxx.js
        |---getters.js              #根级别的 getter
        |---actions.js              #根级别的 action
        |---mutations.js            #根级别的 mutation
        |---mutation-types.js       #mutation常量
        |---index.js                #组装模块并导出 store 的地方
```
##### 2.4.2 简单编写
* 第一步：在user.js中的state中添加目标状态，例如name
* 第二步：在mutation-types.js中添加mutation常量，例如```export const SET_NAME = 'set_name'```
* 第三步：在user.js中导入SET_NAME
  ```import { SET_NAME } from '@/store/mutation-types'```
* 第四步：在user.js中的matutions中添加
  ```js
    [SET_NAME]: (state, name}) => {
      state.name = name
    },
  ```
* 第五步：导入获取用户信息网络请求
  ``` import { getInfo } from '@/api/login'```
* 第六步：若存在异步操作，需在user.js中的actions中添加
  ```js
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.result
          commit('SET_NAME', name: result.name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  ```
* 第七步：使用
  在js文件中
  ```js
    import store from './store'
    store.dispatch('GetInfo')
      .then(res => {
        // ...一些操作
      })
      .catch(() => {
        // ...一些错误处理
      })
  ```
  在vue文件中（组件中）dispatch
  ```js
  methods: {
    xxfunction() {
      this.$store.dispatch('GetInfo')
        .then(res => {
          // ...一些操作
        })
        .catch(() => {
          // ...一些错误处理
        }) 
    }
  }
  ```
  在vue文件中（组件中）commit
  ```js
  import { SET_TOKEN } from '@/store/mutation-types'
  methods: {
    xxfunction() {
     this.$store.commit('SET_TOKEN','xxxxxxx')
    }
  }
  ```
  辅助函数
  ```js
    import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
    computed: {
      ...mapState({
         name: state => state.user.name // user是模块名
      }),
      ...mapGetters(['nickname'])
    },
    methods: {
      ...mapActions(['Logout']),
      ...mapMutations(['GetInfo']),
      xxfunction() {
        this.Logout()
          .then(res => {
            // ...一些操作
            console.log(name)
            console.log(nickname)
          })
          .catch(() => {
            // ...一些错误处理
          })

        this.GetInfo()
          .then(res => {
            // ...一些操作
          })
          .catch(() => {
            // ...一些错误处理
          })
      }
    }
  ```
  完整版：
  ```js
      // user.js
      import Vue from 'vue'
      import { login, getInfo, logout } from '@/api/login'
      import { 
        ACCESS_TOKEN
        SET_TOKEN
        SET_NAME
        SET_AVATAR
        SET_ROLES
        SET_INFO } from '@/store/mutation-types'
      import { welcome } from '@/utils/util'

      const user = {
        namespaced: true,
        state: {
          token: '',
          name: '',
          welcome: '',
          avatar: '',
          roles: [],
          info: {}
        },
        
        getters:{
          nickname: () {
            return state.user.name + " nickname ",
          }
          newName: (state) => (suffix) => {
            return state.user.name + suffix,
          },
        },

        mutations: {
          [SET_TOKEN]: (state, token) => {
            state.token = token
          },
          [SET_NAME]: (state, { name, welcome }) => {
            state.name = name
            state.welcome = welcome
          },
          [SET_AVATAR]: (state, avatar) => {
            state.avatar = avatar
          },
          [SET_ROLES]: (state, roles) => {
            state.roles = roles
          },
          [SET_INFO]: (state, info) => {
            state.info = info
          }
        },

        actions: {
          // 登录
          Login ({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
              login(userInfo).then(response => {
                const result = response.result
                Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
                commit('SET_TOKEN', result.token)
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          },

          // 获取用户信息
          GetInfo ({ commit }) {
            return new Promise((resolve, reject) => {
              getInfo().then(response => {
                const result = response.result

                if (result.role && result.role.permissions.length > 0) {
                  const role = result.role
                  role.permissions = result.role.permissions
                  role.permissions.map(per => {
                    if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                      const action = per.actionEntitySet.map(action => { return action.action })
                      per.actionList = action
                    }
                  })
                  role.permissionList = role.permissions.map(permission => { return permission.permissionId })
                  commit('SET_ROLES', result.role)
                  commit('SET_INFO', result)
                } else {
                  reject(new Error('getInfo: roles must be a non-null array !'))
                }

                commit('SET_NAME', { name: result.name, welcome: welcome() })
                commit('SET_AVATAR', result.avatar)

                resolve(response)
              }).catch(error => {
                reject(error)
              })
            })
          },

          // 登出
          Logout ({ commit, state }) {
            return new Promise((resolve) => {
              logout(state.token).then(() => {
                resolve()
              }).catch(() => {
                resolve()
              }).finally(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                Vue.ls.remove(ACCESS_TOKEN)
              })
            })
          }

        }
      }

      export default user
  ```
##### 2.4.3 传参详解
https://v3.vuex.vuejs.org/zh/guide/state.html
##### 2.4.4 工作流程
![alt](https://v3.vuex.vuejs.org/vuex.png "Vuex工作流程")
补充：
1、Vue Components -----Commit------>Mutations
2、不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具（Devtools）帮助我们更好地了解我们的应用。
3、单一状态管理树要求在开发中尽可能不要重复创建状态
4、同异步区分actions和mutations
  ```
    区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用devtools 追踪状态变化。

    事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutation 就行。异步竞态怎么处理那是用户自己的事情。

    vuex 真正限制你的只有 mutation 必须是同步的这一点（在 redux 里面就好像 reducer 必须同步返回下一个状态一样）。同步的意义在于这样每一个 mutation 执行完成后都可以对应到一个新的状态（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。如果你开着 devtool 调用一个异步的 action，你可以清楚地看到它所调用的 mutation 是何时被记录下来的，并且可以立刻查看它们对应的状态。

    亲测：如果在mutation中做了异步操作，在dev-tools中会立即打印一个snapshot，而此时异步操作还没有执行完，此时的snapshot的信息是错误的。

    而在action中做异步操作dev-tools会等等异步操作执行完才去打印mutation的一个snapshot,这样便于我们回查time-travel,查看在某个mutation里的变化。
  ```

#### 2.5 其他
##### 2.5.1 图标使用
antdv官方图标 
: https://1x.antdv.com/components/icon-cn/#components-icon-demo-use-iconfont.cn
: * 第一步：复制图标代码，使用```<a-icon type="home" />```

阿里巴巴图标库 https://www.iconfont.cn/
: * 第一步：注册账号
: * 第二步：将账号名称发送到<maolang@invt.com.cn>
: * 第三步：成为IWoscene2.0图标项目成员后，将目标图标添加到项目中
: * 第四步：将图标（Font class）下载至本地，替换掉src/assets/fonts/下的文件
: * 第五步：复制图标代码使用，页面中使用：```<icon-font type="icon-jilumian"></icon-font>```。 路由中使用：```meta: { title: '仪表盘', keepAlive: true, icon: 'icon-jilumian'}```

自定义SVG图标(单文件图标)
: * 第一步：在src/assets/icons/下添加svg图标文件（视情况创建文件夹）
: * 第二步：在src/core/icons.js文件中编写如：
  ```js
    import xxx1 from '@/assets/icons/xxx1.svg?inline' 
    import xxx2 from '@/assets/icons/xxx2.svg?inline' 
    ...

    export { xxx1, xxx2, ... }
  ```
  * 第三步：使用
    ```js
      <tempplate>
        <a-icon :component="xxx1" />
      </tempplate>

      <script>
        import { xxx1 } from '@/core/icons'

        export default {
          name: 'XComponent',
          data () {
            return {
              xxx1
            }
          },
      </script>
    ```
##### 2.5.2 ES6（ES2015）
教程：https://www.babeljs.cn/docs/learn
> 一些你看不懂的写法，可以在这里找到答案

##### 2.5.3 常用状态处理
* 空状态 https://1x.antdv.com/components/empty-cn/
* 加载状态 https://1x.antdv.com/components/spin-cn/
* 骨架屏 https://1x.antdv.com/components/skeleton-cn/
注：一些组件自带上述状态，就不需要单独使用。例如卡片组件API-loading，注意使用。

##### 2.5.4 用户确认交互
* 对话框 https://1x.antdv.com/components/modal-cn/
* 气泡确认框 https://1x.antdv.com/components/popconfirm-cn/

### 三、零碎
* 从易用性考虑：增加操作若用户输入内容过多，建议使用页面，不要使用弹框。
* 使用组件时，建议先查看项目模板中是否存在，存在首先使用项目模板中的，原因：项目模板做了进一步封装，例如表格。


