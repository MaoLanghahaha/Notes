<!--
 * @Descripttion: 
 * @Author: maolang@invt.com.cn
 * @Date: 2022-04-18
 * @LastEditors: maolang@invt.com.cn
 * @LastEditTime: 2022-07-07
-->
**目录**
[toc]
### 一、项目开发
#### 1.1 项目结构
示例如下，具体见实际项目
![alt 这是一个图片](../img/vue-cli3.x项目目录结构.png "vue-cli3.x项目目录结构")
#### 1.2 项目启动运行
VScode【ctrl + `】 打开终端，在package.json文件所在目录下，按顺序运行如下命令
* 【npm install】
* 【npm run serve】

#### 1.3 项目模块
##### 1.3.1 网络请求模块 (Axios)
1、简介：
  : Axios 是一个基于 promise 网络请求库，作用于node.js 和浏览器中。
  : 官方文档：https://www.axios-http.cn/docs/intro

2、简单请求：
  : > 将相关的网络请求写在一个文件中进行集中管理，例如用户相关-user.js、登录相关-login.js等。
  
    模块目录结构：
    ````markdown
    |---src
        |---api
            |---user.js
            |---login.js
            |---xxx.js
    ````

  : ````js
      // eg: 编写login.js
      import { axios } from '@/utils/request' // 【注解1】request.js

      const api = {
        login: '/auth/login',
        service: '/service',
        logout: '/auth/logout',
        userInfo: '/user/info'
      }

      // 登录
      export function login (parameter) {
        return axios({                       // 【注解2】axios API
          url: api.login,
          method: 'post',
          data: parameter                    // 【注解3】get、post请求传参
        })
      }

      // 获取服务列表
      export function getServiceList (parameter) {
        return axios({
          url: api.service,
          method: 'get',
          params: parameter                 // 【注解3】get、post请求传参
        })
      }

      // 获取用户信息
      export function getInfo () {
        return axios({
          url: api.userInfo,
          method: 'get',
        })
      }

      // 登出
      export function logout () {
        return axios({
          url: api.logout,
          method: 'post',
        })
      }
    ````
    解析
      : 【注解1】request.js：axios封装文件，封装默认配置、拦截器、提供axios实例等。
      【注解2】axios API：向 axios 传递相关配置来创建请求
        * axios(config)  : 详细请求配置见： https://www.axios-http.cn/docs/req_config
        * axios(url[, config])
          ````js
            // 发起一个 GET 请求 (默认请求方式)
            axios('/user/12345');
          ````
        * 请求方式别名：为了方便起见，已经为所有支持的请求方法提供了别名。
          ````js
            axios.request(config)
            axios.get(url[, config])
            axios.delete(url[, config])
            axios.head(url[, config])
            axios.options(url[, config])
            axios.post(url[, data[, config]])
            axios.put(url[, data[, config]])
            axios.patch(url[, data[, config]])
          ````
        * 【注解3】get、post请求传参：get请求传参使用params、post请求传参使用data。

      ````js
        // eg: 应用login.js
        // 在xxx.js或xxx.vue中
        import { login, getInfo, logout } from '@/api/login'

        const userInfo = {
          username: 'zhangsan',
          password: '123456'
        }
        
        login(userInfo).then(function (response) {
          // 处理成功情况
          console.log(response);
        })
        .catch(function (error) {            // 【注解1】错误处理
          // 处理错误情况
          console.log(error);
        })
        .then(function () {
          // 总是会执行
        });
      ````
      解析
      : 【注解1】错误处理
        ````js
          login(userInfo).then(res => {
            
          }).catch(err => {
            if (error.response) {
              // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // 请求已经成功发起，但没有收到响应
              // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
              // 而在node.js中是 http.ClientRequest 的实例
              console.log(error.request);
            } else {
              // 发送请求时出了点问题
              console.log('Error', error.message);
            }
            console.log(error.config);
          })
        ````
3、并发请求
  : ````js
      import { login, getInfo } from '@/api/login'

      // 写法一：
      Promise.all([login(), getInfo()])
      // 或者
      .then(function (results) { 
          const res1 = results[0];
          const res2 = results[1];
      });
      // 或者
      .then(([res1,res2])=>{ // 数组的解构
        console.log("res1", res1);
        console.log("res2", res2);
      });
      // 或者
      .then(axios.spread((res1, res2) => { // axios.spread
        console.log("res1", res1);
        console.log("res2", res2);
      }))

      // 写法二：
      axios.all([login(), getInfo()])
      // 或者
      .then(function (results) { 
          const res1 = results[0];
          const res2 = results[1];
      });
      // 或者
      .then(([res1,res2])=>{ // 数组的解构
        console.log("res1", res1);
        console.log("res2", res2);
      });
      // 或者
      .then(axios.spread((res1, res2) => { // axios.spread
        console.log("res1", res1);
        console.log("res2", res2);
      }))
    ````
4、其他
  : 链接: [axios](./axios.md)

##### 1.3.2 状态管理模块 (Vuex)
1、简介：
  : 官方：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
  
  : 白话：试想一下，如果在一个项目开发中频繁的使用组件传参的方式来同步data中的值，一旦项目变得很庞大，管理和维护这些值将是相当棘手的工作。为此，Vue为这些被多个组件频繁使用的值提供了一个统一管理的工具——Vuex。在具有Vuex的Vue项目中，我们只需要把这些值定义在Vuex中，即可在整个Vue项目的组件中使用。

  : 本质：把组件的共享状态抽取出来，以一个全局单例模式管理

  : 官方文档：https://v3.vuex.vuejs.org/zh/guide/
  
2、简单使用：
  : > 将相关的状态写在一个文件中进行集中管理，例如用户相关-user.js、登录相关-login.js等。

    模块目录结构：
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
          newName (state) {
            return state.user.name + " 后缀 ",
          },
          newName2: (state) => (suffix) => {
            return state.user.name + suffix,
          }
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
3、工作流程
  : ![alt](https://v3.vuex.vuejs.org/vuex.png "Vuex工作流程")
    

##### 1.3.3 路由管理模块
##### 1.3.4 组件开发及使用
组件化开发与传统开发对比

代码组织形式
  :  传统html开发一个表格
    ```html
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Table</title>
          <style> .userTable { margin: 0; } </style>
        </head>
        <body>
          <table class="userTable">
            <th>
              <td>序号</td>
              <td>姓名</td>
              <td>年龄</td>
            </th>
          </table>
          <script>
            // js渲染数据
            var userData = .....
            for(var i = 0; i< userData.length; i++) {
              $('.userTable').append('<tr><td>'+ i + '</td><td>'+ userData[i].name +'</td><td>'+ userData[i].age +'</td></tr>')
            }
            
          </script>
        </body>
        </html>
    ```
  : vue组件化开发一个表格
    ```html
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
        data () {
          return {
            userData: ....
          }
        }
      }
      </script>
      <style scoped>
        .title { margin: 0; }
      </style>
    ```

可复用性：
  : 传统html开发的表格：复制整个表格的dom、css、js根据需要进行修改
    vue组件化开发的表格：导出、导入组件进行使用 ==涉及父子组件传参==
    ```html
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
        props: {
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

    ```html
      <template>
        <my-table :userData="userData2"/>
      </template>
      <script>
      import { MyTable } from 'MyTable.vue'
      export default {
        name: 'App',
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
高内聚性：
  ：传统

传统开发模式的弊端
1、css





传统开发
  : 一个传统的html页面构成，如果想在另一个页面同样
  ![](./img/传统html页面.png)




1、单位件组件
: ![](https://cn.vuejs.org/images/components.png)
一个页面由多个组件组成，页面本质上也是一个组件
: ![](https://cn.vuejs.org/images/vue-component.png)

: ```html
    <!-- html元素 -->
    <template></template>

    <!-- js脚本 -->
    <script></script>

    <!-- css样式 -->
    <style></style>
  ```

