## href

* 超链接中href属性的几种写法
(当前页面地址：http://myServer.com/path/children/test.html)
  
  - 1、<a href="page.html">Link</a>  或者 <a href="./page.html">Link</a>
    两种写法都会跳转到http://myServer.com/path/children/page.html
    
  - 2、<a href="../page.html">Link</a>
    此写法会减少一层路径，跳转到http://myServer.com/path/page.html
    
  - 3、<a href="/page.html">Link</a>
    此写法会直接拼写在domain后面，跳转到http://myServer.com/page.html


* href vs src / src vs href

Href 超文本链接，指向网络资源所在位置，如果我们在文档添加`<link href="common.css" />`，浏览器会下载资源并且不会停止对当前文档的处理。也就是启用单独的下载线程异步处理，不会阻塞DOM的加载。

Src source，指向外部资源的位置，如果我们添加`<script src ="js.js"></script>`，浏览器会暂停其他资源的下载和处理，直到该资源加载、编译、执行完毕(图片和框架也是如此)，会阻塞其他资源的处理，这也就是为什么js脚本要放在底部。

简单地来说，src用于替换当前元素, href用于在当前文档和引入资源之间建立联系。