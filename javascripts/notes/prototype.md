## 原型

* 原型链的顶端指向null

  ```
  function Somebody(name, age){
    this.name = name;
    this.age = age;
  }
  var p1 = new Somebody('Pater', 22);
  var p2 = new Somebody('Cycle', 23);
  Object.getPrototypeOf(p1) === Somebody.prototype;     // true
  Object.getPrototypeOf(Somebody.prototype) === Function.prototype;     // true
  Object.getPrototypeOf(Function.prototype) === Object.prototype;       // true
  Object.getPrototypeOf(Object.prototype) === null;     // true
  ```