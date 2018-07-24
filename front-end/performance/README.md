## chrome加载资源的优先级

- （1）每个域每次最多同时加载6个资源（http/1.1）

- （2）CSS具有最高的优先级，最先加载，即使是放在最后面的css也是比前面资源先开始加载

- （3）JS比图片优先加载，即使出现得比图片晚

- （4）只有等CSS都加载完了，才能加载其它的资源，即使这个时候没有达到6个的限制

- （5）head里面的非高优化级的资源最多能先加载一张

- （6）xhr的资源虽然具有高优先级，但是由于它是排在3.js后面的，JS的执行是同步的，所以它排得比较靠后，如果把它排在1.js前面，那么它也会比图片先加载。

![chrome请求资源优先级](../images/load.jpg)


## 请求优化

* cookie free: 静态资源不同域名，最好CDN，避免发送多余的cookie信息。

* domain hash: 多个域名加大浏览器的并发量，推荐控制在2-4个，否则DNS解析的消耗得不偿失。

* css sprites: 合并icon和图片资源，减少资源总请求数。

* minify、compress、combine: 合并压缩，减少资源大小。

* cache-control: max-age，最大缓存化

* visibility load: 可视区加载，非可视区空白或者loading


## [性能和错误监控](monitor)


## 其他方案

* 缓存
    
    ```js
    // 字段优先级，越大越高
    cache-control > expires > etag > last-modified

    last-modified: Wed, 16 May 2018 02:57:16 GMT
    if-modified-since: Wed, 16 May 2018 05:55:38 GMT

    if-none-match: "D5FC8B85A045FF720547BC36FC872550"
    etag: "D5FC8B85A045FF720547BC36FC872550"

    expires: Thu, 16 May 2019 03:05:59 GMT

    cache-control: max-age=31536000
    ```

* 离线包

    离线包核心文件和页面动态的图片资源文件缓存分离，可以更方便地管理缓存，离线包也可以整体提前加载进内存，减少磁盘 IO 耗时。离线包以压缩包的方式下发，同时会经过加密和校验，运营商和第三方无法对其劫持篡改。.离线包可以很方便地根据版本做增量更新。

* 预加载
