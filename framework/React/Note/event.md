## react合成事件

* 在react里面，如果在异步函数里获取合成事件的属性，结果会是null；解决方案：可以在异步函数之前用变量缓存合成事件的属性值。

* 将合成事件作为props传给子组件，会有警告信息提示；解决方案同上。

`Warning: This synthetic event is reused for performance reasons. If you're seeing this, you're accessing the property target on a released/nullified synthetic event. This is set to null. If you must keep the original synthetic event around, use event.persist(). See https://fb.me/react-event-poo... for more information.`

## vs 原生事件

* target值不同

* 属性值有差别