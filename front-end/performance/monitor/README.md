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