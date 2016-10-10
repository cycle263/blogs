## redux

[redux中文文档](http://cn.redux.js.org/index.html)

* 定义

    > Redux 是为 Javascript 应用而生的可预估的状态容器.应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。惟一改变 state 的办法是触发 action，一个描述发生什么的对象。为了描述 action 如何改变 state 树，你需要编写 reducers。

    ![reducer](./images/reducer.png)

* redux几个概念

    - store: 应用数据的存储中心

    - action: 应用数据的改变的描述

    - reducer: 决定应用数据新状态的函数，接收应用之前的状态和一个 action 返回数据的新状态，reducer作为一个函数，可以根据web应用之前的状态（previousState）和交互行为（通过flux中提到的action来表征），决定web应用的下一状态（newState），从而实现state端的数据更新处理。

    - middleware: redux 提供中间件的方式，完成一些 flux 流程的自定义控制，同时形成其插件体系

* redux的原则

    - 单一的store

      区别于 flux 模式中可以有多个 state，整个应用的数据以树状结构存放在一个 state 对象中。

    - state 只读

      state 包含的应用数据不能随意修改，修改数据的唯一方式是 dispatch action，action 描述要修改的信息.


* 比较react

  a. 需要回调通知state (等同于回调参数) -> action  
  b. 需要根据回调处理 (等同于父级方法) -> reducer  
  c. 需要state (等同于总状态) -> store  

  - React有props和state: props意味着父级分发下来的属性，state意味着组件内部可以自行管理的状态，并且整个React没有数据向上回溯的能力，也就是说数据只能单向向下分发，或者自行内部消化。

  - React根本无法让两个组件互相交流，使用对方的数据。解决的唯一办法就是提升state，将state放到共有的父组件中来管理，再作为props分发回子组件。

  - 子组件改变父组件state的办法只能是通过onClick触发父组件声明好的回调，也就是父组件提前声明好函数或方法作为契约描述自己的state将如何变化，再将它同样作为属性交给子组件使用。

  - 为了面临所有可能的扩展问题，最容易想到的办法就是把所有state集中放到所有组件顶层，然后分发给所有组件。这就是redux诞生的背景

* 高阶组件

  - 由原始组件创造一个新的组件并且扩展它的行为。
