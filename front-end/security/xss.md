## XSS

Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。为了和 CSS 区分，这里把攻击的第一个字母改成了 X，于是叫做 XSS。

#### 避免XSS攻击解决方案

- 1、主动替换html, script等标签，包含src、href属性，onclick属性

- 2、特殊字符转义

- 3、CSP(Content Security Policy)内容安全策略检查

  > 只允许加载自己域的图片的话，可以加上下面如下meta标签，可以防止一些XSS注入的跨域请求。

  `<meta http-equiv="Content-Security-Policy" content="img-src 'self';">`

- 4、在 onload、onerror、onclick 等事件中，注入不受控制代码。

- 5、在 style 属性和标签中，包含类似 background-image:url("javascript:..."); 的代码