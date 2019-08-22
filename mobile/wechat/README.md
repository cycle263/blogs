## 小程序

* 术语解析

  - APPID 公众号和小程序都有一个APPID和appserect

  - openID

    用户唯一标识，OpenID = 用户微信号 & 公众平台APPID（两个数据加密得到的字符串）。请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID。

  - unionID

    同一用户，对同一个微信开放平台下的不同应用，unionid是相同的。因此，拥有多个移动应用、网站应用和公众帐号，可通过获取用户基本信息中的unionid来区分用户的唯一性。

    UnionID = 用户微信号 & 开放平台APPID（两个数据加密得到的字符串）

  - 微信号

    微信用户的唯一标识

* 登录认证

* vs web

### 参考资料

[小程序session管理](https://www.it-man.cn/archives/post-140.html)