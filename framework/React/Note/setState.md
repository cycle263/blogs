## setState

setState不会立即更新组件。为了性能，React会延迟更新，会把多个组件的更新放在一次操作里。React不保证state的改变会立刻发生。setState并不总是立即更新组件。它可能会推后至批量更新。具体实现原理：

在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，就是由 React 控制的事件处理过程 setState 不会同步更新 this.state。

那么调用this.setState()后什么时候this.state才会更新？答案是即将要执行下一次的render函数时。

```js
// Wrong
this.setState({
    counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment
}));

// 由React控制的事件处理过程setState不会同步更新this.state；在React控制之外的情况，setState会同步更新this.state，如：addEventListener，setTimeout/setInterval等, 这类情况下的setState没走react的事物机制，执行时批量更新(isBatchingUpdates)没设置为true，因此每次都直接render了。
```

* 将props转换成自己的state

  ```js
  class Child extends Component {
      constructor(props) {
          super(props);
          this.state = {
              someThings: props.someThings
          };
      }
      componentWillReceiveProps(nextProps) {
          this.setState({someThings: nextProps.someThings});
      }
      render() {
          return <div>{this.state.someThings}</div>
      }
  }
  ```
