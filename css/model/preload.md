## preload vs prefetch

`<link rel="preload" />` 和 `<link rel="prefetch" />`

```html

<link rel="preload" as="script" href="async_script.js"
onload="var script = document.createElement('script');
  script.src = this.href;
  document.body.appendChild(script);">
```

* preload

  preload 是声明式的 fetch，提高加载的优先级，强制浏览器优先请求资源，同时不阻塞文档 onload 事件。

  `<link rel="preload" href="late_discovered_thing.js" as="script">`
  `<meta http-equiv="Link" content="</images/big.jpeg>; rel=prefetch">`

  as属性值："script", "font", "style", "image", "media", "document"

  ```js
  var preload = document.createElement("link");
  link.href = "myscript.js";
  link.rel = "preload";
  link.as = "script";
  document.head.appendChild(link);
  ```

* Prefetch 

  提示浏览器这个资源将来可能需要，但是把决定是否和什么时间加载这个资源的决定权交给浏览器。