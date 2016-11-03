## The front-end information summary

#### 1. [Javascript - 框架、ES6](./javascripts)

* [jQuery](./jQuery)

  > jQuery API,  Principle of jQuery

    ```js
    jQuery.fn.myPlugin = function(){}   // jquery plugins
    jQuery.myPlugin = function(){}
    jQuery.extend({
      myPlugin: function(){}
    })
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

  > 一个基于 state 和 props 的组件渲染函数，state 是自己的，props 是外面引入的，产生变化就重新渲染一遍。

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

  > 二进制数组是JavaScript操作二进制数据的一个接口。(ArrayBuffer对象、TypedArray视图和DataView视图)

  - ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。

  - TypedArray视图：共包括9种类型的视图，比如Uint8Array（无符号8位整数）数组视图, Int16Array（16位整数）数组视图, Float32Array（32位浮点数）数组视图等等。

  - DataView视图：可以自定义复合格式的视图，比如第一个字节是Uint8（无符号8位整数）、第二、三个字节是Int16（16位整数）、第四个字节开始是Float32（32位浮点数）等等，此外还可以自定义字节序。  

  简单说，ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据。

* [ECMAScript6](javascripts/ECMAScript)  

  > ES6

  - ECMAScript发展历史

  - ECMAScript6的实现进度  

    [各浏览器实现进度查看](http://kangax.github.io/es5-compat-table/es6/)

  - ES6的转码

    + Babel转码器，配置文件.babelrc

* [Debug](front-end/debug/)  

  > Fiddler, Proxy, sourcemap

    - dora(dora-plugin-proxy)

#### 2. Css(css库和css3)

* css library  

  > Bootstrap, Antd ...

    - 行内元素 vs 块元素

    |   行内元素              |   块元素         |
    |   -----------          |  ---------      |
    |   水平排列              |   垂直排列       |
    |   不能包含块元素         | 能包含块元素     |
    |宽高无效，内外边距上下无效  |有效             |

* Css3  

  > Animation

#### 3. Html5

    > DOCTYPE用于告知浏览器的解析器用什么文档标准解析这个文档。

* [canvas](canvas)

* svg

  - svg vs canvas

  | svg | canvas |  
  | --- | ------ |  
  | 使用 XML 描述 2D 图形的语言 | 通过 JavaScript 来绘制 2D 图形 |  
  | SVG 对象的属性发生变化，浏览器能自动重绘图形 | 不会 |  
  | 基于XML，可为每个元素附加事件 | 基于像素，不支持子元素事件 |  
  | 矢量图(自由缩放) | 位图(放大失真) |  
  | 适合复杂度高的大型渲染应用(地图) | 适合图像密集的游戏，或者频繁重绘的应用 |

* long-polling

    > 用AJAX的long-polling来模拟WebSocket. 但是需要很高的并发量。

* ajax轮询

    > 定时发送ajax请求，但是需要服务器有很快的处理速度和资源。

* Web Worker

    > Web Workers 是 HTML5 提供的一个javascript多线程解决方案.  

    Web Worker的基本原理就是在当前javascript的主线程中，使用Worker类加载一个javascript文件来开辟一个新的线程，起到互不阻塞执行的效果，并且提供主线程和新线程之间数据交换的接口：postMessage，onmessage。    

    - WEB主线程:  

        1.通过 worker = new Worker( url ) 加载一个JS文件来创建一个worker，同时返回一个worker实例。  

        2.通过worker.postMessage( data ) 方法来向worker发送数据。  

        3.绑定worker.onmessage方法来接收worker发送过来的数据。   

        4.可以使用 worker.terminate() 来终止一个worker的执行。  

    - worker新线程：  

        1.通过postMessage( data ) 方法来向主线程发送数据。  

        2.绑定onmessage方法来接收主线程发送过来的数据。  

    - 全局对象

* WebSocket

    > Websocket是一个持久化的协议，相对于HTTP这种非持久的协议来说.跟HTTP协议基本没有关系，只是为了兼容现有浏览器的握手规范而已，也就是说它是HTTP协议上的一种补充.  

    ws最大的优势：在于服务器和客户端可以在给定的时间范围内的任意时刻，相互推送信息，并且允许跨域通信。  

    目前主流的浏览器都支持WebSocket，并且有第三方的API：Guillermo Rauch创建了一个Socket.IO。  

* Server-Sent Event

  > 浏览器向服务器发送一个HTTP请求，然后服务器不断单向地向浏览器推送“信息”（message）。

  ```
  new EventSource(url);
  ```

  - SSE vs WS

  | Server-Sent Events | WebSocket |
  | ------------------ | --------- |
  | 单向通信，服务端推送  | 双向通信    |
  | 基于http，支持性好   | 新的协议    |
  | 简单，轻量，断线重连  | 较复杂，重连需额外部署 |

* localStorage vs sessionStorage

    - 储存时间的不同(sessionStorage浏览器关闭自动删除，localStorage长期存在)

    - 储存的容量不同

* import vs link

    - 加载的时间不同(link同时加载)

    - 加载的内容范围不同(@import只能加载css)

    - 兼容范围不同(link无兼容问题，import-css2.1)

#### 4.web

  * web标准化组织

    - [W3C](http://www.w3.org)  制定web的标准，包括HTML，CSS

    - [EMCA](http://www.ecma-international.org) 制定JavaScript的标准

    - [IETF](https://www.ietf.org)  制定忘了协议标准，包括HTTP，JSON等

  * http协议(http2)

#### 5.Others(打包、模块化...)

* [git](team/git)

  ```cmd
  $ git clone someobject.git
  $ git add .
  $ git commit -m "message"
  $ git push
  ```

* grunt

* [gulp](structure/gulp/)

    gulp插件：  

    + sass的编译（gulp-ruby-sass）
    + 自动添加css前缀（gulp-autoprefixer）
    + 压缩css（gulp-minify-css）
    + js代码校验（gulp-jshint）
    + 合并js文件（gulp-concat）
    + 压缩js代码（gulp-uglify）
    + 压缩图片（gulp-imagemin）
    + 自动刷新页面（gulp-livereload）
    + 图片缓存，只有图片替换了才压缩（gulp-cache）
    + 更改提醒（gulp-notify）
    + 清除文件（del）

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


备注说明: 若代码和图片有侵权，联系必删
