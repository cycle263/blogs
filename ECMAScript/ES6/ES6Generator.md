## Generator函数

  > Generator函数是ES6提供的一种异步编程解决方案，语法行为与传统函数完全不同。可以把它理解成一个函数的内部状态的遍历器（也就是说，Generator函数是一个状态机）。它每调用一次，就进入下一个内部状态。Generator函数可以控制内部状态的变化，依次遍历这些状态。  
  
* **Generator函数的特质：**  

  - function命令与函数名之间有一个星号；
  - 函数体内部使用yield语句，定义遍历器的每个成员，即不同的内部状态（yield语句在英语里的意思就是“产出”）。
  
  Generator函数的调用方法与普通函数一样，func()。不同的是，调用Generator函数后，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象（Iterator Object），该对象本身也具有Symbol.iterator属性，执行后返回自身。例如：`{value: 'something', done: false}`。

  必须调用遍历器对象的next方法，使得指针移向下一个状态。每次调用next方法，内部指针就从函数头部或上一次的地方开始执行，直到遇到下一个yield语句（或return语句）为止。 

  Generator函数是分段执行的，yield命令是暂停执行的标记，而next方法可以恢复执行。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
  
* **yield**  

  由于Generator函数返回的遍历器，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield语句就是暂停标志。  

  另外需要注意，yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。

  另外，yield表达式如果用在另一个表达式之中，必须放在圆括号里面，但yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

  ```js
  function* demo() {
    console.log('Hello' + yield 123); // SyntaxError
    console.log('Hello' + (yield 123)); // OK
  }

  function* demo() {
    foo(yield 'a', yield 'b'); // OK
    let input = yield; // OK
  }
  ```

  **yield vs return** 

  每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。

* **next**

  next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。第一次使用next方法时，不能带有参数。V8引擎直接忽略第一次使用next方法时的参数。Generator函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在Generator函数开始运行之后，继续向函数体内部注入值。  

  遍历器对象的next方法的运行逻辑如下:

  - 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。

  - 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。

  - 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。

  - 如果该函数没有return语句，则返回的对象的value属性值为undefined。
  
* **for...of**  

  使用for...of语句可以自动遍历 Generator 函数时生成的Iterator对象，不需要使用next方法。next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象,因此的return的返回值不会返回。

  ```js
  function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
  }
  for (let v of foo()) {
    console.log(v);
  }
  // 1 2 3 4 5
  ```

  利用for...of循环，可以写出遍历任意对象（object）的方法。原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口。

  ```js
  function* objectEntries() {
    let propKeys = Object.keys(this);
    for (let propKey of propKeys) {
      yield [propKey, this[propKey]];
    }
  }

  let jane = { first: 'Jane', last: 'Doe' };
  jane[Symbol.iterator] = objectEntries;
  for (let [key, value] of jane) {
    console.log(`${key}: ${value}`);
  }
  // first: Jane
  // last: Doe
  ```

  除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。

  ```js
  function* numbers () {
    yield 1
    yield 2
    return 3
    yield 4
  }

  // 扩展运算符
  [...numbers()] // [1, 2]

  // Array.from 方法
  Array.from(numbers()) // [1, 2]

  // 解构赋值
  let [x, y] = numbers();
  x // 1
  y // 2

  // for...of 循环
  for (let n of numbers()) {
    console.log(n)
  }
  // 1
  // 2
  ```
  
* **throw** 

  Generator函数可以在函数体外抛出错误，然后在函数体内捕获。用遍历器的throw方法抛出的，而不是用throw命令抛出的。后者只能被函数体外的catch语句捕获。  

  如果遍历器函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。如果遍历器函数内部部署了try...catch代码块，那么遍历器的throw方法抛出的错误，不影响下一次遍历，否则遍历直接终止。  

* **作为对象属性的Generator函数**  

  ```js
  let obj = { myGeneratorMethod: function* () {} }

  // 简写成
  let obj = {
    * myGeneratorMethod() {}
  }
  ```

* **Generator的应用**  

  - 1.异步操作的同步化表达

  - 2.控制流管理

  - 3.部署iterator接口

  - 4.作为数据结构
  
<br /><br />

## 协程

  > 协程（coroutine）是一种程序运行的方式，可以理解成“协作的线程”或“协作的函数”。协程既可以用单线程实现，也可以用多线程实现。前者是一种特殊的子例程，后者是一种特殊的线程。

* 协程与普通线程的差异  
  
  协程适合用于多任务运行的环境。在这个意义上，它与普通的线程很相似，都有自己的执行上下文、可以分享全局变量。它们的不同之处在于，同一时间可以有多个线程处于运行状态，但是运行的协程只能有一个，其他协程都处于暂停状态。此外，普通的线程是抢先式的，到底哪个线程优先得到资源，必须由运行环境决定，但是协程是合作式的，执行权由协程自己分配。  
  Generator函数是ECMAScript 6对协程的实现，但属于不完全实现。Generator函数被称为“半协程（semi-coroutine），意思是只有 Generator函数的调用者，才能将程序的执行权还给Generator函数。如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。  
    
* 协程与子例程的差异  
  
  统的“子例程”（subroutine）采用堆栈式“后进先出”的执行方式，只有当调用的子函数完全执行完毕，才会结束执行父函数。协程与其不同，多个线程（单线程情况下，即多个函数）可以并行执行，但是只有一个线程（或函数）处于正在运行的状态，其他线程（或函数）都处于暂停态（suspended），线程（或函数）之间可以交换执行权。  
