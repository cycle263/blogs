### 1、HTTP 压缩概述

浏览器发出的 HTTP 请求时必须指定它可以接受压缩的内容，这样 Web 服务器才会发送压缩的输出。具体地说，使用 Accept-Encoding 请求头来指定浏览器可以接收压缩的输出。
当服务器发送回生成的内容时，Content-Encoding 头向浏览器说明压缩内容所用的格式。Content-Encoding 和 Transfer-Encoding 头 —— 在 HTTP 头中没有指定内容的长度。
```json
Content-Encoding: gzip
Transfer-Encoding: chunked
```

### 2、http压缩历史和方案

HTTP 压缩是在 HTTP 1.0 规范（RFC 1945）中引入的，最初支持 gzip 以及 UNIX 压缩算法 x-gzip 和 x-compress。在 HTTP 1.1 协议（RFC 2616）中，压缩得到了进一步明确和规范化，包括以下编码方案：
  - (1).Gzip。文件压缩程序 gzip（GNU zip）产生的编码格式，由 RFC 1952 描述。这种格式是一种使用 32 位 CRC
    （Cyclic Redundancy Check）的 Lempel-Ziv 编码（LZ77）。
  - (2).Compress。通用 UNIX 文件压缩程序 compress 产生的编码格式。这种格式是一种自适应的 Lempel-Ziv-Welch 编码（LZW）。
  - (3).Deflate。RFC 1950 中定义的 zlib 格式，并与 RFC 1951 中定义的 deflate 压缩机制相结合。

* 前端不需要做任何改变，目前浏览器在XHR requests里都会自动添加合适的accept-encoding。
