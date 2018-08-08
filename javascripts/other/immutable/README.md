## IMMUTABLE

> JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象。为了解决这个问题，一般的做法是使用 shallowCopy（浅拷贝）或 deepCopy（深拷贝）来避免被修改，但这样做造成了 CPU 和内存的浪费。Immutable 可以很好地解决这些问题。

* 概念

Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 Structural Sharing（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

* 数据类型

  - Collection
  - List  有序可重复的列表
  - Map   键值对集合
  - Set   无序且不可重复的列表
  - Record
  - Seq

* 优点

  - Immutable降低了Mutable带来的复杂度，可变（Mutable）数据耦合了Time和Value的概念，造成了数据很难被回溯。
  - Immutable.js 使用了 Structure Sharing 会尽量复用内存，没有被引用的对象会被垃圾回收。
  - Undo/Redo，Copy/Paste，甚至时间旅行这些功能都容易实现
  - 并发安全，适合函数式编程

* 缺点

  - 学习新的API，容易跟原生对象混淆
  - 增加资源文件的大小，压缩后16k，可以考虑（seamless-immutable），只有2k

## Immutable 的常用方法

* fromJS() 深层转换js对象和数组成map对象和list

  `fromJS(json: any, reviver?: (k: any, v: Iterable<any, any>) => any): any`

* is() 判断语法，类似于Object.is

  `is(first: any, second: any): boolean`

* Range() 范围数组，返回indexed

  `Range(start?: number, end?: number, step?: number): Seq.Indexed<number>`

* Repeat() 重复数组

  `Repeat<T>(value: T, times?: number): Seq.Indexed<T>`
