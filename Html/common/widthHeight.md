## 宽高总结

outerWidth、innerWidth、document.documentElement.clientWidth、document.body.screen.width、screen.availWidth等

* 屏幕相关宽高

  - screen.height：屏幕高度。

  - screen.width：屏幕宽度。

  - screen.availHeight：屏幕可用高度。即屏幕高度减去上下任务栏后的高度，可表示为软件最大化时的高度。

  - screen.availWidth：屏幕可用宽度。即屏幕宽度减去左右任务栏后的宽度，可表示为软件最大化时的宽度。

* 浏览器相关宽高

  - window.outerHeight：浏览器软件的高度。

  - window.outerWidth：浏览器软件的宽度。

  - window.innerHeight：浏览器内页面的可用高度，此高度包含了水平滚动条的高度(若存在)。可表示为浏览器当前高度去除浏览器边框、工具栏，状态栏，地址栏等高度之后的高度。

  - window.innerWidth：浏览器内页面的可用宽度，此宽度包含了垂直滚动条的宽度(若存在)。可表示为浏览器当前宽度去除浏览器边框后的宽度。

* 元素相关宽高

  body.offsetHeight：body总高度。

  body.offsetWidth：body总宽度。

  body.clientHeight：body展示的高度；表示body在浏览器内显示的区域高度。

  body.clientWidth：body展示的宽度；表示body在浏览器内显示的区域宽度。

  body.scrollWidth:

  body.scrollHeight: 

  document.documentElement.clientWidth:

  document.documentElement.clientHeigth: