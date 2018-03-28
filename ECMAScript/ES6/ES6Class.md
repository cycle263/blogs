## ES6 类

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

  基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。ES6的类，完全可以看作构造函数的另一种写法，其实，类的数据类型就是函数，类本身就指向构造函数。

  ```js
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

  - 与ES5一样，类的所有实例共享一个原型对象  

    ```js
    var p1 = new Point(2,3);
    var p2 = new Point(3,2);

    p1.__proto__ === p2.__proto__
    //true
    ```

  - 可以通过实例的__proto__属性为Class添加方法，这样会改变Class的原始定义，影响到所有实例。因此，必须谨慎使用，不推荐这样的写法

  - name属性总是返回紧跟在class关键字后面的类名。

* **Class表达式**

  可以写出立即执行的Class。

  ```js
  const MyClass = class Me {
    getClassName() {
      return Me.name;
    }
  };

  let inst = new MyClass();
  inst.getClassName() // Me
  MyClass.name  // Me
  Me.name // ReferenceError: Me is not defined

  const MyClass = class Me { ... }('name');
  ```

* **Class的继承**

  Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

  ```js
  class ColorPoint extends Point {
    constructor(x, y, color) {
      super(x, y); // 调用父类的constructor(x, y)，继承父类的this对象
      this.color = color;
    }

    toString() {
      return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
  }
  ```

* **类的prototype属性和__proto__属性**
