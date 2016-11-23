* 1、jsonp（jQuery，js script），jsonp(json数据的包装)实际上download的一段script脚本，包含中一个全局函数的调用，函数的参数就是服务端传递的json数据，但是无法实现post请求，async参数无效。

* 2、window.postMessage, otherWindow.postMessage(message, targetOrigin)，相应的web worker(new Worker("\*.js"))通用可以调用  
  案例：  http://jsfiddle.net/qfym4epd/2/  

* 3、隐藏的form，target 指向一个隐藏的 iframe，然后调 form 的 submit，服务端返回的结果会刷到 iframe 里。  

* 4、服务器端直接设置header内容：Access-Control-Allow-Origin：\*, Access-Control-Allow-Credentials: true  

* 5、利用Apache转发路由（不是跳转），Win上有WAMP，Linux上有LAMP；且Apache的转发设置起来非常简单方便。开发时甚至可以直接把转发配置为客户端到VS或Eclipse，方便调试；线后把转发切换成客户端到Apache自身或IIS或Tomcat或WebLogic或Nginx等等。  

* 6、用nginx把B网站的数据url反向代理。  

* 7、window.name  

  window.name 的美妙之处：name 值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的name值（2MB）。通过在 iframe
  中加载一个资源，该目标页面将设置frame的name属性。此name属性值可被获取到，以访问 Web 服务发送的信息。但name属性仅对相同域名的
  frame可访问。这意味着为了访问name属性，当远程Web服务页面被加载后，必须导航frame回到原始域(改变src值为原始域的代理页面)。
  同源策略依旧防止其他 frame 访问 name 属性。一旦 name 属性获得，销毁 frame 。  
  案例：http://jsfiddle.net/com7s4rb/  

* 8、hash + iframe
  iframe中嵌套一层与顶层页面同域的页面，比如a中套b，b中套c，其中a、c同域，b做出改变后通过url给c传值.
