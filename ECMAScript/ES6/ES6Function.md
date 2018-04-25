## ES 6函数

* **1、函数参数的默认值**

  ```js
  // 写法一
  if (typeof y === 'undefined') {
    y = 'World';
  }
  // 写法二
  if (arguments.length === 1) {
    y = 'World';
  }
  // 写法三(缺点不能赋值false)
  y = y || 'World';
  ```
  
  - ES6允许为函数的参数设置默认值，即直接写在参数定义的后面。定义了默认值的参数，必须是函数的尾部参数，其后不能再有其他无默认值的参数。非尾部的参数设置默认值，如果省略这个参数会报错，除非显示输入undefined。  

  - 如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
  
  - 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。 `(function(a, b, c = 5){}).length // 2`

  - 参数变量是默认声明的，所以不能用let或const再次声明。另外，参数默认值是惰性求值的。

  - 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

  - 从 ES5 开始，函数内部可以设定为严格模式。ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

  ```js
  function throwIfMissing() {
    throw new Error('Missing parameter');
  }
  function foo(mustBeProvided = throwIfMissing()) {
    return mustBeProvided;
  }
  foo()
  // Error: Missing parameter
  ```
  
* **2、rest参数**  

  ES6引入rest参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。  
  rest参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量。函数的length属性，不包括rest参数。  
  rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。  

  ```js
  function f(x, ...y) {
    // y是一个数组
    return x * y.length;
  }
  f(3, "hello", true) == 6

  // arguments变量的写法
  function sortNumbers() {
    return Array.prototype.slice.call(arguments).sort();  // arguments对象不是数组，需要转换
  }
  // rest参数的写法
  const sortNumbers = (...numbers) => numbers.sort();
  ```

* **3、扩展运算符**  

  扩展运算符（spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。该运算符主要用于函数调用。何类似数组的对象，都可以用扩展运算符转为真正的数组。  
  另外，如果将扩展运算符用于数组赋值(也就是数组解构)，只能放在参数的最后一位，否则会报错。函数的length属性，不包括rest参数。

  ```js
  function f(x, y, z) {
    return x + y + z;
  }
  // 将数组中的每个元素展开为函数参数
  f(...[1, 2, 3]) == 6

  var students = ['Abby', 'Andy', 'Jane', 'Tom'];
  var somestudents, otherStudents;
  [...somestudents, otherStudents] = students ; //Uncaught SyntaxError: Rest element must be last element
  ```

  关于扩展运算符与剩余操作符之间的区别，简单地说，在某种程度上，剩余操作符和扩展运算符相反，扩展运算符会“展开”数组变成多个元素，剩余操作符会收集多个元素和“压缩”成一个单一的元素。

  ```js
  function fn(a, b, ...args) {  // args表示[3, 4, 5]
    return args.length;
  }
  fn(1, 2, 3, 4, 5 ); // 传进来的参数的个数 3
  ```
  
* **4、箭头函数**  

  ES6允许使用“箭头”（=>）定义函数。var f = v => v;  等于 var f = function(v) {return v;};  
  如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。  
  如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。  
  ```js
  var sum = (num1, num2) => { return num1 + num2; }  
  ```
  由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。  
  
  箭头函数有几个使用注意点：  
  - （1）函数内的this对象，绑定定义时所在的对象(永远指向其上下文的this)，而不是使用时所在的对象，所以箭头函数的词法绑定是不能被覆盖的(call(), bind(), apply())，也就是说箭头函数与包裹它的代码共享相同的this对象。
  - （2）不可以当作构造函数，也没有原型属性，也就是说，不可以使用new命令，否则会抛出一个错误。
  - （3）不可以使用arguments对象，该对象在函数体内不存在。可以考虑...rest参数代替。如果箭头函数在其他函数的内部，它也将共享该函数的arguments变量。
  - （4）箭头函数没有独立的上下文context。

  [参考链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
  
* **5、函数绑定**  

  函数绑定运算符是并排的两个双引号（::），双引号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。  

  ```js
  foo::bar(...arguments);
  i// 等同于
  bar.apply(foo, arguments);
  ```
  
* **6、尾调用**  

  尾调用（Tail Call）是函数式编程的一个重要概念，就是指某个函数的最后一步是调用另一个函数。尾调用不一定出现在函数尾部，只要是最后一步操作即可。  

  我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。  
    
  尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。  
  
* **7、尾递归**  

  函数调用自身，称为递归。如果尾调用自身，就称为尾递归。  
  递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。  
  
  ```js
  function factorial(n, total) {
    if (n === 1) return total;  // che fang, single, 7 w, beatiful, easy money
    return factorial(n - 1, n * total);
  }
  factorial(5) // 120

  // 尾递归优化
  function factorial(n, total) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
  }
  factorial(5, 1) // 120

  function Fibonacci (n) {
    if ( n <= 1 ) {return 1};
    return Fibonacci(n - 1) + Fibonacci(n - 2);
  }
  Fibonacci(10) // 89
  Fibonacci(100) // 堆栈溢出
  Fibonacci(500) // 堆栈溢出

  // 尾递归优化
  function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
    if( n <= 1 ) {return ac2};
    return Fibonacci2 (n - 1, ac2, ac1 + ac2);
  }
  Fibonacci2(100) // 573147844013817200000
  Fibonacci2(1000) // 7.0330367711422765e+208
  Fibonacci2(10000) // Infinity
  ```
  
* **8、柯里化** 

  函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。  
  ```js
  // 阶乘尾调优化写法
  function tailFactorial(n, total) {
    if (n === 1) return total;
    return tailFactorial(n - 1, n * total);
  }
  function factorial(n) {
    return tailFactorial(n, 1);
  }
  factorial(5) // 120

  // 柯里化优化写法
  function currying(fn, n) {
    return function (m) {
      return fn.call(this, m, n);
    };
  }
  const factorial = currying(tailFactorial, 1);
  factorial(5) // 120
  ```
  递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现。

* **9、调用栈(call-stack) vs 调用点(call-site) vs 调用帧(call-frame)**
  ```js
  function baz() {
    // 调用栈是: baz
    // 我们的调用点是 global scope（全局作用域）

    console.log( "baz" );
    bar(); // <-- bar 的调用点
  }

  function bar() {
    // 调用栈是: baz -> bar
    // 我们的调用点位于 baz

    console.log( "bar" );
    foo(); // <-- foo 的 call-site
  }

  function foo() {
    // 调用栈是: baz -> bar -> foo
    // 我们的调用点位于 bar

    console.log( "foo" );
  }

  baz(); // <-- baz 的调用点
  ```
