## Iterator迭代器

Javascript集合数据结构主要有数组(Array)和对象(Object)，已经ES6新增的Map和Set。遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

* **Iterator的作用有三个**

  - 是为各种数据结构，提供一个统一的、简便的访问接口；

  - 是使得数据结构的成员能够按某种次序排列；

  - 是ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费。

* **Iterator的遍历过程**

  - （1）创建一个指针，指向当前数据结构的起始位置。也就是说，遍历器的返回值是一个指针对象。

  - （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

  - （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

  - （4）调用指针对象的next方法，直到它指向数据结构的结束位置。

  ```js
  var it = makeIterator(['a', 'b']);

  it.next() // { value: "a", done: false }
  it.next() // { value: "b", done: false }
  it.next() // { value: undefined, done: true }

  function makeIterator(array) {
    var nextIndex = 0;
    return {
      next: function() {
        return nextIndex < array.length ?
          {value: array[nextIndex++], done: false} :
          {value: undefined, done: true};
      }
    };
  }
  ```

  每一次调用next方法，都会返回当前成员的信息，具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。  
  在ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构。  

* **默认Iterator接口**

  一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性。Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。

  ```js
  const obj = {   // obj是可遍历的, 因为有Symbol.iterator属性
    [Symbol.iterator] : function () {
      return {
        next: function () {
          return {
            value: 'something',
            done: true
          };
        }
      };
    }
  };
  ```

  原生具备 Iterator 接口的数据结构：Array、Map、Set、String、TypedArray、函数的 arguments 对象、NodeList 对象。

  ```js
  // Symbol.iterator属性上部署遍历器生成方法
  class RangeIterator {
    constructor(start, stop) {
      this.value = start;
      this.stop = stop;
    }
    [Symbol.iterator]() { return this; }
    next() {
      var value = this.value;
      if (value < this.stop) {
        this.value++;
        return {done: false, value: value};
      }
      return {done: true, value: undefined};
    }
  }
  function range(start, stop) {
    return new RangeIterator(start, stop);
  }
  for (var value of range(0, 3)) {
    console.log(value); // 0, 1, 2
  }

  // 类似数组的对象部署遍历器
  NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
  // 或者
  NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
  ```

  **调用 Iterator 接口的场合**

  - 对数组和Set结构进行解构赋值时，会默认调用iterator接口。

    ```js
    let set = new Set().add('a').add('b').add('c');
    let [first, ...rest] = set;
    // first='a'; rest=['b','c'];
    ```

  - 扩展运算符（...）也会调用默认的iterator接口。

  - yield* 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

  - for...of, Array.from()  

  - Map(), Set(), WeakMap(), WeakSet()  

  - Promise.all(), Promise.race()  
  

* **遍历器的return()，throw()**

  遍历器返回的指针对象，next方法是必须部署的，return方法和throw方法是否部署是可选的。return方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句或continue语句），就会调用return方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法。return方法必须返回一个对象，这是 Generator 规格决定的。

* **for...of循环**

  一个数据结构只要部署了Symbol.iterator方法，就被视为具有iterator接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。 for...of循环可以代替数组实例的forEach方法。for...in循环读取键名，for...of循环读取键值。  

  ```js
  const arr = ['red', 'green', 'blue'];
  for(let v of arr) {
    console.log(v); // red green blue
  }

  const obj = {};
  obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
  for(let v of obj) {
    console.log(v); // red green blue
  }
  ```

* **与其他遍历方法比较 | for in vs for of**

  - for: 比较麻烦，写法繁琐  

  - forEach: 无法中止跳出，break命令或return命令都不能奏效。  

  - for...in: 数组中只能遍历键名，并且会遍历原型链的新增键。总之，for...in循环主要是为遍历对象而设计的，不适用于遍历数组。不过遍历对象时，推荐使用 hasOwnProperty 方法过滤原型方法被修改带来的副作用。

  - for...of: 是ES6新引入的特性，主要是为了弥补ES5引入的for...in的不足，它提供了遍历所有数据结构的统一操作接口，是遍历实现iterator接口的成员，迭代获取value值，可以与break、continue和return配合使用。但不能循环普通的对象，需要通过和Object.keys()搭配使用
