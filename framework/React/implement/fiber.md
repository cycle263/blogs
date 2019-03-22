## fiber算法

* 背景

在React 16之前，组件层级很深，并且频繁渲染会导致卡顿或者帧率不高的情况，fiber的出现就是为了解决这样的问题。简单说，在React渲染期间，它占用浏览器主线程，浏览器也在与用户交互。

* 解决思路和原理

解决主线程长时间被 JS 运算占用这一问题的基本思路，是将运算切割为多个步骤，分批完成。也就是说在完成一部分任务之后，将控制权交回给浏览器，让浏览器有时间进行页面的渲染。等浏览器忙完之后，再继续之前未完成的任务。为了达到这个效果，需要借助浏览器的requestIdleCallback这一 API，会在浏览器空闲时期依次调用函数，这样就可以让开发者在主事件循环中执行后台或低优先级的任务，而且不会对像动画和用户交互这样延迟触发而且关键的事件产生影响。

* 优势

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

* 劣势

task按照优先级之后，可能低优先级的任务永远不会执行，称之为starvation；task有可能被打断，需要重新执行，那么某些依赖生命周期实现的业务逻辑可能会受到影响。


### 调度器(Scheduler)

React 框架内部的运作可以分为 3 层：

* Virtual DOM 层，描述页面长什么样。

* Reconciler 层，负责调用组件生命周期方法，进行 Diff 运算等， React 16.8以前的版本被命名为Stack Reconciler, 新版的命名为Fiber Reconciler。Fiber Reconciler 每执行一段时间，都会将控制权交回给浏览器，已达到不卡顿的目的。

* Renderer 层，根据不同的平台，渲染出相应的页面，比较常见的是 ReactDOM 和 ReactNative。

为了实现控制权的调度，就需要有一个调度器 (Scheduler) 来进行任务优先级的分配。任务的优先级有六种：

  - synchronous，与之前的Stack Reconciler操作一样，同步执行
  - task，在next tick之前执行
  - animation，下一帧之前执行
  - high，在不久的将来立即执行
  - low，稍微延迟执行也没关系
  - offscreen，下一次render时或scroll时才执行