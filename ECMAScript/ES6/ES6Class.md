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

  推荐规范写法：继承类的构造函数一定调用 super(), 非继承类的构造函数一定不调用 super()。禁止在构造函数的 super() 执行之前使用 this。

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

  - 可以通过实例的__proto__属性为Class添加方法，这样会改变Class的原始定义，影响到所有实例。因此，必须谨慎使用，不推荐这样的写法，另外，new、Object.create和Object.setPrototypeOf可以设置__proto__，但推荐使用Object.getPrototypeOf和 Object.setPrototypeOf。

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
    ({}).__proto__ === Object.prototype   // true
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

    ```js
    class A extends null { }

    A.__proto__ === Function.prototype // true
    A.prototype.__proto__ === undefined // true
    ```

* **原生构造函数的继承**

  ES6可以自定义原生数据结构（比如Array、String等）的子类，这是ES5无法做到的。

  ECMAScript的原生构造函数：
  Boolean()、Number()、String()、Array()、Date()、Function()、RegExp()、Error()、Object()。

  ES5是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。ES6允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。

  ```js
  class VersionedArray extends Array {
    constructor() {
      super();
      this.history = [[]];
    }
    commit() {
      this.history.push(this.slice());
    }
    revert() {
      this.splice(0, this.length, ...this.history[this.history.length - 1]);
    }
  }

  var x = new VersionedArray();

  x.push(1);
  x.push(2);
  x // [1, 2]
  x.history // [[]]

  x.commit();
  x.history // [[], [1, 2]]
  x.push(3);
  x // [1, 2, 3]

  x.revert();
  x // [1, 2]
  ```

* **Class的取值函数（getter）和存值函数（setter）**

  与ES5一样，在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

  ```js
  class MyClass {
    constructor() {
      // ...
    }
    get prop() {
      return 'getter';
    }
    set prop(value) {
      console.log('setter: '+value);
    }
  }

  let inst = new MyClass();

  inst.prop = 123;
  // setter: 123

  inst.prop
  // 'getter'
  ```

* **Class的Generator方法**
  
  如果某个方法之前加上星号（*），就表示该方法是一个Generator函数。

  ```js
  class Foo {
    constructor(...args) {
      this.args = args;
    }
    * [Symbol.iterator]() {
      for (let arg of this.args) {
        yield arg;
      }
    }
  }

  for (let x of new Foo('hello', 'world')) {
    console.log(x);
  }
  // hello
  // world
  ```

* **Class的静态方法**

  类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
  静态方法可以被子类继承，也可以用super对象调用。

  ```js
  class Foo {
    static classMethod() {
      return 'hello';
    }
  }

  Foo.classMethod() // 'hello'

  var foo = new Foo();
  foo.classMethod()
  // TypeError: undefined is not a function
  ```

* **Class的静态属性**

  ES6明确规定，Class内部只有静态方法，没有静态属性。ES7有一个静态属性的提案，目前Babel转码器支持。这个提案对实例属性和静态属性，都规定了新的写法。

  ```js
  // ES 6的写法
  class Foo {
    prop: 2     // 错误写法一
    static prop: 2    // 错误写法二
  }

  Foo.prop // undefined   正确写法

  // ES 7的写法
  class Foo {
    static prop = 1;  // 静态属性
    state = {};   // 实例属性
  }
  ```

* **new.target属性**

  ES6为new命令引入了一个new.target属性，（在构造函数中）返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined。需要注意的是，子类继承父类时，new.target会返回子类，利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。

  ```js
  function Person(name) {
    if (new.target === Person) {
      this.name = name;
    } else {
      throw new Error('必须使用new生成实例');
    }
  }

  var person = new Person('张三'); // 正确
  var notAPerson = Person.call(person, '张三');  // 报错
  ```

## Mixin模式的实现

  > Mixin模式指的是，将多个类的接口“混入”（mix in）另一个类。

  ```js
  function mix(...mixins) {
    class Mix {}

    for (let mixin of mixins) {
      copyProperties(Mix, mixin);
      copyProperties(Mix.prototype, mixin.prototype);
    }

    return Mix;
  }

  function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
      if ( key !== "constructor" && key !== "prototype" && key !== "name" ) {
        let desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  }

  // 使用
  class DistributedEdit extends mix(Loggable, Serializable) { }
  ```