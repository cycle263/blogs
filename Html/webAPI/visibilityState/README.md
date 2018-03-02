## PageVisibility API

  > PageVisibility API用于判断页面是否处于浏览器的当前窗口，即是否可见。

* 属性

  - document.hidden：返回一个布尔值，表示当前是否被隐藏。

  - document.visibilityState：表示页面当前的状态，可以取三个值，分别是visibile（页面可见）、hidden（页面不可见）、prerender（页面正处于渲染之中，不可见）。

* 事件

  当页面的可见状态发生变化时，会触发VisibilityChange事件（带有浏览器前缀）。

  ```js
  document.addEventListener("visibilitychange", function() {
    console.log( document.visibilityState );
  });
  ```
