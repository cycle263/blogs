## 类

* **曾经的构造函数**

```js
function Point(x,y){
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
```

* **Class基本语法**  
  基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。  
  ES6的类，完全可以看作构造函数的另一种写法，其实，类的数据类型就是函数，类本身就指向构造函数。

  ```es6
  // 定义类
  class Point {
    constructor(x, y) {   // 构造方法
      this.x = x;
      this.y = y;
    }

    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }
  ```

* **ES6 Class的特性**

  - 类和模块的内部，默认就是严格模式

  - Class也不存在变量提升(hoist)

  - 类的内部所有定义的方法，都是不可枚举的（enumerable）

* **super关键字**

  ```
  class B extends A {
    constructor(){
      super()
    }
  }
  ```
