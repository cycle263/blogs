## Web Worker

  > Web Workers 是 HTML5 提供的一个javascript多线程解决方案，主要用于处理CPU 计算密集型任务和需要长时间运行的任务。Web Worker的目的，就是为JavaScript创造多线程环境，允许主线程将一些任务分配给子线程。在主线程运行的同时，子线程在后台运行，两者互不干扰。等到子线程完成计算任务，再把结果返回给主线程。

  * 分类

    - 普通的Worker：只能与创造它们的主进程通信。

    - Shared Worker：能被所有同源的进程获取（比如来自不同的浏览器窗口、iframe窗口和其他Shared worker），它们必须通过一个端口通信。

    - ServiceWorker：实际上是一个在网络应用与浏览器或网络层之间的代理层。它可以拦截网络请求，使得离线访问成为可能。

  * 局限性

    - 同域限制。子线程加载的脚本文件，必须与主线程的脚本文件在同一个域。

    - DOM限制。子线程所在的全局对象，与主进程不一样，它无法读取网页的DOM对象，即document、window、parent这些对象，子线程都无法得到。（但是，navigator对象和location对象可以获得。）

    - 脚本限制。子线程无法读取网页的全局变量和函数，也不能执行alert和confirm方法，不过可以执行setInterval和setTimeout，以及使用XMLHttpRequest对象发出AJAX请求。

    - 文件限制。子线程无法读取本地文件，即子线程无法打开本机的文件系统（file://），它所加载的脚本，必须来自网络。
    
    - 只能使用一部分JavaScript功能：
    
      + navigator 对象
      + location 对象（只读）
      + XMLHttpRequest
      + setTimeout()/clearTimeout() 和 setInterval()/clearInterval()
      + Application Cache
      + 使用 importScripts 来引用外部脚本
      + 创建其它 web workers


* web worker通信

  - postMessage，传递字符串或者json对象

  - Broadcast Channel，广播通道，允许我们向共享同一个源的所有上下文发送消息。同一个源下的所有的浏览器页签，内联框架（iframe）或者 workers 都可以发送和接收消息。不过，广播信道浏览器兼容性不太好。