## CORS方案详解

* CORS请求分类

  判断是简单请求标准：
  
  method为get、post、head之一;
  header头：Accept，Accept-Language，Content-Language，Last-Event-ID之一
  contentType：application/x-www-form-urlencoded、multipart/form-data、text/plain

  - 简单跨域请求

  - 非简单跨域请求

* 跨域xhr安全限制

  - 不能使用setRequestHeader设置自定义header

  - 不能发送和接受cookie
