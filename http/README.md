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

* SPDY协议特点 

    - 多路复用，一个TCP连接上同时跑多个HTTP请求，请求可设定优先级。
    
    - 去除不需要的HTTP头，压缩HTTP头，以减少需要的网络带宽。
    
    - 使用了SSL作为传输协议提供数据安全。
    
    - 对传输的数据使用gzip进行压缩
    
    - 提供服务方发起通信，并向客户端推送数据的机制。

* [Ajax - xhrHttpRequest](ajax)的总结

* 其他

    - [Unicode vs Utf-8](unicode)对比详解

    - [Uuid](uuid)的生成方法