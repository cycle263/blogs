### http协议

HTTP是一个客户端终端（用户）和服务器端（网站）请求和应答的标准（TCP）。http1.0默认为非持久连接，到http1.1版本协议，默认为持久连接。持久连接的特点就是，只要任意一端没有明确提出断开连接，则保持TCP连接状态。持久连接的好处在于，减少TCP连接的重复建立和断开造成的额外开销，减轻了服务器的负担，也让请求和响应更早地结束。
通常，由HTTP客户端发起一个请求，创建一个到服务器指定端口（默认是80端口）的TCP连接。HTTP服务器则在那个端口监听客户端的请求。一旦收到请求，服务器会向客户端返回一个状态，比如"HTTP/1.1 200 OK"，以及返回的内容，如请求的文件、错误消息、或者其它信息。

* HTTP/1.1协议中共定义了八种方法：options(预请求), head, get, put, delete, post, trace, connect.

* HTTP/1.1相较于HTTP/1.0协议的区别主要体现在：
  - 缓存处理
  - 带宽优化及网络连接的使用
  - 错误通知的管理
  - 消息在网络中的发送
  - 互联网地址的维护
  - 安全性及完整性

* HTTP状态码的第一个数字代表当前响应的类型：
  - 1xx消息——请求已被服务器接收，继续处理
  - 2xx成功——请求已成功被服务器接收、理解、并接受
  - 3xx重定向——需要后续操作才能完成这一请求
  - 4xx请求错误——请求含有词法错误或者无法被执行
  - 5xx服务器错误——服务器在处理某个正确请求时发生错误


* HTTP响应头

  - Access-Control-Allow-Origin：指定一个允许向该服务器提交请求的URI，所有域用星号表示

    `Access-Control-Allow-Origin: http://mozilla.com`

  - Access-Control-Expose-Headers：设置浏览器允许访问的服务器的头信息的白名单

    `Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header`

  - Access-Control-Allow-Credentials: 告知客户端,当请求的credientials属性是true的时候,响应是否可以被得到
