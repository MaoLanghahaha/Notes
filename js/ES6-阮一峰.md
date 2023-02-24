### ECMAScript6简介

#### 一、ECMAScript与Javascript的关系
ECMAScript（规定了浏览器脚本语言的标准）是JavaScript的规格，JavaScript是ECMAScript的一种实现

#### 二、ES6与ES2015的关系
2011 年，ECMAScript 5.1 版发布后，就开始制定 6.0 版了。因此，ES6 这个词的原意，就是指 JavaScript 语言的下一个版本。后来标准委员会决定将ECMAScript的升级作为一个常规流程，即打算每年的6 月份正式发布一个版本，并以发布的年份作为标准的命名。
>2015 年 6 月，ES6的第一个版本（ES6.0）发布了，正式名称就是《ECMAScript 2015 标准》（简称 ES2015）
2016 年 6 月，小幅修订的《ECMAScript 2016 标准》（简称 ES2016）如期发布，这个版本可以看作是 ES6.1 版
根据计划，2017 年 6 月发布 ES2017 标准。

所以ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。
ES6浏览器支持查询：https://kangax.github.io/compat-table/es6/

==Node.js== 是 JavaScript 的服务器运行环境（runtime）
==Babel== 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。
```javascript
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});
```
==安装 Babel==  $ npm install --save-dev @babel/core

### let 和 const 命令
* 基本用法
let声明的变量只在let命令所在的代码块内有效，var命令声明的变量在全局范围内都有效(只有在函数范围内var声明的变量才有作用域)
```javascript
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1
```
* 不存在变量提升
var命令会发生“变量提升”现象，即变量可以在声明之前使用，值为undefined。
为了纠正这种现象，let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。
```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```
* 暂时性死区
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError (未捕获引用错误：在初始化之前无法访问“tmp”)
  let tmp;
}
if (true) {
  tmp = 'abc'; 
  let tmp111;
}
```