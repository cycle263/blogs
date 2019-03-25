## React ref

* 背景

React 通过声明式的渲染机制把复杂的 DOM 操作抽象成为简单的 state 与 props 操作，在开发过程中尽量避免 DOM 操作，但也提供了ref方法访问DOM元素或者react 组件实例。

* 版本

  - react @16.3之前，ref 通过字符串（string ref）或者回调函数（callback ref）的形式进行获取，在 v16.3 中，经 [0017-new-create-ref](https://github.com/reactjs/rfcs/blob/master/text/0017-new-create-ref.md) 提案引入了新的 React.createRef API。

  ```jsx
  // string ref or callback ref
  <input ref="myRef" />
  <input ref={ref => this.myInput = ref;} />

  // createRef API
  constructor(props) {
    this.myInput = React.createRef();
  }

  render() {
    return <input ref={this.myInput} />
  }
  ```

* createRef出现的原因

  - 当 ref 定义为 string 时，需要 React 追踪当前正在渲染的组件，在 reconciliation 阶段，React Element 创建和更新的过程中，ref 会被封装为一个闭包函数，等待 commit 阶段被执行，这会对 React 的性能产生一些影响。

  - 在根组件上使用无法生效。

  - 容易跟组件的属性混淆

  因此，旧版本尽量推荐使用callback写法，新版本已经废弃string ref。

* createRef vs callback ref

  createRef 显得更加直观，callback ref 采用了组件 render 过程中在闭包函数中分配 ref 的模式，而 createRef 则采用了 object ref。