## 浏览器线程

  > setTimeout的等待时间结束后并不是直接执行的而是先推入浏览器的一个任务队列，在同步队列结束后在依次调用任务队列中的任务。

- js引擎线程 （解释执行js代码、用户输入、网络请求）

- GUI线程 （绘制用户界面、与js主线程是互斥的）

- http网络请求线程 （处理用户的get、post等请求，等返回结果后将回调函数推入任务队列）

- 定时触发器线程 （setTimeout、setInterval等待时间结束后把执行函数推入任务队列中）

- 浏览器事件处理线程 （将click、mouse等交互事件发生后将这些事件放入事件队列中）

## js引擎线程

 * js主线程(DOM，ajax, http)，js消息线程（event loop，异步任务通知，IO设备，定时事件）

## 执行任务

  > 所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

  * 所有同步任务都在主线程上执行，形成一个**执行栈**（execution context stack）。

  * 主线程之外还有个消息线程，消息线程存在任务队列，只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

  * 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

  * 重复上一步

## 任务队列

> 浏览器的任务队列不止一个，还有 microtasks 和 macrotasks, 整个的js代码macrotask先执行，同步代码执行完后有microtask执行microtask，没有microtask执行下一个macrotask，如此往复循环至结束

  - microtasks:

    + process.nextTick
    + promiseObject.observe
    + MutationObserver
    + Event

  - macrotasks:

    + setTimeout
    + setInterval
    + setImmediate
    + I/O
    + UI渲染


* 据whatwg规范介绍：

  - 一个事件循环(event loop)会有一个或多个任务队列(task queue)
  - 每一个 event loop 都有一个 microtask queue
  - task queue == macrotask queue != microtask queue
  - 一个任务 task 可以放入 macrotask queue 也可以放入 microtask queue 中
  - 调用栈清空(只剩全局)，然后执行所有的microtask。当所有可执行的microtask执行完毕之后。循环再次从macrotask开始，找到其中一个任务队列执行完毕，然后再执行所有的microtask，这样一直循环下去


## webworker

  多线程，受控于主线程