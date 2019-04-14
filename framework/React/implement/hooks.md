## hooks

* 背景

状态逻辑复用从 Mixin 模式到 HOC 高阶模式， 再到Hook模式，分别有什么优缺点呢？

* Mixin

  Mixin(混入) 是一种扩展功能的方式，也就是拷贝属性，常见的实现有lodash和jQuery的extend。

  ```js
  var extProp = {
    test: () => {
      console.log('test log...')；
    }
  };
  _.extend(Target.prototype, extProp);

  // react中Mixin
  React.createClass({
    mixins: [extProp],
    render: () => {
      return <div>{this.props.children}</div>
    }
  })
  ```
  - Mixin 的问题有哪些呢？

    + Mixin 相互耦合，容易相互冲突

    + Mixin 会改变元组件，不利于追踪和维护

* HOC（高阶组件）

  高阶组件其实也是一种装饰模式，说简单点，就是一个函数的入参为组件，并返回一个新组件，因为它不会改变元组件而得到广泛认可和使用。

  ```js
  function showComp(WrappedComp) {
    return class extends Component {
      render() {
        const { visible, ...props } = this.props;
        return visible ? <WrappedComp {...props} /> : null;
      }
    }
  }
  ```

  [HOC详情参见](./HOC)

* Hooks