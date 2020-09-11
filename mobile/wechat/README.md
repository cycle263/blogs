## 小程序

所有小程序代码都在 worker 线程上运行，最终在 worker 线程生成一棵 dom tree，再把 dom tree 同步到 render 线程上通过 w/axml 进行渲染。

* 术语解析

  - APPID 公众号和小程序都有一个APPID和appserect

  - openID

    用户唯一标识，OpenID = 用户微信号 & 公众平台APPID（两个数据加密得到的字符串）。请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID。

  - unionID

    同一用户，对同一个微信开放平台下的不同应用，unionid是相同的。因此，拥有多个移动应用、网站应用和公众帐号，可通过获取用户基本信息中的unionid来区分用户的唯一性。

    UnionID = 用户微信号 & 开放平台APPID（两个数据加密得到的字符串）

  - 微信号

    微信用户的唯一标识

* 小程序本质

小程序本质上是运行在 webview 上的一个 H5 应用，代码经过打包后分别运行在 render 线程与 worker 线程，这么做最大的原因是保证平台安全性，不能让开发者控制 render 线程，控制 render 线程将会造成小程序平台方管控困难，比如通过 js dom api 操作 dom 元素，通过 location.href 随意跳转，那整个小程序就完全不可控，可以轻意绕过小程序审核，上线时是个正常小程序，开发者可以随意控制界面上展示的内容或随意跳转到赌博或黄色页面。小程序平台就把 view 与逻辑分离，view 放在 render 线程，提供了一种特殊的语言（微信叫 wxml 、支付宝叫 axml）来写 view，并且不能写入 js 代码，逻辑就放在 worker 线程，由于 worker 并不能操作 dom，所以就解决了上面管控困难的问题

* 登录认证

* vs web

### 参考资料

[小程序session管理](https://www.it-man.cn/archives/post-140.html)