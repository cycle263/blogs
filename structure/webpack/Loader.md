## Loader

  > Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。Loader 可以理解为是模块和资源的转换器。

* Loader有哪些特性？

  - Loader可以通过管道方式链式调用，但是最后一个loader必须返回js

  - Loader支持同步和异步

  - Loader 运行在 node.js 环境中

  - !符号用于分隔多个loader

  - 每一个 loader 都是一个对象

* 常见的loader

    - style-loader

    - css-loader

    - postcss-loader

    - less-loader

    - babel-loader

    - file-loader 把源文件迁移到指定的目录（可以简单理解为从源文件目录迁移到build目录），并返回新文件的路径（简单拼接而成）。

    - url-loader 将小图片过滤转base64 url，比较大的图片,使用base64就不适合了，编码会和html混在一起，一方面可读性差，另一方面加大了html页面的大小，反而加大了下载页面的大小。

