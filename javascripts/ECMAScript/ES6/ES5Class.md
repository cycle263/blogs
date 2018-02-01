* 1、Class基本语法  
  基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。  

  定义“类”的方法，前面不需要加上function，直接把函数定义。ES6的类，完全可以看作构造函数的另一种写法。  

  另外，类的内部所有定义的方法，都是不可枚举的（enumerable）。  


* 2、super关键字

  ```
  class B extends A {
    constructor(){
      super()
    }
  }
  ```
