## iframe

* 功能

  - 实现长连接，[基于 Iframe 及 htmlfile 的流（streaming）方式](http://www.ibm.com/developerworks/cn/web/wa-lo-comet/#N10101)

  - 跨域通信

  - utf-8和gbk编码之间互转

    在utf8页面需要生成一个gbk的encodeURIComponent字符串，可以通过页面加载一个gbk的iframe，然后主页面与子页面通信的方式实现转换。

  - 实现无刷新文件上传

* 缺点

  - iframe加载等于打开一个新页面，所有的资源都要download下来，内存消耗量大；

  - iframe会阻塞主页面的Onload事件；

  - iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载；
