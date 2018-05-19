## React

  > 一个组件的渲染函数就是一个基于 state 和 props 的纯函数，state 是自己的，props 是外面来的，任何东西变了就重新渲染一遍.

* 状态管理框架

  - [redux](./redux)

    Redux 是为 Javascript 应用而生的可预估的状态容器。应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。惟一改变 state 的办法是触发 action。

  - [react-redux](./redux/react-redux) React专用状态管理库

  - [Mobx](./Mobx)

  - [falcor](./falcor)

* [React route](./router)

* [初试React route 4](./router/router4)

* [经验总结](./Note)

* [React UI](./antd)


## 钩子函数 vs 回调函数

  回调函数是编程语言实现层面上的事件通知功能，可以理解为系统在符合你设定的条件时自动调用。回调函数其实就是调用者把回调函数的函数指针传递给调用函数，当调用函数执行完毕时，通过函数指针来调用回调函数。
  
  钩子函数并不是编程语言实现层面上的事件通知功能，钩子的概念源于Windows的消息处理机制，通过设置钩子，应用程序可以对所有的消息事件进行拦截，然后执行钩子函数，对消息进行想要的处理方式。

  ```js
  let btn = document.getElementById("btn");
  btn.onclick = () => {   // 给btn设置点击的钩子函数
    console.log("I'm a hook");
    console.log(this.onclick);  // func
  }

  // 给btn绑定了一个监听器, 消息捕获的过程不能参与，而在捕获执行完毕的时候，回调函数才会执行
  btn.addEventListener("click",() => {  
    console.log(this.onclick);  // undefined
  });
  ```

  为了捕获消息而生的，但是钩子函数在捕获消息的第一时间就会执行，而回调函数是在整个捕获过程结束时，最后一个被执行的。回调函数其实就是调用者把回调函数的函数指针传递给调用函数，当调用函数执行完毕时，通过函数指针来调用回调函数。