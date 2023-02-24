#### 1、块级作用域
ES5只有全局作用域和函数作用域，没有块级作用域，导致错误应用场景：

场景1：内层变量可能会覆盖外层变量
:  ```javascript
    var tmp = new Date()
    function fn() {
      console.log(tmp)
      if (false) {
        var tmp = 'hello world'
      }
    }
    fn() // undefined 
  ````
  内层tmp==变量提升==[^变量提升]，覆盖了外层tmp变量
  更多见《小知识点（理论）.md》 —— 2、ES5变量提升

场景2: 用来计数的循环变量泄露为全局变量。
: ````js
  var s = 'hello';
  for (var i = 0; i < s.length; i++) {
    console.log(s[i]);
  }
  console.log(i); // 5
  ````
  变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

ES6块级作用域
{ } - 每一层都是一个单独的作用域，块级作用域的出现，实际上使得获得广泛应用的 ==匿名立即执行函数表达式（匿名 IIFE）== [^匿名IIFE]不再必要了。
````js
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
````




[^变量提升]: 变量提升到它所在作用域的顶端去执行，到我们代码所在的位置来赋值
[^匿名IIFE]: IIFE: Immediately Invoked Function Expression，意为立即调用的函数表达式，也就是说，声明函数的同时立即调用这个函数。