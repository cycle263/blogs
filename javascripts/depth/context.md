## 上下文(context)

> 上下文是基于对象，函数在被调用时的上下文环境，被调用函数中的this指向该上下文环境。global context对应一个变量对象VO（就是window）.

* 执行上下文

   载入代码阶段： 创建全局上下文  -->  执行函数，创建函数上下文（VO、arguments、）  

   解释代码阶段： 创建执行上下文栈(后进先出)  -->  创建全局上下文，并放入栈内  -->  在全局上下文中，调用函数，创建一个执行上下文，压入栈内  -->  函数执行结束，栈顶的执行上下文被弹出，继续执行栈顶的执行上下文


## 作用域(scope)

> 作用域是基于函数，js解释器在创建 执行上下文栈 的时候,会同时创建一个 scope chain（单向链表）。在执行上下文的执行阶段的时候, 当需要访问某个变量时, 会首先在当前的执行上下文的VO中查找。如果找不到, 就往链表的下一个位置查找，一直到最后一个位置。

* 变量声明提升（Hoisting）

  javascript是函数级作用域，而非块级作用域。实际上，可以将变量声明看成两部分：声明、赋值。  
  javascript会隐式地提升声明部分到函数的顶部，而赋值部分保持不动。
  
  ```js
  var myvar = 'my value';  

  (function() {  
      alert(myvar); // undefined  
      var myvar = 'local value';  
      alert(myvar); // 'local value'
  })();
  alert(myvar); // 'my value'
  ```