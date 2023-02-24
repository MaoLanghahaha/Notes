### vue-element-template项目摸索
修饰符
: .sync:子组件更新父组件传递的数据，同步更新父组件中的原始数据值
过滤器
: ```vue
  {{message | reverse | uppercase}}
  Vue.filter('reverse', function (value) {
      return value.split('').reverse().join('')
  })
  ```