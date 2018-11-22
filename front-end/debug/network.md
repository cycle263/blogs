## 网络请求分析

* Controls

* Filters

  - request type，All、XHR、JS、CSS、Img等，可加 ctrl/cmd 按键进行多选

* Overview

  - DOMContentLoaded事件在Overview上用一条蓝色竖线标记，并且在Summary以蓝色文字显示确切的时间

  - load事件同样会在Overview和Requests Table上用一条红色竖线标记，在Summary也会以红色文字显示确切的时间

* Request table

  - Protocol  请求协议类型

  - Waterfall   请求timing，显示资源在整个请求生命周期过程中各部分时间花费信息。

    + Queuing 排队的时间花费，可能由于该请求被渲染引擎认为是优先级比较低的资源（图片）、服务器不可用、超过浏览器的并发请求的最大连接数（Chrome的最大并发连接数为6）。

    + Stalled 从HTTP连接建立到请求能够被发出送出去(真正传输数据)之间的时间花费。包含用于处理代理的时间，如果有已经建立好的连接，这个时间还包括等待已建立连接被复用的时间。

    + Proxy Negotiation 与代理服务器连接的时间花费。

    + DNS Lookup 执行DNS查询的时间。网页上每一个新的域名都要经过一个DNS查询。第二次访问浏览器有缓存的话，则这个时间为0。

    + Initial Connection / Connecting 建立连接的时间花费，包含了TCP握手及重试时间。

    + SSL 完成SSL握手的时间花费。

    + Request sent 发起请求的时间。

    + Waiting (Time to first byte (TTFB)) 是最初的网络请求被发起到从服务器接收到第一个字节这段时间，它包含了TCP连接时间，发送HTTP请求时间和获得响应消息第一个字节的时间。

    + Content Download 获取Response响应数据的时间花费

  - Initiator 标记请求是由哪个对象或进程发起的（请求源）

    + Parser： 请求由Chrome的HTML解析器时发起的。
    + Redirect：请求是由HTTP页面重定向发起的。
    + Script：请求是由Script脚本发起的。
    + Other：请求是由其他进程发起的，比如用户点击一个链接跳转到另一个页面或者在地址栏输入URL地址。

  - 请求依赖  按住Shift键，然后鼠标悬浮在某个请求上，该请求的发起对象由绿色标志，该请求的依赖对象由红色标志

* Summary

  - requests count 请求统计
  - transferred 请求总大小
  - DOMContentLoaded 时间
  - Loaded 时间

参考资料

[请求timing字段详解](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#timing-explanation)
[资源加载时间](https://www.breakyizhan.com/chromeconsole/2186.html)