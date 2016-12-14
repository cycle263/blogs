## charles代理

    > Charles是在Mac下常用的截取网络封包的工具，有两种视图“Structure”(域名分类)和"Sequence"(时间排序)  

* Recording Settings记录设置  

    - Include：包括配置规则的请求会被记录到session中，默认为空  

    - Exclude：不包含配置规则的请求会被记录  

* Map Local

    > Map 功能适合长期地将某一些请求重定向到另一个网络地址或本地文件.  

    勾选enable map local，charles就可以按照规则，把请求的对应目录（或文件）换成本地的目录（或文件）

    如果需要抓取https，则需要勾选Enable SSL proxying，添加想要的域名和端口,否则代理not working

    备注：弹出的编辑窗里不用挨个填，把整个网址输到host，会自动帮你把网址解析成host、path、query等部分  

    ![map setting](images/mapLocal.png)

* Rewrite

    > Rewrite 功能功能适合对某一类网络请求进行一些正则替换，以达到修改结果的目的。  

    location和rule编辑，支持字符匹配和正则表达式    

    Rewrite功能很强大的，包括header的增删改和param的增删改，还有body修改等。

    ![rewrite](../images/rewrite.png)

* Map Remote

    类似于map local, 只是替换成另外一个网址。

* proxy setting

    > 同一个局域网内的其他设备做代理    

    只需要勾选Enable transparent HTTP proxying，默认使用8888端口, 然后在移动设备上设置代理地址：电脑的ip:8888 就可以了


* Throttle Setting(网络延迟设置)



## charles代理手机

* wifi代理设置

  - wifi -> `cycle263`进入高级设置 -> http代理 -> 手动192.168.1.4:8888  

* https代理设置

  - Charles Help -> SSL Proxying -> Install Charles Root Certificate on a Mobile Device

  - 手机端访问弹出框的提示地址`chls.pro/ssl`，出现证书安装页面，点击安装

  - Charles Proxy -> SSL Proxying Settings... -> 勾选Enable SSL Proxying -> Add 需要代理的地址和端口

    `as.alipayobjects.com:443`
