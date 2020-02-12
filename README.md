## Front-end knowledge summary

**[文档链接地址，请点击这里！！](https://cycle263.github.io/blogs/)**

**[文章总目录](./menu)**

### 1. [Javascript](./javascripts/) 、 [框架](./framework/) 、 [ES6](./ECMAScript/)

- **[context vs scope](./javascripts/depth/context)**

  作用域是基于函数，js 解释器在创建 执行上下文栈 的时候,会同时创建一个 scope chain（单向链表）。在执行上下文的执行阶段的时候, 当需要访问某个变量时, 会首先在当前的执行上下文的 VO 中查找。如果找不到, 就往链表的下一个位置查找，一直到最后一个位置。

- **[jQuery](./framework/jQuery/)**

  jQuery API, Principle of jQuery

  ```js
  jQuery.fn.myPlugin = function() {}; // jquery plugins
  jQuery.myPlugin = function() {};
  jQuery.extend({
    myPlugin: function() {}
  });
  ```

  [Do not need jQuery](https://github.com/nefe/You-Dont-Need-jQuery)

  ```js
  // jQuery
  $("selector");

  // Native
  document.querySelectorAll("selector");
  ```

- **[Angularjs](./framework/angularjs/)**

  Angular 1.3, Angular 2 ...

  - Angular 2

    index.html --> boot --> app

  - **[脏检查机制](./framework/angularjs/双向绑定)**

    指定事件触发后，才进入$digest cycle，$digest ttl 默认为 10

- **[Reactjs](./framework/React/)、[Redux](./framework/dataManage/redux/)、[React-redux](./framework/dataManage/redux/react-redux)**

  > 一个基于 state 和 props 的组件渲染函数，state 是自己的，props 是外面引入的，产生变化就重新渲染一遍。

  - installation

    `npm i react --save`

  - get start example

    ```jsx
    var HelloMessage = React.createClass({
      render: function() {
        return <div>Hello {this.props.name}</div>;
      }
    });

    ReactDOM.render(
      <HelloMessage name="John" />,
      document.getElementById("container")
    );
    ```

  - 将 props 转换成自己的 state

    ```jsx
    class Child extends Component {
      constructor(props) {
        super(props);
        this.state = {
          someThings: props.someThings
        };
      }
      componentWillReceiveProps(nextProps) {
        this.setState({ someThings: nextProps.someThings });
      }
      render() {
        return <div>{this.state.someThings}</div>;
      }
    }
    ```

  - [dva](./framework/dataManage/dva/)

- **[Modularity](./structure/)**

  AMD, CommonJS, CMD, UMD

  - CommonJS: 模块通过 require 方法来同步加载所要依赖的其他模块，然后通过 exports 或 module.exports 来导出需要暴露的接口。

  - AMD: 一个主要接口 define(id?, dependencies?, factory)，它要在声明模块的时候指定所有的依赖 dependencies，并且还要当做形参传到 factory 中，对于依赖的模块提前执行，依赖前置。

  - CMD: 规范和 AMD 很相似，尽量保持简单，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。

  - UMD: UMD 是 AMD 和 CommonJS 的糅合，它支持 AMD 和 CommonJS 规范，同时还支持古老的全局模块模式。

- **[Blob vs ArrayBuffer vs TypeArray](./Html/webAPI/)**

  > 二进制数组是 JavaScript 操作二进制数据的一个接口。(ArrayBuffer 对象、TypedArray 视图和 DataView 视图)。三者之间的关系可以理解为：Blob <-> ArrayBuffer <-> TypeArray <—> Array

  - Blob 对象：是现代浏览器中提供的能够装载二进制流（文件）的容器对象，该对象代表了一段二进制数据，提供了一系列操作接口。其他操作二进制数据的 API（比如 File 对象），都是建立在 Blob 对象基础上的，继承了它的属性和方法。

  - ArrayBuffer 对象：是能够装载 Blob（二进制流）数据的原始缓冲区，代表内存之中的一段二进制数据，ArrayBuffer 不能直接通过 js 读写，但是可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。

  - TypedArray 视图：共包括 9 种类型的视图，比如 Uint8Array（无符号 8 位整数）数组视图, Int16Array（16 位整数）数组视图, Float32Array（32 位浮点数）数组视图等等。

  - DataView 视图：可以自定义复合格式的视图，比如第一个字节是 Uint8（无符号 8 位整数）、第二、三个字节是 Int16（16 位整数）、第四个字节开始是 Float32（32 位浮点数）等等，此外还可以自定义字节序。

  简单说，ArrayBuffer 对象代表原始的二进制数据，TypedArray 视图用来读写简单类型的二进制数据，DataView 视图用来读写复杂类型的二进制数据。

- **[ECMAScript6](./ECMAScript/ES6/)**

  - ECMAScript6 的实现进度

    [各浏览器实现进度查看](http://kangax.github.io/es5-compat-table/es6/)

  - ES6 的转码

    - [Babel 转码器](./structure/babel/)，配置文件.babelrc

  - [ES6 特性详解](./ECMAScript/)

- **[Debug](front-end/debug/)**

  - Fiddler, Proxy, sourcemap, Charles

  - dora(dora-plugin-proxy)

  - 移动端调试：weinre / vconsole / spy-debugger

### 2. [Css(css 库和 css3)](./css/)

- **css library**

  Bootstrap, Antd Design, material design...

- **样式常识**

  - 行内元素 vs 块元素

  | 行内元素                   | 块元素       |
  | -------------------------- | ------------ |
  | 水平排列                   | 垂直排列     |
  | 不能包含块元素             | 能包含块元素 |
  | 宽高无效，内外边距上下无效 | 有效         |

  - 常见宽高值(chrome)

    window.innerHeight: viewport height, 浏览器的视窗高度(html 文档内容展示区域，包括水平滚动条，不包括书签等调试器区域)。

    window.outerHeight: 浏览器高度，包括页签头、地址栏、书签和状态栏等。

    ![FirefoxInnerVsOuterHeight2](./css/images/FirefoxInnerVsOuterHeight2.png)

    window.screen.height: 显示器屏幕高度。

    window.screen.availHeight: 浏览器窗口在屏幕上可占用的最大高度。

    element.clientHeight: 元素的内部高度，包括内边距，不包括滚动条、边框、外边距和边框。

    element.clientTop: 元素顶部边框的宽度，包括滚动条，不包括内外边距。

    element.scrollHeight: 元素内容的高度，包括溢出的视图高度。没有滚动条情况下，scrollHeight 值与元素视图填充所有内容所需要的最小值 clientHeight 相同。

    element.scrollTop 元素的内容垂直滚动的像素数。没有产生垂直方向的滚动条，那么 scrollTop 值为 0。

    HTMLElement.offsetHeight: 元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。

    HTMLElement.offsetTop: 元素相对于其 offsetParent 元素的顶部的距离。

- **Css3**

  Animation

### 3. Html5

DOCTYPE 用于告知浏览器的解析器用什么文档标准解析这个文档。

- **[canvas](Html/canvas/) 画布**

- **[svg](https://developer.mozilla.org/en-US/docs/SVG)、 [WebGL(3D)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)**

  - svg vs canvas

  | svg                                          | canvas                                 |
  | -------------------------------------------- | -------------------------------------- |
  | 使用 XML 描述 2D 图形的语言                  | 通过 JavaScript 来绘制 2D 图形         |
  | SVG 对象的属性发生变化，浏览器能自动重绘图形 | 不会                                   |
  | 基于 XML，可为每个元素附加事件               | 基于像素，不支持子元素事件             |
  | 矢量图(自由缩放)                             | 位图(放大失真)                         |
  | 适合复杂度高的大型渲染应用(地图)             | 适合图像密集的游戏，或者频繁重绘的应用 |

- **[语音识别](./Html/webAPI/Audio/)**

- **Web Worker**

  > Web Workers 是 HTML5 提供的一个 javascript 多线程解决方案，主要用于处理 CPU 计算密集型任务和需要长时间运行的任务。

  Web Worker 的基本原理就是在当前 javascript 的主线程中，使用 Worker 类加载一个 javascript 文件来开辟一个新的线程，起到互不阻塞执行的效果，并且提供主线程和新线程之间数据交换的接口：postMessage，onmessage。

  - WEB 主线程:

    1.通过 worker = new Worker( url ) 加载一个 JS 文件来创建一个 worker，同时返回一个 worker 实例

    2.通过 worker.postMessage( data ) 方法来向 worker 发送数据。

    3.绑定 worker.onmessage 方法来接收 worker 发送过来的数据。

    4.可以使用 worker.terminate() 来终止一个 worker 的执行。

  - worker 新线程：

    1.通过 postMessage( data ) 方法来向主线程发送数据。

    2.绑定 onmessage 方法来接收主线程发送过来的数据。

  - web worker 通信

    - postMessage，传递字符串或者 json 对象

    - Broadcast Channel，广播通道，允许我们向共享同一个源的所有上下文发送消息。同一个源下的所有的浏览器页签，内联框架（iframe）或者 workers 都可以发送和接收消息。不过，广播信道浏览器兼容性不太好。

  - web workers 分类

    - share worker

    - service worker

      service worker 是 PWA 的核心，实际上是一个在网络应用与浏览器或网络层之间的代理层。它可以拦截网络请求，使得离线访问成为可能。

    - 一般 web worker

- **localStorage vs sessionStorage**

  - 储存时间的不同(sessionStorage 浏览器关闭自动删除，localStorage 长期存在)

  - 储存的容量不同

- **import vs link**

  - 加载的时间不同(link 同时加载)

  - 加载的内容范围不同(@import 只能加载 css)

  - 兼容范围不同(link 无兼容问题，import-css2.1)

### 4. Web 和 Http

- **web 标准化组织**

  - [W3C](http://www.w3.org) 制定 web 的标准，包括 HTML，CSS

  - [EMCA](http://www.ecma-international.org) 制定 JavaScript 的标准

  - [IETF](https://www.ietf.org) 制定忘了协议标准，包括 HTTP，JSON 等

- **[Http 协议(Http2)](http/)**

  是基于 TCP/IP 协议的应用层协议。它不涉及数据包（packet）传输，主要规定了客户端和服务器之间的通信格式，默认使用 80 端口。

- **[ajax 轮询](http/ajax/轮询-节流和防抖)**

  定时发送 ajax 请求，但是需要服务器有很快的处理速度和资源。轮询又分为长轮询和短轮询，长轮询则是客户端发起请求，服务端有数据更新则响应，没有则 sleep 挂起循环，直到有新数据才响应，除非超过一定的时限才会断开连接；短轮询则不分是非有数据更新，都直接响应。用长轮询（long polling）来模拟 WebSocket，需要很高的并发量。

- **[WebSocket](./http/websocket/)**

  Websocket 是一个持久化的协议，相对于 HTTP 这种非持久的协议来说.跟 HTTP 协议基本没有关系，只是为了兼容现有浏览器的握手规范而已，也就是说它是 HTTP 协议上的一种补充。Web Socket 连接不是基于 HTTP 传输的，它是一种 HTML 5 为 Web 定制的全双工通讯协议，没有“请求 - 响应”的概念，浏览器与服务器完全平等，连接一旦建立就一直开放，双方可随时向对方发送任意数据，没有推拉之分。

  ws 最大的优势：在于服务器和客户端可以在给定的时间范围内的任意时刻，相互推送信息，并且允许跨域通信。

  目前主流的浏览器都支持 WebSocket，并且有第三方的 API：Guillermo Rauch 创建了一个 Socket.IO，遵循 Engine.IO 协议。

- **[请求优化](front-end/performance/)**

  - cookie free: 静态资源不同域名，最好 CDN，避免发送多余的 cookie 信息。

  - domain hash: 多个域名加大浏览器的并发量，推荐控制在 2-4 个，否则 DNS 解析的消耗得不偿失。

  - css sprites: 合并 icon 和图片资源，图片压缩和格式(webp)，减少资源总请求数。

  - minify、compress、combine: 合并压缩，减少资源大小。

  - cache-control: max-age，最大缓存化

  - visibility load: 可视区加载，非可视区空白或者 loading

- **Server-Sent Event**

  浏览器向服务器发送一个 HTTP 请求，然后服务器不断单向地向浏览器推送“信息”（message）。

  ```js
  new EventSource(url);
  ```

  - SSE vs WS

  | Server-Sent Events   | WebSocket              |
  | -------------------- | ---------------------- |
  | 单向通信，服务端推送 | 双向通信               |
  | 基于 http，支持性好  | 新的协议               |
  | 简单，轻量，断线重连 | 较复杂，重连需额外部署 |

### 5. Others(构建打包、模块化解决方案)

- **Mobile dev**

  Debug, Hybrid App

  - 自适应解决方案

  - 移动端调试技巧

  - 性能优化

- **[git](team/git/)**

  ```js
  $ git clone someobject.git
  $ git add .
  $ git commit -m "message"
  $ git push
  ```

- **grunt**

- **[gulp](structure/gulp/)**

  gulp 插件：

  - sass 的编译（gulp-ruby-sass）
  - 自动添加 css 前缀（gulp-autoprefixer）
  - 压缩 css（gulp-minify-css）
  - js 代码校验（gulp-jshint）
  - 合并 js 文件（gulp-concat）
  - 压缩 js 代码（gulp-uglify）
  - 压缩图片（gulp-imagemin）
  - 自动刷新页面（gulp-livereload）
  - 图片缓存，只有图片替换了才压缩（gulp-cache）
  - 更改提醒（gulp-notify）
  - 清除文件（del）

- **[webpack](structure/webpack/)**

- **[markdown](team/Markdown/) 常用语法**

- **常见[shell 命令](team/system/)**

- **[Unicode vs Utf-8 vs ASCII](./http/unicode/)对比详解**

- **[interview](team/interview/)**

- [大厂面试知识点目录](./team/interview/summary)

- [电话面试知识点](./team/interview/simpleInterview)

备注说明: 若代码和图片有侵权，联系必删
