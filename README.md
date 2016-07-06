## The front-end information summary

#### 1. [Javascript](./javascripts)

* [jQuery](./jQuery)

  > jQuery API,  Principle of jQuery

    ```js
    jQuery.extend()
    ```

  > Do not need jQuery

    ```js
    // jQuery
    $('selector');

    // Native
    document.querySelectorAll('selector');
    ```

* Mobile dev

  > Debug, Hybrid App

  - 自适应解决方案

  - 移动端调试技巧

  - 性能优化

* Angularjs

  > Angular 1.3, Angular 2 ...

  - Angular 2

    `index.html --> boot --> app`

* [Reactjs](./React)

  > React rounter, React diff

  - installation  

   `npm i react --save`   

  - examples  

  ```
  var HelloMessage = React.createClass({
    render: function() {
      return <div>Hello {this.props.name}</div>;
    }
  });

  ReactDOM.render(
    <HelloMessage name="John" />,
    document.getElementById('container')
  );
  ```

* [Modularity](./structure)

  > AMD, CommonJS, CMD

  - CommonJS: 模块通过 require 方法来同步加载所要依赖的其他模块，然后通过 exports 或 module.exports 来导出需要暴露的接口。

  - AMD: 一个主要接口 define(id?, dependencies?, factory)，它要在声明模块的时候指定所有的依赖 dependencies，并且还要当做形参传到 factory 中，对于依赖的模块提前执行，依赖前置。

  - CMD: 规范和 AMD 很相似，尽量保持简单，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。

* Nodejs

* [ECMAScript6](javascripts/ECMAScript)  

  > ES6

  - ECMAScript发展历史

  - ECMAScript6的实现进度  

    [各浏览器实现进度查看](http://kangax.github.io/es5-compat-table/es6/)

  - ES6的转码

    + Babel转码器，配置文件.babelrc

* [Debug](front-end/debug/)  

  > Fiddler, Proxy, sourcemap

#### 2. Css

* css library  

  > Bootstrap, Antd ...

    - 行内元素 vs 块元素

    |   行内元素              |   块元素         |
    |   ----                 |  ----          |
    |   水平排列              |   垂直排列       |
    |   不能包含块元素         | 能包含块元素     |
    |宽高无效，内外边距上下无效  |有效             |

* Css3  

  > Animation

#### 3. Html5

    > DOCTYPE用于告知浏览器的解析器用什么文档标准解析这个文档。

* [canvas](canvas)

* svg

* long-polling

* pipeline

* web worker

* Server-Sent Event

* localStorage vs sessionStorage

* import vs link

    - 加载的时间不同(link同时加载)、加载的内容范围不同(@import只能加载css)、兼容范围不同(link无兼容问题，import-css2.1)

#### 4.web

  * web标准化组织

    - [W3C](http://www.w3.org)  制定web的标准，包括HTML，CSS

    - [EMCA](http://www.ecma-international.org) 制定JavaScript的标准

    - [IETF](https://www.ietf.org)  制定忘了协议标准，包括HTTP，JSON等

#### 5.Others

* [git](team/git)

  ```cmd
  $ git clone someobject.git
  $ git add .
  $ git commit -m "message"
  $ git push
  ```

* grunt

* velocity

* [gulp](structure/gulp/)

* [webpack](structure/)  

  webpack.config.js案例：  

  ```
  var path = require('path');
  var HtmlwebpackPlugin = require('html-webpack-plugin');
  //定义了一些文件夹的路径
  var ROOT_PATH = path.resolve(__dirname);
  var APP_PATH = path.resolve(ROOT_PATH, 'src');
  var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
  var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

  module.exports = {
      entry: {
          app: "./src/entry.js",
          mobile: path.resolve(APP_PATH, 'entry.js')
      },
      output: {
          path: BUILD_PATH,
          filename: "[name].[hash].js"
      },
      module: {
          loaders: [{
              test: /\.js|jsx$/,
              loaders: ['babel?presets[]=es2015&presets[]=react'],
              exclude: /node_modules/
          }]
      },
      resolve: {
          extensions: ['', '.js', '.jsx']
      },
      plugins: [
          new HtmlwebpackPlugin({
              title: 'PC app',
              template: path.resolve(TEM_PATH, 'index.html'),
              filename: 'index.html',
              chunks: ['app'],
              inject: 'body'
          }),
          new HtmlwebpackPlugin({
              title: 'Mobile app',
              template: path.resolve(TEM_PATH, 'mobile.html'),
              filename: 'mobile.html',
              chunks: ['mobile'],
              inject: 'body'
          })
      ]
  };

  ```
