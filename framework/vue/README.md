## vue.js

> Vue.js 是一个用来开发 web 界面的前端库。

* 响应式编程

  受现代 JavaScript 的限制 (以及废弃 Object.observe)，Vue 不能检测到对象属性的添加或删除。可以创建一个新的对象，让它包含原对象的属性和新的属性。

  ```js
  // 代替 
  Object.assign(this.someObject, { a: 1, b: 2 })

  this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
  ```

* 双向绑定

  value的单向绑定（数据劫持 + 发布订阅） + onChange 事件侦听。当你把一个普通的 JavaScript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter，在数据变动时发布消息给订阅者，触发相应的监听回调。

  Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。

  ```js
  var vm = new Vue({
    el: '#example',
    data: {
      message: '123'
    }
  });
  vm.message = 'new message'; // 更改数据
  vm.$el.textContent === 'new message';   // false
  Vue.nextTick(function () {
    vm.$el.textContent === 'new message';  // true
  });
  ```

* 生命周期

  beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed

  创建 -> 挂载 -> 更新 -> 销毁

  [vue生命周期](../images/lifecycle.jpg)

* 运行过程

  - 编译器将字符串模板（template）编译为渲染函数（render），称之为编译过程
  
  - 运行时实际调用编译的渲染函数，称之为运行过程。