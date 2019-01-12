## svg

  SVG可缩放矢量图形（Scalable Vector Graphics）是基于可扩展标记语言（XML），用于描述二维矢量图形的一种图形格式。SVG是W3C制定的一种新的二维矢量图形格式，也是规范中的网络矢量图形标准。SVG严格遵从XML语法，并用文本格式的描述性语言来描述图像内容，因此是一种和图像分辨率无关的矢量图形格式。

  - svg vs canvas

    图形条纹简单的情况下，一般比位图要小，扁平化UI的今天，大多数情况SVG都会更小。

  | svg | canvas |  
  | --- | ------ |  
  | 使用 XML 描述 2D 图形的语言 | 通过 JavaScript 来绘制 2D 图形 |  
  | SVG 对象的属性发生变化，浏览器能自动重绘图形 | 不会 |  
  | 基于XML，可为每个元素附加事件 | 基于像素，不支持子元素事件 |  
  | 矢量图(自由缩放) | 位图(放大失真) |  
  | 适合复杂度高的大型渲染应用(地图) | 适合图像密集的游戏，或者频繁重绘的应用 |

- svg元素

  * rect元素 - 矩形
  * circle元素 - 圆形
  * ellipse元素 - 椭圆
  * line元素 - 直线
  * polyline - 折线
  * polygon - 多边形
  * path - 路径
    + 移动画笔指令M，画直线指令：L，H，V，闭合指令Z

  * g - 形状组，可以被子元素继承，但是没有X，Y属性
  * svg 根元素，可以相互嵌套
  * def 用于定义在SVG中可重用的元素，def元素不会直接展示出来，可以通过use元素来引用
  * use 通过它来复用def元素，也包括<g>、<symbol>元素，使用<use xlink: href="#id"/>即可调用
  * text 可以用它来实现word中的那种“艺术字”
  * image 可以在SVG中嵌套对应的图片，并可以在图片上和周围做对应的处理

_ svg样式

  * 轮廓 stroke

  * 填充 fill

  * 变换 transform

* 插入SVG文件

  可以用在img、object、embed、iframe等标签，以及CSS的background-image属性。

  ```html
  <img src="circle.svg">
  <object id="object" data="circle.svg" type="image/svg+xml"></object>
  <embed id="embed" src="icon.svg" type="image/svg+xml">
  <iframe id="iframe" src="icon.svg"></iframe>
  ```

* 操作svg DOM

  使用img标签插入SVG文件，则无法获取SVG DOM。使用object、iframe、embed标签，可以获取SVG DOM。

  ```js
  var svgObject = document.getElementById("object").contentDocument;
  var svgIframe = document.getElementById("iframe").contentDocument;
  var svgEmbed = document.getElementById("embed").getSVGDocument();
  ```

* 读取svg源码

  svg文件就是一个XML代码的文本文件，因此可以通过读取XML代码的方式，读取svg源码。

  ```js
  (new XMLSerializer()).serializeToString(document.querySelector('.mysvg'));
  ```

* svg转换成canvas

  ```js
  var img = new Image(),
    svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"}),
    url = URL.createObjectURL(svg);

  img.onload = function() {
  	var canvas = document.getElementById("canvas"),
  	  ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
  };
  img.src = url;
  ```
