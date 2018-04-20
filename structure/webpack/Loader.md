## Loader

  > Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。Loader 可以理解为是模块和资源的转换器。

* Loader有哪些特性？

  - Loader可以通过管道方式链式调用，但是最后一个loader必须返回js

  - Loader支持同步和异步

  - Loader 运行在 node.js 环境中

  - !符号用于分隔多个loader

  - 每一个 loader 都是一个对象

* 常见的loader

  - html-loader 导出 HTML 为字符串，需要引用静态资源

  - style-loader 将模块的导出作为样式添加到 DOM 中

  - css-loader 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码

  - postcss-loader 使用 PostCSS 加载和转译 CSS/SSS 文件。另外，autoprefixer是postcss的一个插件, 在新的css属性上加前缀，如：'-webkit-'

  - less-loader 加载和转译 LESS 文件

  - babel-loader 加载 ES2015+ 代码，然后使用 Babel 转译为 ES5

    ```js
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['env', 'react', 'es2017']
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

