## polyfill

* shim vs polyfill(腻子)

    > JavaScript的世界里,有两个词经常被提到,shim和polyfill

    - shim是一个库,它将一个新的API引入到一个旧的环境中,而且仅靠旧环境中已有的手段实现.

    - polyfill就是一个用在浏览器API上的shim, 也就是shim的一种。

* 比较常见的shim

    - [Modernizr - 是一个用来检测浏览器功能支持情况的JavaScript库](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)

    - [HTML5shiv](https://github.com/aFarkas/html5shiv)

    - [ie-css3](../css3/ie-css3.htc)

    - [es5-shim](https://github.com/es-shims/es5-shim)


因为 polyfill 模拟标准 API，所以能够以一种面向所有浏览器未来的方式针对这些 API 进行开发，最终目标是：一旦对这些 API 的支持变成绝对大多数，则可以方便地去掉 polyfill，无需做任何额外工作。


jQuery不是polyfill，但下面这段代码是：

```
// 首先包含jQuery
if (!document.querySelectorAll) {
  Element.prototype.querySelectorAll = function (q) {
    return $(this).find(q).get();
  };

  // document对象不是Element对象的后代，
  // 因此手工重写
  document.querySelectorAll = Element.prototype.querySelectorAll;
}
```
