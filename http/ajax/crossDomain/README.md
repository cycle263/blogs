## 出现跨域的几种情况

> 不同域名，不同端口，不同协议，不同子域名，都属于跨域，实际上，跨域是存在于xmlhttprequest，普通的http协议不存在跨域问题，XHR是同源策略的拥簇者。

  [浏览器同源策略](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)

  * 同源策略

  同源策略是浏览器最核心的安全功能，避免遭受XSS、CSFR等攻击。

  同源策略限制内容有：

    - iframe内容

    - Cookie、LocalStorage、IndexedDB 等存储性内容

    - DOM 节点

    - AJAX 请求发送后，结果被浏览器拦截。跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。跨域是为了阻止用户读取到另一个域名下的内容，Ajax 可以获取响应，浏览器认为这不安全，所以拦截了响应。

  但是有三个标签是允许跨域加载资源： img、link、script

### chrome关闭同源策略

```js
// mac
//chrome 浏览器
open -a "Google Chrome" --args --disable-web-security  --user-data-dir
//safari 浏览器 
open -a '/Applications/Safari.app' --args --disable-web-security --user-data-dir 


// linux
chromium-browser --disable-web-security  


// window
"C:\Users\UserName\AppData\Local\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir
```

## cors跨域详细总结

[跨域常见的解决思路](crossDomain)

[跨域详解 - 阮一峰](http://www.ruanyifeng.com/blog/2016/04/cors.html)

[关闭Chrome同源策略](https://www.cnblogs.com/zhongxia/p/5416024.html)