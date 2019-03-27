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

* getOwnPropertyDescriptors

  该函数返回一个对象所有的属性，甚至包括get/set函数。ES2017加入这个函数的主要动机在于方便将一个对象深度拷贝给另一个对象，同时可以将getter/setter拷贝。和Object.assign不同。

  Object.assign将一个对象除了getter/setter以外的都深度拷贝了。

  将原对象Car拷贝到ElectricCar，你就会发现Object.getOwnPropertyDescriptors拷贝了 getter和setter，而Object.assign没有。