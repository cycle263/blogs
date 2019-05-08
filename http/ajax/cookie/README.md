## cookie

cookie 是一个非常具体的东西，指的就是浏览器里面能永久存储的一种数据，仅仅是浏览器实现的一种数据存储功能。

cookie由服务器生成，发送给浏览器，浏览器把cookie以kv形式保存到某个目录下的文本文件内，下一次请求同一网站时会把该cookie发送给服务器。由于cookie是存在客户端上的，所以浏览器加入了一些限制确保cookie不会被恶意使用，同时不会占据太多磁盘空间，所以每个域的cookie数量是有限的。

* 特性

  ajax和jsonp默认是带上cookie；cors跨域和fetch默认是不带上cookie；

  fetch要带上cookie需设置options  -  credentials属性，可设置为include(任意域名都带上)或者same-origin

  cors跨域请求，可加上这个option `xhrFields: { withCredentials: true }, crossDomain: true,`

* 获取的所有cookie

  document.cookie.  

  Cookie是一个键值对形式的字符串。只能用这个方法一次赋值或更新一个cookie。  
  ```js
  example: document.cookie = "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
  ```

* 以下可选的cookie属性值跟在键值对后，定义cookie的设定/更新，跟着一个分号以作分隔：  

  -  ;path=path (例如 '/', '/mydir') 如果没有定义，默认为当前文档位置的路径。  
  -  ;domain=domain (例如 'example.com'， '.example.com' (包括所有子域名), 'subdomain.example.com') 如果没有定义，默认为当前文档位   置的路径的域名部分。  
  -  ;max-age=max-age-in-seconds (例如一年为60*60*24*365)  
  -  ;expires=date-in-GMTString-format 如果没有定义，cookie会在对话结束时过期，这个值的格式参见Date.toUTCString()    
  -  ;secure (cookie只通过https协议传输)  

* cookie的值字符串可以用encodeURIComponent()来保证它不包含任何逗号、分号或空格(cookie值中禁止使用这些值).

* `1969-12-31T23:59:59.000Z` 是一个会话周期(session), 临时性Cookie，不会被持久化，也就是关闭你的浏览器后，这个cookie就会消失。这个是chrome特意用来表示会话周期的。


## session

http请求是无状态的，为了区分不同用户的登录状态，会在服务端生成一个session id，并随着请求一并带过来。但是，服务端保存session id既浪费空间，又缺乏可靠性，特别是在做了负载均衡的情况下，可扩展性成了大问题。

因此，服务端会给用户发放一个token 令牌，并进行HMAC-SHA256算法和密钥进行加密签名，服务端不保存此token，用同样的方式做签名对比，来验证用户的登录状态。

## token

正因为session验证存在的诸多问题，Token身份验证能解决其存在的大部分问题。

* 特性

  - 无状态，可以扩展
  - 跨终端，跨程序
  - 安全

* 验证过程

  `登录请求 -> 服务端验证，返回token -> 客户端储存token，用于后续的每次请求 -> 服务端验证带token的每个请求`


### cookie vs session

* 关联

每次HTTP请求的时候，客户端都会发送相应的Cookie信息到服务端。实际上大多数的应用都是用 Cookie 来实现Session跟踪的，第一次创建Session的时候，服务端会在HTTP协议中告诉客户端，需要在 Cookie 里面记录一个Session ID，以后每次请求把这个会话ID发送到服务器。


* 区别

Session是保存在服务端，cookie保存在客户端

|     Session        |  cookie   |
| ------------------ | --------- |
|     保存在服务端     |    客户端  |


