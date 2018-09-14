## 知识点

* 相等操作符 ==

  在转换不同的数据类型时，相等和不相等操作符遵循下列基本规则：

  - 1. 如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false转换为0，而true转换为1；

  - 2. 如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值；

  - 3. 如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf()方法，用得到的基本类型值按照前面的规则进行比较；

  ```
  'true' === true // false
  // true ==> 1, 'true' ==> Number('true') ==> NaN  // NaN与任何值都不相等，包括NaN本身。
  ```

* hasOwnProperty vs in操作符

  + in 操作符会检查属性是否存在于对象中，或者是否存在于 [[Prototype]] 链对象中

  + hasOwnProperty(..) 仅仅检查 myObject 是否拥有属性，但不会查询 [[Prototype]] 链对象

* clone vs deepclone (浅拷贝和深度拷贝)

  浅度拷贝，只是拷贝引用地址，并不会新开一块内存地址。拷贝后的引用都是指向同一个对象的实例，彼此之间的操作会互相影响。Array.prototype.slice(), Array.prototype.concat(), jQury的$.extend({},obj)等为浅拷贝。

  深度拷贝，新分配一块内存地址，用递归方法完全复制所有的内容，包括子节点。拷贝后的对象与原来的对象是完全隔离，互不影响。例如：JOSN.stringify方式、$.extend(true,{},obj)、_.cloneDeep都为深度拷贝，而Object.assign只能拷贝一层。

```js
// method 1
var deepClone = function (obj) {
    var _tmp,result;
    _tmp = JSON.stringify(obj);
    result = JSON.parse(_tmp);
    return result;
}

// method 2
var deepClone = function fnDeepClone(obj){
  var result = typeof obj.splice === 'function'?[]:{},
  key;
  if (obj && typeof obj === 'object'){
    for (key in obj ){
      if (obj[key] && typeof obj[key] === 'object'){
        result[key] = fnDeepClone(obj[key]); //属性值为object，递归调用deepClone
      }else{
        result[key] = obj[key]; //属性值不为object，直接复制参数对象的每一个键/值
      }
    }
    return result;
  }
  return obj;
}

// method 3
var deepClone = function (o){
  var copy = Object.create( Object.getPrototypeOf(o) );
  var propNames = Object.getOwnPropertyNames(o);

  propNames.forEach(function(name){    
    var desc = Object.getOwnPropertyDescriptor(o, name);   
    Object.defineProperty(copy, name, desc);        
  });

  return copy;
}

// method 4
loadsh.deepclone

// method 5
$.extend
```

* 引用类型 vs 值类型

 Number、String 之类的值类型数据会被直接压入栈中，而引用类型只会压入对该值的一个索引，用 C 语言的概念来解释就是只保存了数据的指针，这些数据是储存在堆中的某块区间中。栈堆并不是独立的，栈也可以在堆中存放。
