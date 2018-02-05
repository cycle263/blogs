> 一个 浅（shallow） 还是一个 深（deep） 拷贝.

## JavaScript基本数据类型

  * 简单数据类型

    > Undefined、Null、Boolean、Symbol、Number和String，它们值在占据了内存中固定大小的空间，并被保存在栈内存中。当复制基本类型的值，会创建这个值的副本，并且不能给基本数据类型的值添加属性。

  * 复杂数据类型

    > 对象(Object)

      内建对象：String、Number、Boolean、Object、Function、Array、Date、RegExp、Error

## clone分类


## 常见clone方法

  1、JSON大法
    `var newObj = JSON.parse( JSON.stringify( someObj ) );`

  2、Object.assign

  3、递归大法