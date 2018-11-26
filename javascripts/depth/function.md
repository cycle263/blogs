* 1、方法调用

  函数调用将以全局对象作为它的接收者，方法调用将以把它作为属性的对象作为接收者，new运算符将产生新的接收者(实例).
  
* 2、arguments

  使用隐式的arguments对象实现可变参的函数，使用arguments切忌改变它。  
  `[].slice.call(arguments)`，变成真正的数组，可以进行修改。  
  当心引用arguments作用域嵌套，解决方案可以考虑一个局部变量引用。  

* 3、undefined 当作没有值

* 4、使用选项对象使得API更具可读性，并且参数都是可选的，使用extend函数抽象出从选项对象中提取值。
 
  ```js
  function extend(target, source){
    if(source){
      for(var key in source){
        var val = source[key];
        if(typeof val !== "undefined"){
          target[key] = val;
        }
      }
    }
    return target;
  }
  ```
