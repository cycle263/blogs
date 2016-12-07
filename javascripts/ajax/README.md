## 常见知识点

* contentType

  默认值： "application/x-www-form-urlencoded"

  jQuery.ajax 中 contentType 设置为 false 是为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件。

* ajax预检请求

  非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。  

  "预检"请求用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个源。

  - （1）Access-Control-Request-Method

    该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。

  - （2）Access-Control-Request-Headers

    该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header。

  响应：服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。


## 有趣知识点

* js动态添加script的src地址：

  - html含有script元素，但没有src属性，可以动态添加src地址，并且download对应的资源下来；

  - html含有script元素，并有src属性，动态添加src地址不能download对应的资源；

  - js动态创建script元素，则可以多次download动态资源

  - iframe和img元素则可以多次添加src地址，并多次download资源
