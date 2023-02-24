> 导语：无论使用何种第三方框架，都要对第三方框架进行模块封装，面向封装的模块进行开发。不直接使用第三方框架的原因是因为，第三方框架某时可能不再维护或出现严重BUG、漏洞，如果项目中过多的依赖第三方框架，此时再想去切换框架是一件非常困难的事情。
### 一、网络请求介绍

#### 1、网络请求的选择
* 1、传统的Ajax（基于XMLHttpRequest(XHR)）
* 2、jQuery-Ajax
* 3、axios
* 4、jsonp (跨域)

#### 2、Axios的特点
* 在浏览器中发送XMLHttpRequest请求
* 在nodejs中发送http请求
* 支持Promise API
* 拦截请求和响应
* 转换请求和响应数据
* 等等

### 二、Axios
#### 1、请求方式
* axios(config) // 默认get请求
* axios.request(config)
* axios.get(url[,config])
* axios.delete(url[,config])
* axios.head(url[,config])
* axios.post(url[,data[,config]])
* axios.put(url[,data[,config]])
* axios.patch(url[,data[,config]])

#### 2、基本使用 (全局的axios进行请求及全局配置)
```javascript
// axios基本使用方式
axios({
  url: 'http://152.136.185.210:7878/api/hy66/home/data',
  method: 'GET',
  params: { // 针对get请求的参数拼接
    type: "sell",
    page: 1
  }
}).then((res) => {
  console.log(res);
})
```
```javascript
// axios并发请求
axios.all([axios({
  url: 'http://152.136.185.210:7878/api/hy66/home/multidata'
}), axios({
  url: 'http://152.136.185.210:7878/api/hy66/home/data',
  params: { // 针对get请求的参数拼接
    type: "sell",
    page: 1
  }
})]).then(axios.spread((res1, res2) => {
  console.log("res1", res1);
  console.log("res2", res2);
}))
// 或者
.then(([res1,res2])=>{ // 数组的解构
  console.log("res1", res1);
  console.log("res2", res2);
})

// 对象的解构
const person = {
  name:"zhangsan",
  age:18
}
const {name,age} = person;
console.log(name);
console.log(age);

// 数组的解构
const person = ["value1","value2"];
const [value1,value2] = person;
console.log(value1);
console.log(value2);
```

#### 3、全局配置
```javascript
axios.defaults.baseURL = 'http://152.136.185.210:7878/api/hy66';
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

#### 4、axios实例 (适用于实际开发)
```javascript
// 可能出现不同接口有不同全局配置的情况
const axios_instance = axios.create({
  baseURL: 'http://152.136.185.210:7878/api/hy66',
  timeout: 5000
})
axios_instance({
  url: '/home/multidata'
}).then((res) => {
  console.log(res);
})

const axios_instance2 = axios.create({
  baseURL: 'http://152.136.185.210:7878/apiiiii/hy67',
  timeout: 1000
})
axios_instance2({
  url: '/category/multidata2'
}).then((res) => {
  console.log(res);
})
```
#### 5、网络模块封装
> 面向封装模块开发，而不是面向第三方框架

* src
  * network
    * request.js
    * home.js
    * category.js
    * ...

```javascript
// request.js
import axios from "axios";
export function request (config) {
// 1、创建实例
const axios_instance = axios.create({
  baseURL: 'http://152.136.185.210:7878/api/hy66',
  timeout: 5000
})
// 2、配置request拦截器
axios_instance.interceptors.request.use(config => {
  // 1、config中的一些信息不符合服务器要求，需做一些转换
  // 2、发送网络请求时显示加载动画
  // 3、某些请求，例如用户登录必须携带Token，在此可做拦截判断
  console.log(config);
  return config;
}, err => {
  console.log("request err", err);
  return Promise.reject(err);
})
// 3、配置response拦截器
axios_instance.interceptors.response.use(res => {
  // 1、处理返回结果，过滤掉不需要的数据
  // 2、关闭加载动画
  console.log(res.data);
  return res.data;
}, err => {
  console.log(err);
  return Promise.reject("response err", err);
})
// 4、返回axios实例（axios实例是一个Promise）
return axios_instance(config);
}
```
```javascript
// home.js
import { request } from "./request";
// 一个接口多处调用，当需要修改某个接口时，可以统一修改
export function getHomeMultidata() {
  return request({
    url:'/home/multidata',
  })
}
```
```javascript
// Home.vue
getHomeMultidata () { // 多一层封装，提高复用性
  getHomeMultidata().then(res => {
    this.banners = res.data.banner.list;
    this.recommends = res.data.recommend.list;
  }).catch(err => { console.log(err); })
},
```
