# Set vs Map vs WeakMap vs WeakSet

Set（集合） 本身是一种构造函数，用来生成 Set 数据结构，成员是唯一且无序的，没有重复的值。

字典（Map）任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。

集合 是以 [value, value]的形式储存元素，字典 是以 [key, value] 的形式储存。

* Set特点：

  - 1、Set不会包含相同元素, 添加重复不会生效

  - 2、Set的数据存储结构专门为一种操作作了速度优化：包含性检测。has()

  - 3、Set不能提供的则是索引。

* Map特点：

  - 1、键值对

  - 2、类似于对象，但是“键”不限于字符串(字符串-值)，各种类型都可(值-值)

  - 3、Map的键实际上是跟内存地址绑定的(严格相等===来的判断)

* WeakMap和WeakSet

  - 1、WeakMap只支持new、has、get、set 和delete。

  - 2、WeakSet只支持new、has、add和delete。

  - 3、WeakSet的值和WeakMap的键必须是对象，WeakMap 对象的值可以是任意。

  - 4、WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的应用，如果没有其他的变量或属性引用这个对象值，则这个对象将会被垃圾回收掉。WeakMap 弱引用的只是键名，而不是键值，键值依然是正常引用。

  - 5、WeakSet 对象是无法被遍历的（ES6 规定 WeakSet 不可遍历），也没有办法拿到它包含的所有元素
