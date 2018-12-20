## React

一个组件的渲染函数就是一个基于 state 和 props 的纯函数，state 是自己的，props 是外面来的，任何东西变了就重新渲染一遍.

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

* [React route](./router)

* [初试React route 4](./router/router4)

* [diff算法初识](./Note/diff)

* [react事件系统](./Note/event)

* [react的setstate方法](./Note/setState)

* [react与其他框架比较](./Note/compare)

* [React UI](./antd)


## 钩子函数 vs 回调函数

  回调函数是编程语言实现层面上的事件通知功能，可以理解为系统在符合你设定的条件时自动调用。回调函数其实就是调用者把回调函数的函数指针传递给调用函数，当调用函数执行完毕时，通过函数指针来调用回调函数。
  
  钩子函数并不是编程语言实现层面上的事件通知功能，钩子的概念源于Windows的消息处理机制，通过设置钩子，应用程序可以对所有的消息事件进行拦截，然后执行钩子函数，对消息进行想要的处理方式。钩子函数更多作用于全局或者类级别，回调函数通过作用于实例级别。

  ```js
  let btn = document.getElementById("btn");
  btn.onclick = () => {   // 给btn设置点击的钩子函数
    console.log("I'm a hook");
    console.log(this.onclick);  // func
  }

  // 给btn绑定了一个监听器, 消息捕获的过程不能参与，而在捕获执行完毕的时候，回调函数才会执行
  btn.addEventListener("click", () => {  
    console.log(this.onclick);  // undefined
  });
  ```

  为了捕获消息而生的，但是钩子函数在捕获消息的第一时间就会执行，而回调函数是在整个捕获过程结束时，最后一个被执行的。回调函数其实就是调用者把回调函数的函数指针传递给调用函数，当调用函数执行完毕时，通过函数指针来调用回调函数。

  ```js
  // define a custom css hook, jquery钩子
  jQuery.cssHooks.custombox = {
    get: function(elem, computed, extra) {
      return $.css(elem, 'borderRadius') == "50%"
        ? "circle"
        : "box";
    },
    set: function(elem, value) {
      elem.style.borderRadius = value == "circle"
        ? "50%"
        : "0";
    }
  };

  // have .css() use that hook
  $("#some-selector").css("custombox", "circle");
  ```

## 钩子函数 vs 数据库事务

数据库事务要么都成功，要么都失败。

事务的流程：

- 开启事务

- 依次执行事务中的操作步骤：a, b, c, d...

- 全部成功，提交事务；失败任何一个，回滚事务

```js
// react Transaction
var Transaction = require('./Transaction');

// 我们自己定义的 Transaction
var MyTransaction = function() {
  // do sth.
};

Object.assign(MyTransaction.prototype, Transaction.Mixin, {
  getTransactionWrappers: function() {
    return [{
      initialize: function() {
        console.log('before method perform');
      },
      close: function() {
        console.log('after method perform');
      }
    }];
  };
});

var transaction = new MyTransaction();
var testMethod = function() {
  console.log('test');
}
transaction.perform(testMethod);

// before method perform
// test
// after method perform
```