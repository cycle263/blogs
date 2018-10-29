## setState

setState不会立即更新组件。为了性能，React会延迟更新，会把多个组件的更新放在一次操作里。React中setState并不总是立即更新组件，它可能会推后至批量更新。

* 分析原因

在 React 15 中， 执行生命周期函数或事件处理函数时会默认创建一个事务，在其内部同步调用的 setState 都将被缓存入栈，待同步函数执行结束后开始批量更新（batch update），多个 setState 会被 merge 并得到终状态，之后真正的组件更新才会开始。值得一提的是，在事务之外执行的多个 setState 是不会被合并的，比如在 setTimeout 中调用的 setState。

在 React 16之后，React开发团队调整了渲染机制，新的调和算法fiber，将原有的同步渲染组件方式，改成可异步渲染且可中断渲染的机制。

* 代码实现

在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，就是由 React 控制的事件处理过程 setState 不会同步更新 this.state。

那么调用this.setState()后什么时候this.state才会更新？答案是即将要执行下一次的render函数时。

![diff](../images/setstate.png )

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

* fiber

  - 背景

  在React 16之前，组件层级很深，并且频繁渲染会导致卡顿或者帧率不高的情况，fiber的出现就是为了解决这样的问题。简单说，在React渲染期间，它占用浏览器主线程，浏览器也在与用户交互。

  - 优势
  
  采用新的算法策略之后，开发者可以通过优先级，控制不同类型任务的优先级，提高用户体验，以及整个应用程序的灵活性。例如：将动画的渲染任务优先级提高，对动画的支持会变得比较友好。

  ```flow
  st=>start: ParnetComp
  op1=>operation: SelfComp
  op2=>operation: ChildComp
  op3=>operation: GrandsonComp
  op4=>subroutine: GrandsonComp DidMount
  op5=>inputoutput: ChildComp DidMount
  op6=>operation: SelfComp DidMount
  e=>end: ParnetComp DidMount
  st->op1->op2->op3(right)->op4->op5->op6->e
  ```

  - 劣势

  task按照优先级之后，可能低优先级的任务永远不会执行，称之为starvation；task有可能被打断，需要重新执行，那么某些依赖生命周期实现的业务逻辑可能会受到影响。


