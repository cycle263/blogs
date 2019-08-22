## forceUpdate

forceUpdate就是重新render，可以理解为，无法监听到的state，又需要执行render时调用。
有些变量不在state上，但是你又想达到这个变量更新的时候，刷新render；
或者state里的某个变量层次太深，也就是深结构数据，更新的时候没有自动触发render。这些时候都可以手动调用forceUpdate自动触发render。所以建议使用immutable来操作state，redux等flux架构来管理state。


```js
this.forceUpdate();
```