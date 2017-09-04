默认情况下，SeaJS 要求所有文件都是标准的 CMD 模块，但现实场景下，有大量 jQuery 插件等非 CMD 模块存在。在 SeaJS 里，通过以下方式，可以直接调用非标准模块。

1、//可以放在在 init.js 里暴露到全局，这样，所有在 init.js 之后载入的文件，就都可以直接通过全局变量来拿 $ 等对象。

  ```
  seajs.use('init')

  //init.js
  define(function(require, exports) {
  	var $ = jQuery = require('jquery');

  	// 暴露到全局
  	window.jQuery = window.$ = $;
  });
  ```

2、// 配置 jquery 并放入预加载项中
  ```
  seajs.config({
    alias: {
      'jquery': 'https://a.alipayobjects.com/static/arale/jquery/1.7.2/jquery.js'
    },
    preload: ["jquery"]
  })

  // 将 jQuery 暴露到全局
  seajs.modify('jquery', function(require, exports) {
    window.jQuery = window.$ = exports
  })
  ```
