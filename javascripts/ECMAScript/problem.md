## 常见问题

* 模板字符串 `引用js变量使用方法：${var}`

* import * 后面一定要跟上as命名别名，否则babel编译异常

* babel并不能直接打包CommonJS代码，浏览器上允许CommonJS代码需要Webpack之类打包

* run build报错未找到fetch.io(import Fetch from 'fetch.io';)模块，原因install有问题，重新install一次
