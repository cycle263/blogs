## 跨域

> 不同域名，不同端口，不同协议，不同子域名，都属于跨域

* jsonp

  > 是一种非正式传输协议，该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据。基本原理为script脚本没有同源策略，实际上是src属性不受同源策略影响，也就是说img,script,iframe元素

  原理: script、img、iframe等元素并不需要遵守同源策略。


## cors跨域详细总结

[详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)