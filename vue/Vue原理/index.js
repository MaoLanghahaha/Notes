// 触发视图更新
function updateView() {
  console.log('视图更新')
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype
const newArrayProperty = Object.create(oldArrayProperty); // 创建新对象，原型指向oldArrayProperty，再扩展新的方法不会影响原型
['push'].forEach(methodName => {
  newArrayProperty[methodName] = function() {
    updateView()
    oldArrayProperty[methodName].call(this, ...arguments)
  }
});

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
  observer(value) // 深度监听
  Object.defineProperty(target, key, { // Object.defineProperty不具备监听数组的能力
    get: function(){
      return value
    },
    set:function(newValue){
      observer(newValue) // 深度监听
      value = newValue
      updateView()
    }
  })
}

// 监听对象属性
function observer(target) {
  if(typeof target !== 'object' || target === null) { // 不是对象或数组
    return target
  }

  // 拦截数组
  if(Array.isArray(target)) {
    target.__proto__ = newArrayProperty
  }

  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}

const data = {
  name: 'zhangsan',
  age: '18',
  info: {
    address:'北京'
  },
  nums:[1,2,3]
}
observer(data)
data.name = 'lisi'