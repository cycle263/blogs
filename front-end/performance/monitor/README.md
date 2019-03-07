## 前端监控

* 指标监控的历史背景

  - 1、手动时代：首屏加载时间，手动打点方式，分别在页头和首屏dom节点处new Date()打点，计算差值，作为首屏时间，再加上setTimeout(new Date(), 0)标记首屏可交互时间。

  - 2、W3C API时代：Navigation Timing / performance.timing 精准的实现了性能测试的打点问题，domContentLoaded一般作为首屏加载时间。但ajax的异步数据渲染时间并没有计算在内，导致API的监控失去意义。

  - performance.getEntries()，监控所有请求包括ajax和静态资源的请求监控

* 单页面

  - 监控hash变化

  **无法监控的情况**

  - 下拉刷新
  - 滚动分页加载
  - tab切换
  - 不关闭，过段时间查看

* MVVM

* 跨端

* 全栈

## 前端监控指标

| 上报字段 |	描述 |	计算方式 |	备注 |
| ------- | ----- | ------- | ---- |
| firstbyte |	首包时间	| responseStart - domainLookupStart	| |
| fpt	 | First Paint Time, 首次渲染时间 / 白屏时间 | 	responseEnd - fetchStart	 | 从请求开始到浏览器开始解析第一批 HTML 文档字节的时间差 |
| tti	 | Time to Interact，首次可交互时间 | 	domInteractive - fetchStart	 | 浏览器完成所有 HTML 解析并且完成 DOM 构建，此时浏览器开始加载资源 |
| ready	| HTML 加载完成时间， 即 DOM Ready 时间	| domContentLoadEventEnd - fetchStart	| 如果页面有同步执行的 JS，则同步 JS 执行时间 = ready - tti |
| load	| 页面完全加载时间	| loadEventStart - fetchStart	| load = 首次渲染时间 + DOM 解析耗时 + 同步 JS 执行 + 资源加载耗时 | 


## 监控埋点技巧

* 合并上报

  收集数据，放入队列，延时对这些队列里的请求参数做压缩，生成一个统一的 URL，再将之发送至服务器中，以减少请求节省流量。

* 跨域脚本异常（CDN脚本）

  ```js
  window.onerror = function(errorMsg, scriptURL, lineNumber, colomnNumber, error) {
    console.log(errorMsg, scriptURL, lineNumber, colomnNumber, error);
  };

  // 放入CDN中，打印出script error，却没有异常的堆栈信息
  ```

  解决方案：

  1、响应中Access-Control-Allow-Origin设置允许cros的域名或者*；
  2、script 标签增加 crossorigin="anonymous"

  try catch方案：

  基于AMD和jQuery，大部分业务函数都是异步回调(事件、定时器、异步请求等)处理的，只需要将所有的异步函数用try catch包裹起来，就能捕获到大部分异常信息。

  例如：setTimeout、setInterval、jQuery.ajax、jQuery.event.add、jQuery.event.remove、define、addEventListener等

  ```js
  const originAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    const wrappedListener = function (...args) {
      // 捕获添加事件时的堆栈
      const addStack = new Error(`Event (${type})`).stack;
      try {
        return listener.apply(this, args);
      }
      catch (err) {
        err.stack += '\n' + addStack;   // 扩展自定义堆栈信息
        throw err;
      }
    }
    return originAddEventListener.call(this, type, wrappedListener, options);
  }
  ```

参见资料

[Script Error规范](https://github.com/BetterJS/badjs-report/issues/3)
[解决 "Script Error" 的另类思路](https://cloud.tencent.com/developer/article/1367170)
