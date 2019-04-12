## 闭包深入理解

* 1、闭包的定义  

  函数可以引用定义在其外部作用域的变量，相比创建它们的函数有更长的生命周期。  
  闭包其实就是内部存储其外部变量的引用，并能读写这些变量。  
  ```js
  function test1(a1){
    return function(a2){
     return function(a3){
      console.log(a1, a2, a3);
     }
    }
  }
  test1('cycle')('eat')('something');
  ```