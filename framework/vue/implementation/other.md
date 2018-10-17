## nextTick实现

* 背景

  浏览器主线程的执行过程就是一个 tick，nextTick 顾名思义，就是下一个 tick。由于 JS 执行是单线程的，在一个 tick 的过程中，它可能会多次修改数据，Vue.js 并不需要每次去更新DOM视图，它会把这些数据的修改全部 push 到一个队列里，然后内部调用一次 nextTick 去更新视图，所以数据到 DOM 视图的变化是需要在下一个 tick 才能完成。
  
  js中的task分为macro task 和 micro task。

  ```js
  // 解释代码
  for (macroTask of macroTaskQueue) {
    // 1. Handle current MACRO-TASK
    handleMacroTask();

    // 2. Handle all MICRO-TASK
    for (microTask of microTaskQueue) {
        handleMicroTask(microTask);
    }
  }
  ```

* 2.5版本之前

  `Promise -> MutationObserver -> setTimeout`

  MutationObserver属于微任务，优先级小于Promise，主要用于监听一个DOM变动， 当DOM对象树发生任何变动时，Mutation Observer会得到通知。

* 2.5版本之后

  `Promise -> MessageChannel -> setTimeout`

  MessageChannel属于宏任务，优先级是：MessageChannel -> setTimeout。

  变动原因：micro task 的执行优先级非常高，在某些场景下它甚至要比事件冒泡还要快，就会导致一些诡异的问题。所以最终 nextTick 采取的策略是默认走 micro task，对于一些 DOM 交互事件，如 v-on 绑定的事件回调函数的处理，会强制走 macro task。

  对于 macro task 的执行，Vue.js 优先检测是否支持原生 setImmediate，这是一个高版本 IE 和 Edge 才支持的特性，不支持的话再去检测是否支持原生的 MessageChannel，如果也不支持的话就会降级为 setTimeout 0。

