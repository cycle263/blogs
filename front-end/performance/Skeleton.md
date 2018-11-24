## Skeleton 骨架屏

骨架屏，就是使用内容和结构相似的各种形状的灰色矩形或低像素图片（色块）来模拟图片和文字，并以最快的速度展示出页面效果，以达到更好的交互体验。

* 前后端渲染

  - 前端渲染，目前主流的三大框架单页面渲染，服务端先返回的空html容器，然后js异步获取内容进行页面渲染。在 JS 渲染出实际内容之前，骨架屏就是一个很好的替补队员。

  - 服务端渲染，不需要骨架屏。因为页面的内容直接存在于 HTML，所以使用骨架屏的必要。

* 实现步骤

  - 向空容器填充骨架html，常用的方式使用base64编码格式的骨架图片，快速高效

  - 执行js渲染页面真正内容之前，删除之前填充的骨架html内容

```html
<html>
  <head>
    <style>
      .skeleton-wrapper {
        // styles
      }
    </style>
    <!-- 声明 meta 或者引入其他 CSS -->
  </head>
  <body>
    <div id="app">
      <div class="skeleton-wrapper">
         <img src="data:image/svg+xml;base64,XXXXXX">
      </div>
    </div>
    <!-- 引用 JS -->
  </body>
</html>
```