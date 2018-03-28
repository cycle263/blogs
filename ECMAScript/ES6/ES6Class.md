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

  var point = new Point(2, 4);

  point.__proto__ === Point.prototype   // true
  Point.__proto__ === Function.prototype  // true

  Point.constructor === Function    // true
  point.constructor === Point   // true
  Point.prototype.constructor === Point   // true
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

  __proto__属性是一个访问器属性（一个getter函数和一个setter函数）, 通过暴露它访问对象的内部prototype (一个对象或 null)。大多数浏览器的ES5实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。

  __proto__属性已在ECMAScript 6语言规范中标准化，但为了确保Web浏览器的兼容性，推荐使用Object.getPrototypeOf和 Object.setPrototypeOf。

  - 子类的__proto__属性，表示构造函数的继承，总是指向父类。

  - 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

  ```js
  class A { }

  class B extends A { }

  B.__proto__ === A // true
  B.prototype.__proto__ === A.prototype // true

  // B的实例继承A的实例
  Object.setPrototypeOf(B.prototype, A.prototype);

  // B继承A的静态属性
  Object.setPrototypeOf(B, A);

  Object.setPrototypeOf = function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
  }
  ```

* **Extends 的继承目标**

  只要是一个有prototype属性的函数，就能被继承。另外，有三种比较特殊的情况：

  - 子类继承Object类

    ```js
    class A extends Object { }

    A.__proto__ === Object // true
    A.prototype.__proto__ === Object.prototype // true
    ```

  - 不存在任何继承

    ```js
    class A { }

    A.__proto__ === Function.prototype  // true
    A.prototype.__proto__ === Object.prototype  // true
    
    Function.__proto__ === Function.prototype   // true
    Object.__proto__ === Function.prototype   // true
    Function.prototype.__proto__ === Object.prototype   // true
    Object.prototype.__proto__ === null   // true

    Function instanceof Object   // true 
    Object instanceof Function   // true 
    Function instanceof Function  // true
    Object instanceof Object   // true
    Number instanceof Object   // true
    Number instanceof Function   // true
    Number instanceof Number   // false
    ```

  - 子类继承null