1、DOCTYPE: DOCTYPE(Document Type)，该声明位于文档中最前面的位置，处于html标签之前，告知浏览器文档使用哪种HTML或者XHTML规范。(严格、过度，html5等)

2、charset属性 `<meta charset="utf-8">` 和 `<meta http-equiv="Content-Type" content="text/html; charset=utf-8">` 写法，在html5中是等效的。

3、lang属性 单一的 zh 和 zh-CN 均属于废弃用法。问题主要在于，zh 现在不是语言code了，而是macrolang，能作为语言code的是cmn（国语）、yue（粤语）、wuu（吴语）等。我通常建议写成 zh-cmn 而不是光写 cmn，主要是考虑兼容性（至少可匹配 zh），有不少软件和框架还没有据此更新。
  - zh-cmn-Hans：简体中文；
  - zh-cmn-Hant：繁体中文
  
4、meta元素

  优先使用 IE 最新版本和 Chrome：`<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">`，这样写的好处：如果安装了 Google Chrome Frame，则使用 GCF 来渲染页面，如果没有安装 GCF，则使用最高版本的 IE 内核进行渲染。

  通过手机百度搜索打开的网页，可能会被百度主动转码，以去掉那些在手机上不能很好显示的页面功能。  
  不希望自己的站点被转码:

  - a. HTTP Response中显式声明Cache-control为no-siteapp。
  - b. meta标签中显式声明Cache-control为no-siteapp，格式为：`<meta http-equiv="Cache-Control" content="no-siteapp">`

5、SEO优化部分

  - 页面标题`<title>`标签: `<title>your title</title>`
  - 页面关键词 keywords: `<meta name="keywords" content="your keywords">`
  - 页面描述内容 description: `<meta name="description" content="your description">`
  - 定义网页作者 author: `<meta name="author" content="author,email address">`
  - 定义网页搜索引擎索引方式: `<meta name="robots" content="index,follow">`

6、viewport属性

  手机浏览器是把页面放在一个虚拟的“窗口”（viewport）中，通常这个虚拟的“窗口”（viewport）比屏幕宽，这样就不用把每个网页挤到很小的窗口中（这样会破坏没有针对手机浏览器优化的网页的布局），用户可以通过平移和缩放来看网页的不同部分。移动版的 Safari 浏览器最新引进了 viewport 这个 meta tag，让网页开发者来控制 viewport 的大小和缩放，其他手机浏览器也基本支持。

  `<meta name=”viewport” content=”width=device-width, initial-scale=1, maximum-scale=1″>`

  - width：控制 viewport 的大小，可以指定的一个值，如果 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。
  - height：和 width 相对应，指定高度。
  - initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
  - maximum-scale：允许用户缩放到的最大比例。
  - minimum-scale：允许用户缩放到的最小比例。
  - user-scalable：用户是否可以手动缩放



