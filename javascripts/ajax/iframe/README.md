## iframe

* 功能

  - 实现长连接，[基于 Iframe 及 htmlfile 的流（streaming）方式](http://www.ibm.com/developerworks/cn/web/wa-lo-comet/#N10101)


* 缺点 

  - iframe加载等于打开一个新页面，所有的资源都要download下来，内存消耗量大；
  
  - iframe会阻塞主页面的Onload事件；

  - iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载；