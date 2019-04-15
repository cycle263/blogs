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

  - 高阶组件的基本原则

    + 无副作用

    高阶组件就是一个没有副作用的纯函数。函数的调用参数相同，则结构永远相同。它不依赖于函数外部任何状态或数据的变化，只依赖于入参。高阶组件函数不会产生任何可观察的副作用，例如网络请求，输入和输出设备或数据突变。

    + 透传props

    未使用或改变的props一定要透传给原组件，高阶组件增强原组件功能，但绝对不改变原组件props。

  [HOC详情参见](./HOC)

* Hooks

  Hooks是React v16.7.0-alpha中加入的新特性。它可以让你在class以外使用state和其他React特性。使用Hooks，可以在将含有state的逻辑从组件中抽象出来，实现状态逻辑复用，并且有利于测试和维护。

  - State hook

  ```js
  export default function HookTest() {
    const [count, setCount] = useState(0);
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => { setCount(count + 1); setNumber(number + 1); }}>
          Click me
          </button>
      </div>
    );
  }
  ```