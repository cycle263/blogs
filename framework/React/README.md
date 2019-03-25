## React

一个组件的渲染函数就是一个基于 state 和 props 的纯函数，state 是自己的，props 是外面来的，任何东西变了就重新渲染一遍。

* jsx -> element

  ```jsx
  <div className="cn">
    <Header>Hello, world!</Header>
    <Content>This is content!</Content>
  </div>

  // element
  React.createElement(
    'div',
    { className: 'cn' },
    React.createElement(
      Header,
      null,
      'Hello, world!'
    ),
    React.createElement(
      Content,
      null,
      'This is content!'
    )
  )

  // tree
  {
    type: 'div',
    props:  { 
      className: 'cn',
      children: [{
        type: function Header,
        props: {
          children: 'Hello, world!',
        }
      }, {
        type: function Content,
        props: {
          children: 'This is content!',
        }
      }]
    }
  }
  ```

  element在React里，其实就是组成虚拟DOM 树的节点，它有三个参数：type, props, children[string, dom, component, bool, null, undefined, number, array]。React.createElement的表达式会在render函数被调用的时候执行，换句话说，当render函数被调用的时候，会返回一个element。

  ```js
  // 不同类型调用不同的方法处理
  dom => ReactDOMComponent
  component => ReactCompositeComponentWrapper
  string, number => ReactDOMTextComponent
  null, false, undefined => ReactDOMEmptyComponent
  ```
  
* 状态管理框架

  - [redux](./dataManage/redux)

    Redux 是为 Javascript 应用而生的可预估的状态容器。应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。惟一改变 state 的办法是触发 action。

  - [react-redux](./dataManage/redux/react-redux) React专用状态管理库

  - [Mobx](./dataManage/Mobx)

  - [falcor](./dataManage/falcor)


## 其他文章

* [React route](./router)

* [初试React route 4](./router/router4)

* [diff算法初识](./Note/diff)

* [react事件系统](./implement/event)

* [react的setstate方法](./implement/setState)

* [react与其他框架比较](./Note/compare)

* [this指向和mixins、pureComponent](./Note/component)

* [React UI](./antd)

* [react通信方式](./dataManage/Communication)

* [react context](./dataManage/context)

* [react ref](./implement/ref)

* [react fiber](./implement/fiber)
