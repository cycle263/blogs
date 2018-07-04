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