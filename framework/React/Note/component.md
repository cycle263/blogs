## react常见的组件库

* [React-Bootstrap](https://react-bootstrap.github.io/)

* [ReCharts](http://recharts.org/)

* [Antd](https://ant.design/docs/react/introduce)


## 组件创建方式

* 无状态函数式组件

  > 纯展示组件，这种组件只负责根据传入的props来展示，不涉及到要state状态的操作。

  - 组件不会被实例化，整体渲染性能得到提升

  - 组件不能访问this对象

  - 组件无法访问生命周期的方法

  - 无状态组件只能访问输入的props，同样的props会得到同样的渲染结果，不会有副作用

* React.createClass   // es5方式

  - 方法自动绑定this

* extends React.Component   // 优先推荐的es6方式

  - 手动bind作用域

* Mixins

  (混入)是面向对象编程OOP的一种实现，其作用是为了复用共有的代码，将共有的代码通过抽取为一个对象，然后通过Mixins进该对象来达到代码复用.

```js
// React.Component方式不支持Mixins
var SomeMixin = {  
  doSomething() {

  }
};
const Contacts = React.createClass({  
  mixins: [SomeMixin],
  handleClick() {
    this.doSomething(); // use mixin
  },
  render() {
    return (
      <div onClick={this.handleClick}></div>
    );
  }
});
```

* createClass vs extends React.Component

  通过extends方式生成的组件，没有createClass中对getInitialState及getDefaultProps的显示管理
