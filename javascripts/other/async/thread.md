## 浏览器线程

  > 浏览器内核是多线程的，它们在内核控制下相互配合以保持同步，一个浏览器通常由以下常驻线程组成：GUI 渲染线程，javascript 引擎线程，浏览器事件触发线程，定时触发器线程，异步 http 请求线程。

  - js引擎线程 （解释执行js代码、用户输入、网络请求）Javascript 引擎线程理所当然是负责解析 Javascript 脚本，运行代码。浏览器无论什么时候都只有一个 JS 线程在运行 JS 程序。

  - GUI线程 （绘制用户界面、与js主线程是互斥的），界面需要重绘或者回流时，该线程就会执行。当JS引擎执行时GUI线程会被挂起，GUI 更新会被保存在一个队列中等到 JS 引擎空闲时立即被执行。

  - http网络请求线程 （处理用户的get、post等请求，等返回结果后将回调函数推入任务队列）

  - 定时触发器线程 （setTimeout、setInterval等待时间结束后把执行函数推入任务队列中）。浏览器定时计数器并不是由 JavaScript 引擎计数的，由单独的定时触发器线程计时。并且，setTimeout的等待时间结束后并不是直接执行的，而是先推入浏览器的一个任务队列，在同步队列结束后在依次调用任务队列中的任务。

  - 浏览器事件处理线程 （将click、mouse等交互事件发生后将这些事件放入事件队列中）当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待 JS 引擎的处理。这些事件可以是当前执行的代码块如定时任务、也可来自浏览器内核的其他线程如鼠标点击、AJAX 异步请求等，但由于JS的单线程关系所有这些事件都得排队等待 JS 引擎处理。

  ![JavaScript主线程](../../images/thread.jpg)

## js引擎线程

  Javascript是单线程运行、支持异步机制的语言。js主线程模块(DOM，ajax, http)，js消息线程模块（event loop，异步任务通知，IO设备，定时事件）

  主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部API，它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。执行栈中的代码，总是在读取”任务队列”之前执行

  ![堆栈](../../images/heapStack.jpg)

## 执行任务

  > 所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

  * 所有同步任务都在主线程上执行，形成一个**执行栈**（execution context stack）。

  * 主线程之外还有个消息线程，消息线程存在任务队列，只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

  * 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

  * 重复上一步

## 任务队列

> 浏览器的任务队列不止一个，还有 microtasks 和 macrotasks, 整个的js代码macrotask先执行，同步代码执行完后有microtask执行microtask，没有microtask执行下一个macrotask，如此往复循环至结束

  - microtasks(微任务):

    + process.nextTick 一次事件循环中，如果有多个 process.nextTick 会在执行栈之后，一次性全部执行。process.nextTick 是在本次事件循环之初触发，且不用检查任务队列，所以在时间上更快，执行效率更高，但是如果process.nextTick 事件太多，执行时长过长也会阻塞事件循环。

    + promiseObject.observe

    + MutationObserver
    
    + Event

  - macrotasks(宏任务):

    + setTimeout
    + setInterval
    + setImmediate
    + I/O
    + UI渲染
    + script代码执行
    + postMessage、requestAnimationFrame、MessageChannel、setImmediate

  * 事件循环中，每一次循环称为 tick。据whatwg规范介绍：

    - 一个事件循环(event loop)会有一个或多个任务队列(task queue)
    - 每一个 event loop 都有一个 microtask queue
    - task queue == macrotask queue != microtask queue
    - 一个任务 task 可以放入 macrotask queue 也可以放入 microtask queue 中
    - 调用栈清空(只剩全局)，然后执行所有的microtask。当所有可执行的microtask执行完毕之后。循环再次从macrotask开始，找到其中一个任务队列执行完毕，然后再执行所有的microtask，这样一直循环下去

## webworker

  为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但完全受控于主线程。其实就是在Javascript单线程执行的基础上，开启一个子线程，进行任务处理，而不影响主线程的执行，当子线程执行完毕之后再回到主线程上，在这个过程中并不影响主线程的执行过程。

  Web Worker的基本原理就是在当前的主线程中加载一个只读文件来创建一个新的线程，两个线程同时存在，且互不阻塞，并且在子线程与主线程之间提供了数据交换的接口postMessage和onmessage。来进行发送数据和接收数据。其数据格式可以为结构化数据（JSON等）。子线程并不支持操作页面的DOM。

## 异步

* setTimeout算异步吗？

  调用 setTimeout 函数会在一个时间段过去后在队列中添加一个消息。这个时间段作为函数的第二个参数被传入。如果队列中没有其它消息，消息会被马上处理。但是，如果有其它消息，setTimeout 消息必须等待其它消息处理完。因此第二个参数仅仅表示最少的时间，而非确切的时间。

  也就是说，setTimeout()只是将事件插入了任务队列，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。setTimeout 里面的代码是在当前环境中的任务执行完了「之后」才执行，实际上是js引擎调用的event loop模块，event loop有4ms的时间间隔，并不是真正意义上的同时进行。Ajax可以和js代码同时运行的，因为它是有浏览器的http网络请求线程负责，并不是js引擎。