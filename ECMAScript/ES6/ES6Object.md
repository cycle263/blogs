## Object

* **属性的简洁表示法**  

  ES6允许对象的属性和方法进行简写

  ```js
  const test = 'base';
  const baz = { test };   // 等同于 { test: test }

  const o = {
    method() {
      return "Hello!";
    }
  };
  // 等同于
  const o = {
    method: function() {
      return "Hello!";
    }
  };

  const obj = {
    * m() {
      yield 'hello world';
    }
  };
  ```

* **属性名表达式**  

  JavaScript语言定义对象的属性，有两种方法：
  
  - 是直接用标识符作为属性名
  
  - 用表达式作为属性名，这时要将表达式放在方括号之内。

    ```js
    let obj = {
      [propKey]: true,
      ['a' + 'bc']: 123
    };
    ```

* **函数和方法的name属性**

  函数和方法的name属性，返回函数名。

  ```js
  const person = {
    sayName() {
      console.log('hello!');
    },
    get foo() {},
    set foo(x) {}
  };
  person.sayName.name   // "sayName"

  const descriptor = Object.getOwnPropertyDescriptor(person, 'foo');
  descriptor.get.name // "get foo"
  descriptor.set.name // "set foo"

  (new Function()).name // "anonymous"
  ```

  对象的方法使用了取值函数（getter）和存值函数（setter），name属性的在get和set属性上面，返回值是方法名前加上get和set。

  有两种特殊情况：bind方法创造的函数，name属性返回bound加上原函数的名字；Function构造函数创造的函数，name属性返回anonymous。

* **Object.is()**  

  Object.is()用来比较两个值是否严格相等。它与严格比较运算符（===）的行为基本一致，不同之处只有两个：
  
  - 是+0不等于-0

  - 是NaN等于自身 

  ```js
  +0 === -0   // true
  NaN === NaN // false

  Object.is(+0, -0)   // false
  Object.is(NaN, NaN) // true
  ```

  相等运算符（==）和严格相等运算符（===），相等运算符会自动转换数据类型，严格相等运算符的NaN不等于自身，以及+0等于-0。

* **Object.assign(target, source1, source2)**  

  Object.assign方法用来将源对象（source）的所有可枚举属性，复制到目标对象（target）。需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象。目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性(source2覆盖source1)。只有一个参数，Object.assign会直接返回该参数，参数不是对象，则会先转成对象，然后返回。undefined和null无法转成对象，所以如果它们作为参数，就会报错。

  - （1）为对象添加属性

    ```js
    class Point {
      constructor(x, y) {
        Object.assign(this, {x, y});
      }
    }
    ```

  - （2）为对象添加方法

  - （3）克隆对象

    ```js
    function clone(origin) {
      return Object.assign({}, origin);
    }
    ```

  - （4）合并多个对象

  - （5）为属性指定默认值

  - (6) 会触发setter，扩展运算符(展开操作符)不会。

* **Object.setPrototypeOf()，Object.getPrototypeOf()**  

  proto属性，用来读取或设置当前对象的prototype对象。  
  Object.setPrototypeOf方法的作用与proto相同，用来设置一个对象的prototype对象。它是ES6正式推荐的设置原型对象的方法。  
  setPrototypeOf方法配套，用于读取一个对象的prototype对象。  

* **Symbol 独一无二**  

  - (1). ES6引入了一种新的原始数据类型Symbol，表示独一无二的ID。通过Symbol函数生成。Symbol函数前不能使用new命令，否则会报错。
  Symbol类型的值不能与其他类型的值进行运算，会报错。但是，Symbol类型的值可以转为字符串(toString、String())。
  - (2). Symbol值作为对象属性名时，不能用点运算符。点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值.
  同理，在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中。
  - (3). Symbol值作为属性名时，该属性还是公开属性，不是私有属性。
  - (4). Symbol作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()返回。
  但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有Symbol属性名。
  - (5). for...in循环、Object.getOwnPropertyNames方法得不到Symbol属性名，需要使用Object.getOwnPropertySymbols方法。
  - (6). Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和Symbol键名。ES7
  - (7). Symbol.for()方法重新使用同一个Symbol值, 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。
  Symbol.keyFor方法返回一个已登记的Symbol类型值的key，未登记的Symbol值，所以返回undefined。
  - (8). Symbol.for为Symbol值登记的名字，是全局环境的，可以在不同的iframe或service worker中取到同一个值。

* **内置的Symbol**  

  ES6还提供一些内置的Symbol值，指向语言内部使用的方法。  
  - (1).Symbol.hasInstance
  - (2).Symbol.isConcatSpreadable
  - (3).Symbol.isRegExp
  - (4).Symbol.match
  - (5).Symbol.iterator
  - (6).Symbol.toPrimitive
  - (7).Symbol.toStringTag
  - (8).Symbol.unscopables

* **Object.observe()，Object.unobserve()**  

  Object.observe方法用来监听对象（以及数组）的变化。一旦监听对象发生变化，就会触发回调函数。  
  Object.observe方法接受两个参数，第一个参数是监听的对象，第二个函数是一个回调函数。  
  Object.observe方法还可以接受第三个参数，用来指定监听的事件种类。  
  Object.unobserve方法用来取消监听。  

  Object.observe方法目前共支持监听六种变化。  
  - add：添加属性
  - update：属性值的变化
  - delete：删除属性
  - setPrototype：设置原型
  - reconfigure：属性的attributes对象发生变化
  - preventExtensions：对象被禁止扩展（当一个对象变得不可扩展时，也就不必再监听了）  
  Object.observe和Object.unobserve这两个方法不属于ES6，而是属于ES7的一部分。不过，Chrome浏览器从33版起就已经支持。
