## cookie

ajax和jsonp默认是带上cookie；cors跨域和fetch默认是不带上cookie；

fetch要带上cookie需设置options  -  credentials属性，可设置为include(任意域名都带上)或者same-origin

cors跨域请求，可加上这个option `xhrFields: { withCredentials: true }, crossDomain: true, `

* 1、获取的所有cookie: document.cookie.  

  Cookie是一个键值对形式的字符串。只能用这个方法一次赋值或更新一个cookie。  
  ```js
  example: document.cookie = "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
  ```

* 2、以下可选的cookie属性值跟在键值对后，定义cookie的设定/更新，跟着一个分号以作分隔：  

  -  ;path=path (例如 '/', '/mydir') 如果没有定义，默认为当前文档位置的路径。  
  -  ;domain=domain (例如 'example.com'， '.example.com' (包括所有子域名), 'subdomain.example.com') 如果没有定义，默认为当前文档位   置的路径的域名部分。  
  -  ;max-age=max-age-in-seconds (例如一年为60*60*24*365)  
  -  ;expires=date-in-GMTString-format 如果没有定义，cookie会在对话结束时过期，这个值的格式参见Date.toUTCString()    
  -  ;secure (cookie只通过https协议传输)  

* 3、cookie的值字符串可以用encodeURIComponent()来保证它不包含任何逗号、分号或空格(cookie值中禁止使用这些值).

* `1969-12-31T23:59:59.000Z` 是一个会话周期(session), 临时性Cookie，不会被持久化，也就是关闭你的浏览器后，这个cookie就会消失。这个是chrome特意用来表示会话周期的。

### cookie vs session

* 关联

每次HTTP请求的时候，客户端都会发送相应的Cookie信息到服务端。实际上大多数的应用都是用 Cookie 来实现Session跟踪的，第一次创建Session的时候，服务端会在HTTP协议中告诉客户端，需要在 Cookie 里面记录一个Session ID，以后每次请求把这个会话ID发送到服务器。


* 区别

Session是保存在服务端，cookie保存在客户端

|     Session        |  cookie   |
| ------------------ | --------- |
|     保存在服务端     |    客户端  |


