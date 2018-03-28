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

* clone vs deepclone(拷贝和深度拷贝)

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
```
