避免XSS攻击解决方案

1、主动替换html, script等标签，包含src属性，onclick属性

2、特殊字符转义

3、CSP(Content Security Policy)内容安全策略检查

  > 只允许加载自己域的图片的话，可以加上下面如下meta标签，可以防止一些XSS注入的跨域请求。

  `<meta http-equiv="Content-Security-Policy" content="img-src 'self';">`
