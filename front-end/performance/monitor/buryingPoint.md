## 埋点

* 埋点数据流程

  `数据采集 -> 数据永久落地 -> 数据清洗 -> 数据展示和分析 -> 提供决策`

* 埋点分类

  - 手动埋点：纯手动代码埋点，需要埋点位置调用接口收集数据，例如：友盟、百度统计等

  - 可视化埋点：将业务代码和埋点代码分离，提供一个可视化交互的页面，输入为业务代码，通过这个可视化系统，可以在业务代码中自定义的增加埋点事件等，最后输出的代码耦合了业务代码和埋点代码。缺点就是可以埋点的控件有限，不能手动定制。

  通俗点讲，也就是用一个系统来实现手动插入代码埋点的过程。比如国外比较早做可视化的是 Mixpanel，国内较早支持可视化埋点的有TalkingData、诸葛 IO，2017年腾讯的 MTA 也宣布支持可视化埋点。可视化埋点中多数基于Xpath的方案，XPath 是一门在 XML 文档中查找信息的语言，XPath 可用来在 XML 文档中对元素和属性进行遍历。

  - 无埋点：前端自动采集全部事件，上报所有埋点数据，由后端来过滤筛选出有用的数据。优点是前端一次加载埋点脚本，缺点是流量和采集的数据过于庞大。例如：GrowingIO、神策。

* 用途

  时间分析、漏斗分析、留存分析、分布分析、间隔分析、用户群分析、用户习惯和行为分析

### 埋点技巧

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

* 为何很多埋点都是请求1像素的gif图片？

  - 无跨域问题
  - gif图片最小只需要43个字节
  - 执行无阻塞，不影响用户体验
  - 图片请求不占用 Ajax 请求限额

  其他方案，"204 No Content"

### 参考资料

[让前端监控数据采集更高效](https://segmentfault.com/a/1190000018918875)

[身侧数据埋点应用](https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_web_all-1573964.html)

[搭建前端埋点监控系统](https://zhuanlan.zhihu.com/p/84441049)