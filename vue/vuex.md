### 一、Vuex是什么？
> 1、官方：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

> 2、白话：试想一下，如果在一个项目开发中频繁的使用组件传参的方式来同步data中的值，一旦项目变得很庞大，管理和维护这些值将是相当棘手的工作。为此，Vue为这些被多个组件频繁使用的值提供了一个统一管理的工具——VueX。在具有VueX的Vue项目中，我们只需要把这些值定义在VueX中，即可在整个Vue项目的组件中使用。

> 3、本质：把组件的共享状态抽取出来，以一个全局单例模式管理

### 二、Vuex工作流程：
![alt](https://v3.vuex.vuejs.org/vuex.png "Vuex工作流程")
补充：
1、Vue Components -----Commit------>Mutations
2、不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具（Devtools）帮助我们更好地了解我们的应用。

### 三、Vuex教程
https://v3.vuex.vuejs.org/zh/guide/

### actions和mutations
区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用==devtools 追踪状态变化==。

事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutation 就行。异步竞态怎么处理那是用户自己的事情。

vuex 真正限制你的只有 mutation 必须是同步的这一点（在 redux 里面就好像 reducer 必须同步返回下一个状态一样）。同步的意义在于这样每一个 mutation 执行完成后都可以对应到一个新的状态（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。如果你开着 devtool 调用一个异步的 action，你可以清楚地看到它所调用的 mutation 是何时被记录下来的，并且可以立刻查看它们对应的状态。

亲测：如果在mutation中做了异步操作，在dev-tools中会立即打印一个snapshot，而此时异步操作还没有执行完，此时的snapshot的信息是错误的。

而在action中做异步操作dev-tools会等等异步操作执行完才去打印mutation的一个snapshot,这样便于我们回查time-travel,查看在某个mutation里的变化。