## vue vs react

* vue

  双向绑定的模板

  - 定义

  - 适用场景

  - 生态圈配套

* angularjs

  双向绑定，mvvc模式，脏检查

* react

  - 定义

    一个组件的渲染函数就是一个基于 state 和 props 的纯函数，state 是自己的，props 是外面来的，任何东西变了就重新渲染一遍.

  - 特点

    + 虚拟化DOM

    + 组件化

    +

  - 适用场景

  - 缺点

    + 架构：大型应用程序应该如何组织代码？

    + 通信：组件之间如何通信？

  - 生态圈配套（flux的实现）

    + redux

      函数式（Functional）管理，state 是不可变对象，适合大型项目

    + MobX

      响应式（Reactive）管理，state 是可变对象，适合中小型项目
