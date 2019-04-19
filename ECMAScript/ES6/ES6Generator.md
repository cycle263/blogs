## Generator函数

  > Generator函数是ES6提供的一种异步编程解决方案，语法行为与传统函数完全不同。可以把它理解成一个函数的内部状态的遍历器（也就是说，Generator函数是一个状态机）。它每调用一次，就进入下一个内部状态。Generator函数可以控制内部状态的变化，依次遍历这些状态。  
  
* **Generator函数的特质：**  

  - function命令与函数名之间有一个星号；
  - 函数体内部使用yield语句，定义遍历器的每个成员，即不同的内部状态（yield语句在英语里的意思就是“产出”）。
  - Generator 函数也不能跟new命令一起用，会报错。
  
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

  - 每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。

  - 普通函数只可以 return 一次，而生成器函数可以 yield 多次。

  **yield暂停原理机制**

  每当生成器执行 yields 语句，生成器的堆栈结构（本地变量、参数、临时值、生成器内部当前的执行位置）被移出堆栈。然而，生成器对象保留了对这个堆栈结构的引用（备份），所以稍后调用.next() 可以重新激活堆栈结构并且继续执行。

  值得特别一提的是，生成器不是线程，在支持多线程的语言中，多段代码可以同时运行，通通常导致竞态条件和非确定性，不过同时也带来不错的性能。生成器则完全不同，当生成器运行时，它和调用者处于同一线程中，拥有确定的连续执行顺序，永不并发。与系统线程不同的是，生成器只有在其函数体内标记为 yield 的点才会暂停。

* **next**

  next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。第一次使用next方法时，不能带有参数。V8引擎直接忽略第一次使用next方法时的参数。Generator函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在Generator函数开始运行之后，继续向函数体内部注入值。  

  遍历器对象的next方法的运行逻辑如下:

  - 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。

  - 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。

  - 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。

  - 如果该函数没有return语句，则返回的对象的value属性值为undefined。

  ```js
  function autoGenerator(generator){
    var g = generator();
    function next(){
      var res = g.next();  // {value: xxx, done: xxx}
      if (res.done) {
        return res.value;
      }
      if(typeof res.value === 'function'){    // 认为是回调
        res.value(next);
      }else if(typeof res.value === 'object' && typeof res.value.then === 'function'){     // 认为是promise
        res.value.then(() => next());
      }else{
        next();
      }
    }
    next();
  }

  function run(generat) {
    const iterator = generat();
    function autoRun(iteration) {
      if(iteration.done) {
        return iteration.value;
      }  //出口
      const anotherPromise = iteration.value;
      anoterPromise.then(x => {
        return autoRun(iterator.next(x));  //递归条件
      });
    }
    return autoRun(iterator.next()) 
  }
  ```
  
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

  Generator函数可以在函数体外抛出错误，然后在函数体内捕获。用遍历器的throw方法抛出的`generator.throw('a');`，而不是用throw命令抛出的`throw new Error('a');`。后者只能被函数体外的catch语句捕获。throw命令与g.throw方法是无关的，两者互不影响。 

  如果遍历器函数内部没有部署`try...catch`代码块，那么throw方法抛出的错误，将被外部`try...catch`代码块捕获。如果遍历器函数内部部署了`try...catch`代码块，那么遍历器的throw方法抛出的错误，不影响下一次遍历，否则遍历直接终止。  

* **yield* 表达式**

  在一个 Generator 函数里面执行另一个 Generator 函数。

  ```js
  function* foo() {
    yield 'a';
    yield 'b';
  }
  function* bar() {
    yield 'x';
    yield* foo(); // 而yield foo()则返回一个遍历器对象
    yield 'y';
  }

  // 等同于
  function* bar() {
    yield 'x';
    yield 'a';
    yield 'b';
    yield 'y';
  }

  // 等同于
  function* bar() {
    yield 'x';
    for (let v of foo()) {
      yield v;
    }
    yield 'y';
  }

  for (let v of bar()){
    console.log(v);
  }
  // "x"
  // "a"
  // "b"
  // "y"
  ```

  yield*命令可以很方便地取出嵌套数组的所有成员。

  ```js
  function* iterTree(tree) {
    if (Array.isArray(tree)) {
      for(let i=0; i < tree.length; i++) {
        yield* iterTree(tree[i]);
      }
    } else {
      yield tree;
    }
  }
  const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];
  for(let x of iterTree(tree)) {
    console.log(x);
  }
  // a
  // b
  // c
  // d
  // e
  ```

  **使用yield*语句遍历完全二叉树。**

  ```js
  // 下面是二叉树的构造函数，
  // 三个参数分别是左树、当前节点和右树
  function Tree(left, label, right) {
    this.left = left;
    this.label = label;
    this.right = right;
  }

  // 下面是中序（inorder）遍历函数。
  // 由于返回的是一个遍历器，所以要用generator函数。
  // 函数体内采用递归算法，所以左树和右树要用yield*遍历
  function* inorder(t) {
    if (t) {
      yield* inorder(t.left);
      yield t.label;
      yield* inorder(t.right);
    }
  }

  // 下面生成二叉树
  function make(array) {
    // 判断是否为叶节点
    if (array.length == 1) return new Tree(null, array[0], null);
    return new Tree(make(array[0]), array[1], make(array[2]));
  }
  let tree = make([[[['a'], 'a1', ['a2']], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
  console.log(tree);
  // 遍历二叉树
  var result = [];
  for (let node of inorder(tree)) {
    result.push(node);
  }

  result // ["a", "a1", "a2", "b", "c", "d", "e", "f", "g"]
  ```

* **作为对象属性的Generator函数**  

  ```js
  let obj = { myGeneratorMethod: function* () {} }

  // 简写成
  let obj = {
    * myGeneratorMethod() {}
  }
  ```

* **Generator的应用**  

  - 1、异步操作的同步化表达

  - 2、控制流管理

  - 3、部署iterator接口

  - 4、作为数据结构
  
  
