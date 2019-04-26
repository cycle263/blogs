## JavaScript的事件

- DOM事件

  DOM0事件只能绑定一次，后面的会覆盖前面的绑定。 DOM3则会叠加，先后顺序执行

- 事件冒泡和事件捕获

  冒泡的终点是document元素，捕获的终点是目标元素。一般浏览器的实现都是，先捕获后冒泡。

  IE不支持在捕获阶段监听事件。

  - event对象的属性

    + cancelable (boolean)，表明该事件是否可以通过调用 event.preventDefault 方法来禁用默认行为。

    + eventPhase (number)，表示当前事件触发在什么阶段。none：0；捕获：1；目标：2；冒泡：3。

    + isTrusted (boolean)，该事件是浏览器触发（用户真实操作触发），还是 JavaScript 代码触发的。

- 不支持冒泡的事件

  mouseleave、focus、blur这三个事件不会冒泡

[详细的事件分类参见](https://developer.mozilla.org/zh-CN/docs/Web/Events)
