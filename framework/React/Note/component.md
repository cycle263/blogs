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

// mixin
const mixin = function(obj, mixins) {
  const newObj = obj;
  newObj.prototype = Object.create(obj.prototype);
  for (let prop in mixins) {
    if (mixins.hasOwnProperty(prop)) {
      newObj.prototype[prop] = mixins[prop];
    }
  }
  return newObj;
};
```

* pureRender

  - PureRenderMixin

    实现 shouldComponentUpdate，对props 和 state 进行浅比较shallowEqual。

    ```js
    var shallowCompare = require('shallowCompare');

    var ReactComponentWithPureRenderMixin = {
      shouldComponentUpdate: function(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
      },
    };

    module.exports = ReactComponentWithPureRenderMixin;
    ```

  - react-pure-render

  - React.PureComponent

    React 15.3.0 新增了一个 PureComponent 类，也就是props和state未发生改变，组件的render方法不会触发。props/state对比在 ReactCompositeComponent 里实现的。

    ```js
    function ReactPureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }

    function ComponentDummy() {}
    ComponentDummy.prototype = ReactComponent.prototype;
    ReactPureComponent.prototype = new ComponentDummy();
    ReactPureComponent.prototype.constructor = ReactPureComponent;
    /* Avoid an extra prototype jump for these methods. 避免原型链拉长导致方法查找的性能开销 */
    Object.assign(ReactPureComponent.prototype, ReactComponent.prototype);
    ReactPureComponent.prototype.isPureReactComponent = true;

    
    /* 浅比较 */
    var shallowEqual = require('shallowEqual');

    function shallowCompare(instance, nextProps, nextState) {
      return (
        !shallowEqual(instance.props, nextProps) ||
        !shallowEqual(instance.state, nextState)
      );
    }
    ```

* createClass vs extends React.Component

  通过extends方式生成的组件，没有createClass中对getInitialState及getDefaultProps的显示管理


## react常见的组件库

* [React-Bootstrap](https://react-bootstrap.github.io/)

* [ReCharts](http://recharts.org/)

* [Antd](https://ant.design/docs/react/introduce)
