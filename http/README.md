## http

> HTTP协议（HyperText Transfer Protocol，超文本传输协议）是用于从WWW服务器传输超文本到本地浏览器的传送协议。是基于 TCP/IP 协议的应用层协议。它不涉及数据包（packet）传输，主要规定了客户端和服务器之间的通信格式，默认使用80端口。

* [HTTP协议详解](./httpProtocol)

* [Http2](./http2) 相比http1.1

    > HTTP/2 则是一个彻底的二进制协议，头信息和数据体都是二进制，并且统称为"帧"（frame）：头信息帧和数据帧。

    - 连接复用
    - 持久化连接
    - 强制加密
    - 服务端推送
    - 协议头压缩

* [Websocket](websocket)详解

    Websocket借用了HTTP的协议来完成一部分握手，是一个持久化的协议，是相对于HTTP这种非持久(长连接，循环连接不算)的协议来说，更像是HTTP协议上的一种补充。Web Socket 是一种 HTML 5 为 Web 定制的全双工通讯协议，没有“请求 - 响应”的概念，浏览器与服务器完全平等，连接一旦建立就一直开放，双方可随时向对方发送任意数据，没有推拉之分。  

    ws最大的优势：在于服务器和客户端可以在给定的时间范围内的任意时刻，相互推送信息，数据的传输使用帧来传递，并且允许跨域通信。  

    目前主流的浏览器都支持WebSocket，并且有第三方的API：Guillermo Rauch创建了一个Socket.IO，遵循Engine.IO协议[Engine.IO protocol](https://github.com/socketio/engine.io-protocol)。

* SPDY协议特点 

    - 多路复用，一个TCP连接上同时跑多个HTTP请求，请求可设定优先级。
    
    - 去除不需要的HTTP头，压缩HTTP头，以减少需要的网络带宽。
    
    - 使用了SSL作为传输协议提供数据安全。
    
    - 对传输的数据使用gzip进行压缩
    
    - 提供服务方发起通信，并向客户端推送数据的机制。

    `http - spdy - ssl/tls - tcp`，SPDY位于HTTP之下，TCP和SSL之上，这样可以轻松兼容老版本的HTTP协议(将HTTP1.x的内容封装成一种新的frame格式)，同时可以使用已有的SSL功能。

* [Ajax - xhrHttpRequest](ajax)的总结

* 其他

    - [Unicode vs Utf-8 vs ASCII](unicode)对比详解

    - [Uuid](uuid)的生成方法

    - [http状态码详解](http://tool.oschina.net/commons?type=5)

* 常见响应状态码

    - 100 "continue"
    - 101 "switching protocols"
    - 102 "processing"
    - 200 "ok"
    - 201 "created"
    - 202 "accepted"
    - 203 "non-authoritative information"
    - 204 "no content"
    - 205 "reset content"
    - 206 "partial content"
    - 207 "multi-status"
    - 208 "already reported"
    - 226 "im used"
    - 300 "multiple choices"
    - 301 "moved permanently"
    - 302 "found"
    - 303 "see other"
    - 304 "not modified"
    - 305 "use proxy"
    - 307 "temporary redirect"
    - 308 "permanent redirect"
    - 400 "bad request"
    - 401 "unauthorized"
    - 402 "payment required"
    - 403 "forbidden"
    - 404 "not found"
    - 405 "method not allowed"
    - 406 "not acceptable"
    - 407 "proxy authentication required"
    - 408 "request timeout"
    - 409 "conflict"
    - 410 "gone"
    - 411 "length required"
    - 412 "precondition failed"
    - 413 "payload too large"
    - 414 "uri too long"
    - 415 "unsupported media type"
    - 416 "range not satisfiable"
    - 417 "expectation failed"
    - 418 "I'm a teapot"
    - 422 "unprocessable entity"
    - 423 "locked"
    - 424 "failed dependency"
    - 426 "upgrade required"
    - 428 "precondition required"
    - 429 "too many requests"
    - 431 "request header fields too large"
    - 500 "internal server error"
    - 501 "not implemented"
    - 502 "bad gateway"
    - 503 "service unavailable"
    - 504 "gateway timeout"
    - 505 "http version not supported"
    - 506 "variant also negotiates"
    - 507 "insufficient storage"
    - 508 "loop detected"
    - 510 "not extended"
    - 511 "network authentication required"