## 常见问题

* 模板字符串 `引用js变量使用方法：${var}`

* jsx元素<element /> vs jsx变量写法{construction}

* import * 后面一定要跟上as命名别名，否则babel编译异常

* babel并不能直接打包CommonJS代码，浏览器上允许CommonJS代码需要Webpack之类打包

* run build报错未找到fetch.io(import Fetch from 'fetch.io';)模块，原因install有问题，重新install一次

* import导入文件时，使用文件路径按需加载

  `import { concat, sortBy } from 'lodash';  // 加载整个loadsh`

  `import concat from 'lodash/concat';import sortBy from 'lodash/sortBy';   // 只加载loadsh目录下的这两个文件`

* 箭头函数需要写返回值：返回对象或回调函数多条代码语句（代码块）时，必须用大括号包裹，并手动返回值。返回一个变量或者jsx元素集，不用大括号，则自动返回值。"{}"表明回调函数的起始位置和结束位置，如果不返回值，则返回undefined