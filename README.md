## Front-end knowledge summary

**[文章总目录](./menu)**

### 1. [Javascript](./javascripts) 、 [框架](./framework) 、 [ES6](./ECMAScript)

  * **[context vs scope](./javascripts/depth/context)**

  * **[jQuery](./framework/jQuery)**

    jQuery API,  Principle of jQuery

      ```js
      jQuery.fn.myPlugin = function(){}   // jquery plugins
      jQuery.myPlugin = function(){}
      jQuery.extend({
        myPlugin: function(){}
      })
      ```

    [Do not need jQuery](https://github.com/nefe/You-Dont-Need-jQuery)

      ```js
      // jQuery
      $('selector');

      // Native
      document.querySelectorAll('selector');
      ```

  * **[Angularjs](./framework/angular)**

    Angular 1.3, Angular 2 ...

    - Angular 2

      index.html --> boot --> app

    - **[脏检查机制](./framework/angular/双向绑定)**

      指定事件触发后，才进入$digest cycle，$digest ttl默认为10

  * **[Reactjs](./framework/React)、[Redux](./framework/React/redux)、[React-redux](./framework/React/redux/react-redux)**

    > 一个基于 state 和 props 的组件渲染函数，state 是自己的，props 是外面引入的，产生变化就重新渲染一遍。

    - installation  

      `npm i react --save`   

    - get start example  

      ```react
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

    - 将props转换成自己的state

      ```react
      class Child extends Component {
          constructor(props) {
              super(props);
              this.state = {
                  someThings: props.someThings
              };
          }
          componentWillReceiveProps(nextProps) {
              this.setState({someThings: nextProps.someThings});
          }
          render() {
              return <div>{this.state.someThings}</div>
          }
      }
      ```

  * **[Modularity](./structure)**

    AMD, CommonJS, CMD

    - CommonJS: 模块通过 require 方法来同步加载所要依赖的其他模块，然后通过 exports 或 module.exports 来导出需要暴露的接口。

    - AMD: 一个主要接口 define(id?, dependencies?, factory)，它要在声明模块的时候指定所有的依赖 dependencies，并且还要当做形参传到 factory 中，对于依赖的模块提前执行，依赖前置。

    - CMD: 规范和 AMD 很相似，尽量保持简单，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。

  * **[Blob vs ArrayBuffer vs TypeArray](./Html/webAPI)**

    > 二进制数组是JavaScript操作二进制数据的一个接口。(ArrayBuffer对象、TypedArray视图和DataView视图)。三者之间的关系可以理解为：Blob <-> ArrayBuffer <-> TypeArray <—> Array

    - Blob对象：是现代浏览器中提供的能够装载二进制流（文件）的容器对象，该对象代表了一段二进制数据，提供了一系列操作接口。其他操作二进制数据的API（比如File对象），都是建立在Blob对象基础上的，继承了它的属性和方法。

    - ArrayBuffer对象：是能够装载Blob（二进制流）数据的原始缓冲区，代表内存之中的一段二进制数据，ArrayBuffer不能直接通过js读写，但是可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。

    - TypedArray视图：共包括9种类型的视图，比如Uint8Array（无符号8位整数）数组视图, Int16Array（16位整数）数组视图, Float32Array（32位浮点数）数组视图等等。

    - DataView视图：可以自定义复合格式的视图，比如第一个字节是Uint8（无符号8位整数）、第二、三个字节是Int16（16位整数）、第四个字节开始是Float32（32位浮点数）等等，此外还可以自定义字节序。  

    简单说，ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据。

  * **[ECMAScript6](./ECMAScript/ES6/)**

    - ECMAScript6的实现进度  

      [各浏览器实现进度查看](http://kangax.github.io/es5-compat-table/es6/)

    - ES6的转码

      + [Babel转码器](./structure/babel/)，配置文件.babelrc

    - [ES6特性详解](./ECMAScript)

  * **[Debug](front-end/debug/)**  

    - Fiddler, Proxy, sourcemap, Charles

    - dora(dora-plugin-proxy)

### 2. [Css(css库和css3)](./css)

  * **css library**  

    Bootstrap, Antd Design, material design...

  * **样式常识**

    - 行内元素 vs 块元素

    |   行内元素              |   块元素         |
    |   -----------          |  ---------      |
    |   水平排列              |   垂直排列       |
    |   不能包含块元素         |  能包含块元素     |
    | 宽高无效，内外边距上下无效  |  有效           |

    - 常见宽高值(chrome)

      window.innerHeight: viewport height, 浏览器的视窗高度(html文档内容展示区域，包括水平滚动条，不包括书签等调试器区域)。

      window.outerHeight: 浏览器高度，包括页签头、地址栏、书签和状态栏等。

      ![FirefoxInnerVsOuterHeight2](./css/images/FirefoxInnerVsOuterHeight2.png)

      window.screen.height: 显示器屏幕高度。

      window.screen.availHeight: 浏览器窗口在屏幕上可占用的最大高度。

      element.clientHeight: 元素的内部高度，包括内边距，不包括滚动条、边框、外边距和边框。

      element.clientTop: 元素顶部边框的宽度，包括滚动条，不包括内外边距。

      element.scrollHeight: 元素内容的高度，包括溢出的视图高度。没有滚动条情况下，scrollHeight值与元素视图填充所有内容所需要的最小值clientHeight相同。

      element.scrollTop 元素的内容垂直滚动的像素数。没有产生垂直方向的滚动条，那么scrollTop值为0。

      HTMLElement.offsetHeight: 元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。

      HTMLElement.offsetTop: 元素相对于其 offsetParent 元素的顶部的距离。

  * **Css3** 

    Animation

### 3. Html5

  DOCTYPE用于告知浏览器的解析器用什么文档标准解析这个文档。

  * **[canvas](canvas) 画布**

  * **[svg](https://developer.mozilla.org/en-US/docs/SVG)、 [WebGL(3D)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)**

    - svg vs canvas

    | svg | canvas |  
    | --- | ------ |  
    | 使用 XML 描述 2D 图形的语言 | 通过 JavaScript 来绘制 2D 图形 |  
    | SVG 对象的属性发生变化，浏览器能自动重绘图形 | 不会 |  
    | 基于XML，可为每个元素附加事件 | 基于像素，不支持子元素事件 |  
    | 矢量图(自由缩放) | 位图(放大失真) |  
    | 适合复杂度高的大型渲染应用(地图) | 适合图像密集的游戏，或者频繁重绘的应用 |

  * **[语音识别](./Html/webAPI/Audio)**

  * **Web Worker**

    > Web Workers 是 HTML5 提供的一个javascript多线程解决方案，主要用于处理CPU 计算密集型任务和需要长时间运行的任务。

    Web Worker的基本原理就是在当前javascript的主线程中，使用Worker类加载一个javascript文件来开辟一个新的线程，起到互不阻塞执行的效果，并且提供主线程和新线程之间数据交换的接口：postMessage，onmessage。    

    - WEB主线程:  

      1.通过 worker = new Worker( url ) 加载一个JS文件来创建一个worker，同时返回一个worker实例  

      2.通过worker.postMessage( data ) 方法来向worker发送数据。  

      3.绑定worker.onmessage方法来接收worker发送过来的数据。   

      4.可以使用 worker.terminate() 来终止一个worker的执行。  

    - worker新线程：  

        1.通过postMessage( data ) 方法来向主线程发送数据。  

        2.绑定onmessage方法来接收主线程发送过来的数据。  

    - 全局对象

  * **localStorage vs sessionStorage**

    - 储存时间的不同(sessionStorage浏览器关闭自动删除，localStorage长期存在)

    - 储存的容量不同

  * **import vs link**

    - 加载的时间不同(link同时加载)

    - 加载的内容范围不同(@import只能加载css)

    - 兼容范围不同(link无兼容问题，import-css2.1)

### 4. Web和Http

  * **web标准化组织**

    - [W3C](http://www.w3.org)  制定web的标准，包括HTML，CSS

    - [EMCA](http://www.ecma-international.org) 制定JavaScript的标准

    - [IETF](https://www.ietf.org)  制定忘了协议标准，包括HTTP，JSON等

  * **[Http协议(Http2)](http)**
    
    是基于 TCP/IP 协议的应用层协议。它不涉及数据包（packet）传输，主要规定了客户端和服务器之间的通信格式，默认使用80端口。

  * **[ajax轮询](http/ajax/轮询)**

    定时发送ajax请求，但是需要服务器有很快的处理速度和资源。轮询又分为长轮询和短轮询，长轮询则是客户端发起请求，服务端有数据更新则响应，没有则sleep挂起循环，直到有新数据才响应，除非超过一定的时限才会断开连接；短轮询则不分是非有数据更新，都直接响应。用长轮询（long polling）来模拟WebSocket，需要很高的并发量。

  * **[WebSocket](./http/websocket)**

    Websocket是一个持久化的协议，相对于HTTP这种非持久的协议来说.跟HTTP协议基本没有关系，只是为了兼容现有浏览器的握手规范而已，也就是说它是HTTP协议上的一种补充。Web Socket 连接不是基于 HTTP 传输的，它是一种 HTML 5 为 Web 定制的全双工通讯协议，没有“请求 - 响应”的概念，浏览器与服务器完全平等，连接一旦建立就一直开放，双方可随时向对方发送任意数据，没有推拉之分。  

    ws最大的优势：在于服务器和客户端可以在给定的时间范围内的任意时刻，相互推送信息，并且允许跨域通信。  

    目前主流的浏览器都支持WebSocket，并且有第三方的API：Guillermo Rauch创建了一个Socket.IO，遵循Engine.IO协议。  

  * **[请求优化](front-end/performance)**

    - cookie free: 静态资源不同域名，最好CDN，避免发送多余的cookie信息。

    - domain hash: 多个域名加大浏览器的并发量，推荐控制在2-4个，否则DNS解析的消耗得不偿失。

    - css sprites: 合并icon和图片资源，图片压缩和格式(webp)，减少资源总请求数。

    - minify、compress、combine: 合并压缩，减少资源大小。

    - cache-control: max-age，最大缓存化

    - visibility load: 可视区加载，非可视区空白或者loading

  * **Server-Sent Event**

    浏览器向服务器发送一个HTTP请求，然后服务器不断单向地向浏览器推送“信息”（message）。

    ```js
    new EventSource(url);
    ```

    - SSE vs WS

    | Server-Sent Events | WebSocket |
    | ------------------ | --------- |
    | 单向通信，服务端推送  | 双向通信    |
    | 基于http，支持性好   | 新的协议    |
    | 简单，轻量，断线重连  | 较复杂，重连需额外部署 |

### 5. Others(构建打包、模块化解决方案)

  * **Mobile dev**

    Debug, Hybrid App

    - 自适应解决方案

    - 移动端调试技巧

    - 性能优化

  * **[git](team/git)**

    ```js
    $ git clone someobject.git
    $ git add .
    $ git commit -m "message"
    $ git push
    ```

  * **grunt**

  * **[gulp](structure/gulp/)**

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

  * **[webpack](structure/webpack)**  

  * **[markdown](team/Markdown) 常用语法**

  * **常见[shell命令](team/linux)**

  * **[Unicode vs Utf-8 vs ASCII](./http/unicode)对比详解**

  * **[interview](team/interview)**


备注说明: 若代码和图片有侵权，联系必删
