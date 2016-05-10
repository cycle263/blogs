* 超链接中href属性的几种写法
(当前页面地址：http://myServer.com/path/children/test.html)
  
  - 1、<a href="page.html">Link</a>  或者 <a href="./page.html">Link</a>
    两种写法都会跳转到http://myServer.com/path/children/page.html
    
  - 2、<a href="../page.html">Link</a>
    此写法会减少一层路径，跳转到http://myServer.com/path/page.html
    
  - 3、<a href="/page.html">Link</a>
    此写法会直接拼写在domain后面，跳转到http://myServer.com/page.html
