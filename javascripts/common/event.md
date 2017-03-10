## js 事件

* 捕获和冒泡

  IE不支持在捕获阶段监听事件。

  - event对象的属性

    + cancelable (boolean)，表明该事件是否可以通过调用 event.preventDefault 方法来禁用默认行为。

    + eventPhase (number)，表示当前事件触发在什么阶段。none：0；捕获：1；目标：2；冒泡：3。

    + isTrusted (boolean)，该事件是浏览器触发（用户真实操作触发），还是 JavaScript 代码触发的。
