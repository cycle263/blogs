## **浏览器缓存**

浏览器第一次向服务器发起该请求并拿到请求结果后，将请求结果和缓存标识存入浏览器缓存，浏览器对于缓存的处理是根据第一次请求资源时返回的响应头来确定的。另外，浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识；浏览器每次拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中。

浏览器缓存分为：强制缓存和协商缓存，优先读取强制缓存。

* 强缓存：不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的network选项中可以看到该请求返回200的状态码，并且size显示from disk cache或from memory cache；在浏览器中，浏览器会在js和图片等文件解析执行后直接存入内存缓存中；而css文件则会存入硬盘文件中，所以每次渲染页面都需要从硬盘读取缓存(from disk cache)。
  
强制缓存分为：expires 和 cache-control，其中expires是一个特定的时间，是比较旧的标准；而cache-control是一个具体的时间长度，比较新的标准，优先级也比较高。

**cache-control** 这是一个相对时间，在配置缓存的时候，以秒为单位，用数值表示。当值设为max-age=300时，则代表在这个请求正确返回时间（浏览器也会记录下来）的5分钟内再次加载资源，就会命中强缓存。比如：`Cache-Control: max-age=300`。Cache-Control是http1.1的产物，优先级高于Expires。

  + public：所有内容都将被缓存（客户端和代理服务器都可缓存）。

  + private：所有内容只有客户端可以缓存，代理服务器不可以缓存，Cache-Control的默认取值。

  + no-cache: 强制向源服务器再次验证，响应中包含no-cache，那么缓存服务器则不能对资源进行缓存。需要注意的是，no-cache这个名字有一点误导。设置了no-cache之后，并不是说浏览器就不再缓存数据，只是浏览器在使用缓存数据时，需要先确认一下数据是否还跟服务器保持一致，可以理解为协商缓存

  + no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存

  + max-age: 响应的最大Age值（s）

![cache-control流程](../images/maxage.png)

* 协商缓存：向服务器发送请求，服务器会根据这个请求的request header的一些参数来判断是否命中协商缓存，如果命中，则返回304状态码并带上新的response header通知浏览器从缓存中读取资源；另外协商缓存需要与cache-control共同使用。

协商缓存包括：etag 和 last-modified，last-modified的设置标准是资源的上次修改时间；而etag是为了应对资源修改时间可能很频繁的情况出现的，是基于资源的内容计算出来的值，因此优先级也较高，精度也要优于last-modified。

* 协商缓存与强制缓存的区别在于，强制缓存不需要访问服务器，返回结果是状态码200；协商缓存需要访问服务器，如果命中缓存的话，返回结果是304。

强制缓存优先于协商缓存进行，若强制缓存(Expires和Cache-Control)生效则直接使用缓存，若不生效则进行协商缓存(Last-Modified / If-Modified-Since和Etag / If-None-Match)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，重新获取请求结果，再存入浏览器缓存中；生效则返回304，继续使用缓存。

![强缓存 vs 协商缓存](../images/cache.png)

```js
// 字段优先级，越大越高
cache-control > expires > etag > last-modified

// 协商缓存
last-modified: Wed, 16 May 2018 02:57:16 GMT
if-modified-since: Wed, 16 May 2018 05:55:38 GMT

if-none-match: "D5FC8B85A045FF720547BC36FC872550"
etag: "D5FC8B85A045FF720547BC36FC872550"

// 强制缓存
expires: Thu, 16 May 2019 03:05:59 GMT

cache-control: max-age=31536000
```

备注：post(put)请求不能被缓存，设置了`Cache-Control:no-cache，pragma:no-cache，或Cache-Control:max-age=0`头信息的请求也不能被缓存。https请求可强制缓存。

- 用户行为对浏览器缓存的影响

  + 地址栏访问，链接跳转是正常用户行为，将会触发浏览器缓存机制；

  + F5刷新，浏览器会设置max-age=0，跳过强缓存判断，会进行协商缓存判断；

  + ctrl+F5刷新，跳过强缓存和协商缓存，直接从服务器拉取资源。