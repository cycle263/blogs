## 执行上下文(Execution context)

> 上下文是基于对象，函数在被调用时的上下文环境，被调用函数中的this指向该上下文环境。global context对应一个变量对象executionContext VO - VO（就是window）。

* 概念

  - EC：函数执行环境（或执行上下文），Execution Context

  - ECS：执行上下文栈，Execution Context Stack

  - VO：变量对象，Variable Object，包括函数标识符，形参，变量等，可读但不能delete，但无法在js环境访问

  - AO：活动对象，Active Object，进入一个执行上下文时，EC中的变量对象就被激活，也就是可以访问了

  - scope chain：作用域链

  - call stack：函数调用栈，函数的调用方式(执行方式)

  - heapstack: 堆栈，内存分配区域

* 分类

  - 全局上下文，script标签内的代码，但不包括函数体和eval内代码
  
  - 函数上下文
  
  - eval上下文

* 执行上下文阶段

  载入代码阶段： `1、创建全局上下文  2、执行函数，创建函数上下文（VO、arguments、）`

  解释代码阶段： `创建执行上下文栈(后进先出)  -->  创建全局上下文，并放入栈内  -->  在全局上下文中，调用函数，创建一个执行上下文，压入栈内  -->  函数执行结束，栈顶的执行上下文被弹出，继续执行栈顶的执行上下文`

  ![执行栈](../images/heapStack.jpg)

  ```js
  // 直接存放在内存栈
  var a = 1;

  // 存储堆内存中，大小不定，动态分配
  var b = { test: 3 };
  ```

* 特点

  - 单线程同步执行
  
  - 有且只有一个全局上下文，但可以有很多函数execution context

  - 每个函数执行都对应一个执行上下文，因为js是函数作用域，当然，es6出现了块级作用域变量，也只是变量部分

* 上下文包括哪些

  - 作用域链（js不能直接获取）

  - 局部变量，函数和入参

  - this指向

  ```js
  executionContextVO = {
    scopeChain: {},   // 作用域链
    variableObject: {
      arguments: {},
      outer: GlobalExectionContext
    },  // 变量和参数，返回值等
    this: {}  // this指向
  }
  ```

* **解释器执行步骤**

  - 1、调用函数前，创建执行上下文(EC)

  - 2、初始化作用域链，创建局部变量

  - 3、创建参数对象，检查参数上下文，创建参数引用或者赋值

  - 4、查找当前EC(执行上下文)中的函数声明，创建变量对象的同名函数变量，关联上引用；已存在则进行覆盖

    ```js
    function test(){
      console.log(c);
      var c = 'hello';
      function c(){ }
      console.log(c);
    }
    test() // ƒ c(){ }  hello
    ```

  - 5、查找当前EC中的变量声明，创建变量对象的同名属性，初始化为undefined；已存在则不会影响已存在的属性，除非主动进行赋值操作

    ```js
    function test(c){
      console.log(c);
      var c = 'hello';
      console.log(c);
    }
    test('world') // world  hello
    ```

  - 6、确定this对象的指向

  - 7、执行函数体内的代码，并对变量进行赋值

参考资料

[JavaScript 中的执行上下文和调用栈](https://juejin.im/entry/599e949251882524472239c4)

[深入理解js上下文和声明提升](https://juejin.im/entry/58ef1e21a0bb9f006a80b7dc)