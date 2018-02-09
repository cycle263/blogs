## request response

* HTTP响应头

  - Access-Control-Allow-Origin：指定一个允许向该服务器提交请求的URI，所有域用星号表示

    `Access-Control-Allow-Origin: http://mozilla.com`

  - Access-Control-Expose-Headers：设置浏览器允许访问的服务器的头信息的白名单

    `Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header`

  - Access-Control-Allow-Credentials: 告知客户端,当请求的credientials属性是true的时候,响应是否可以被得到
