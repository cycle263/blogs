## Loader

  > Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。Loader 可以理解为是模块和资源的转换器。

  webpack 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。你可以使用 Node.js 来很简单地编写自己的 loader。loader 通过在 require() 语句中使用 loadername! 前缀来激活，或者通过 webpack 配置中的正则表达式来自动应用

* Loader有哪些特性？

  - Loader可以通过管道方式链式调用，但是最后一个loader必须返回js

  - Loader支持同步和异步

  - Loader 运行在 node.js 环境中

  - !符号用于分隔多个loader

  - 每一个 loader 都是一个对象

* 常见的loader

  - html-loader 导出 HTML 为字符串，需要引用静态资源

  - style-loader 将模块的导出作为样式添加到 DOM 中

  - css-loader 解析CSS文件后，使用import加载，并且返回CSS代码，参数module开启避免模块之间的样式干扰，也就是className值hash化。

  - postcss-loader 使用 PostCSS 加载和转译 CSS/SSS 文件。另外，autoprefixer是postcss的一个插件, 在新的css属性上加前缀，如：'-webkit-'

  - less-loader 加载和转译 LESS 文件

  - json-loader 加载 JSON 文件（默认包含）

  - markdown-loader 将 Markdown 转译为 HTML

  - towebp-loader 根据图片类型转换成一份webp和原图两份图片，并且集成了url-loader的功能 支持url的limit功能和file-loader文件名的功能。

  - cache-loader 在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里。保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 loader。

  - expose-loader 用来把模块暴露到全局变量
  
    ```js
    {
      test: require.resolve('jquery'),  // require.resolve 用来得到模块对应的绝对路径
      loader: 'expose-loader?$!expose-loader?jQuery'
    }
    ```

  - babel-loader 加载 ES2015+ 代码，然后使用 Babel 转译为 ES5

  ```js
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      presets: ['env', 'react', 'es2017'],
      plugins: ['syntax-dynamic-import']  // 动态引入chunk, `import(/* webpackChunkName: "my-chunk-name" */'moment').then`
    }
  }
  ```

  - file-loader 把源文件迁移到指定的目录（可以简单理解为从源文件目录迁移到build目录），并返回新文件的路径（简单拼接而成）。

  - url-loader 将源文件转换成DataUrl(声明文件mimetype的base64编码)。比较大的图片,使用base64就不适合了，编码会和html混在一起，一方面可读性差，另一方面加大了html页面的大小，反而加大了下载页面的大小。

  ```js
  module: {
    loaders: [{
      test: /\.(png|jpg|gif)$/,
      limit: 8192, // 大于8192字节的正常打包，小于8192字节的以base64的方式引入
      name: images/[hash:8]-[name].[ext],
      loader: 'url-loader' 
    }]
  }
  ```

  ```js
  /\.(eot|ttf|woff|woff2)(\?.*)?$/ //使用 url-loader；
  /\.(aac|m4a|mp3|oga|ogg|wav)$/ //使用 file-loader；
  /\.(gif|ico|jpg|jpeg|png|svg|webp)$/ //使用 url-loader；
  /\.(mp4|webm)$/ //使用 file-loader
  ```

