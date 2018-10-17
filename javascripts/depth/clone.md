> 一个 浅（shallow） 还是一个 深（deep） 拷贝.

## JavaScript基本数据类型

* 简单数据类型

  > Undefined、Null、Boolean、Symbol、Number和String，它们值在占据了内存中固定大小的空间，并被保存在栈内存中。当复制基本类型的值，会创建这个值的副本，并且不能给基本数据类型的值添加属性。

* 复杂数据类型

  > 对象(Object)

    内建对象：String、Number、Boolean、Object、Function、Array、Date、RegExp、Error

## clone分类

* 浅克隆，只是拷贝引用地址，并不会新开一块内存地址。拷贝后的引用都是指向同一个对象的实例，彼此之间的操作会互相影响。Array.prototype.slice(), Array.prototype.concat(), jQury的$.extend({},obj)等为浅拷贝。

* 深克隆，新分配一块内存地址，用递归方法完全复制所有的内容，包括子节点。拷贝后的对象与原来的对象是完全隔离，互不影响。例如：JOSN.stringify方式、$.extend(true,{},obj)、_.cloneDeep都为深度拷贝，而Object.assign只能拷贝一层。

## 常见clone方法

- 1、JSON大法

  局限性：会忽略undefined，不能序列化函数，不能解决循环引用的对象。

  `var newObj = JSON.parse( JSON.stringify( someObj ) );`

- 2、Object.assign

- 3、递归大法

- 4、$.extend( [deep ], target, object1 [, objectN ] )

- 5、lodash.cloneDeep

- 6、MessageChannel的postMessage和Worker的postMessage，都是深复制数据传递，但也不能序列化函数