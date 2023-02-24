#### ref属性
```html
// ref绑定子组件
<home-swiper :banners="banners" ref="swiper" />
this.$refs.swiper // 获取的是一个组件对象
```
```html
// ref绑定普通元素
<div ref="divcon"></div>
this.$refs.divcon // 获取的是一个元素对象
```

#### 样式作用域
```html
<style scoped> // 当前组件内有效
```

#### .native修饰符
> 监听组件的原生事件，必须给对应事件添加修饰符.native
```html
<back-top @click.native="backClick" />
<back-top @load.native="backLoad" />
```

#### 事件总线
> 跨层级组件通讯(事件总线/Vuex)
```javascript
// main.js
Vue.prototype.$bus = new Vue();

// 发送事件
this.$bus.$emit("itemImageLoad", params);
// 监听事件
this.$bus.$on("itemImageLoad", (params) => {
  console.log(params);
})
```

#### 防抖和节流
> 防抖函数：触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间；每次触发事件时都取消之前的延时调用方法（应用场景：用户实时搜索）
```javascript
// 涉及到闭包， timer有引用不会被垃圾回收机制回收
methods: {
  debounce (fn, delay) {
    let timer = null;
    return function (...args) { // 可变参数 (param1,param2,param3.....) == (...args)
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}

mounted () {
  const refresh = this.debounce(this.$refs.scroll.refresh, 500);
  this.$bus.$on("itemImageLoad", () => {
    refresh();
  })
},
```
> 节流函数：高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。每次触发事件时都判断当前是否有等待执行的延
时函数。

#### $el
```javascript
this.$refs.tabControl.$el.offsetTop; // 获取组件DOM元素
```

#### keep-alive和actived、deactivated
> <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。
当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。通过描述我们知道，它会缓存不活动的组件，而不是销毁。这样组件之间的切换就能保存上个组件的状态，而不是切换之后又得重新操作。
```javascript
// 排除某个组件，使其不被缓存
<keep-alive exclude="Detail">
  <router-view />
</keep-alive>
```

#### vue中使用go()和back()两种返回上一页的区别
    this.$router.go(-1); // 后退加刷新   this.$router.back(-1); // 后退不刷新

#### 判断obj是否为空对象
    Object.keys(obj).length !== 0