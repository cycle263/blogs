## Loader

  > Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

* Loader 可以理解为是模块和资源的转换器

* Loader有哪些特性？

    - Loader可以通过管道方式链式调用，但是最后一个loader必须返回js

    - Loader支持同步和异步

    - Loader 运行在 node.js 环境中


* 备注

    - !符号用于分隔多个loader
