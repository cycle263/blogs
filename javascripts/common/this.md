## this对象

  > this对象根据函数如何被执行而动态绑定的，不是编写时绑定，而是运行时绑定，谁调用绑定谁。如果有new关键字，this指向new出来的那个实例对象。和this密切相关的是对象原型属性，它是一种属性的向上追溯。

  当一个函数被调用时，会建立一个称为执行环境的活动记录。这个记录包含函数是从何处（调用栈 —— call-stack）被调用的，函数是 如何 被调用的，被传递了什么参数等信息。这个记录的属性之一，就是在函数执行期间将被使用的 this 引用。
  
  this 机制设计的目的，是为了提供更优雅的方式来隐含地“传递”一个对象引用，从而有更加干净的API设计和更容易的复用。

  * 默认绑定 (default binding)：优先级4

    独立函数调用，默认绑定this，这种 this 规则是在没有其他规则适用时的默认规则。

    ```js
    function func() { console.log(this); }      // window object
    func();
    ```

  * 隐含绑定（Implicit Binding）

    调用点是否有一个环境对象（context object）,当一个方法引用存在一个环境对象时，隐含绑定规则会说：是这个对象应当被用于这个函数调用的 this 绑定，并且只有对象属性引用链的最后一层是影响调用点的。

    ```js
    function foo() {
        console.log( this.a );
    }
    var obj2 = {
        a: 42,
        foo: foo
    };
    var obj1 = {
        a: 2,
        obj2: obj2
    };
    obj1.obj2.foo(); // 42
    ```

    - 隐含丢失（Implicitly Lost）

    当一个隐含绑定丢失了它的绑定，这通常意味着它会退回到默认绑定， 根据 strict mode 的状态，其结果不是全局对象就是 undefined。参数传递仅仅是一种隐含的赋值，而且因为我们在传递一个函数，它是一个隐含的引用赋值，最终隐含会丢失。

    ```js
    function foo() {
        console.log( this.a );
    }
    var obj = {
        a: 2,
        foo: foo
    };
    var bar = obj.foo; // 函数引用！
    var a = "oops, global"; // `a` 也是一个全局对象的属性
    bar(); // "oops, global"

    function foo() {
        console.log( this.a );
    }
    var obj = {
        a: 2,
        foo: foo
    };
    var a = "oops, global"; // `a` 也是一个全局对象的属性
    setTimeout( obj.foo, 100 ); // "oops, global"
    ```

  * 明确绑定（Explicit Binding）

    函数拥有 call(..) 和 apply(..) 方法，它们接收的第一个参数都是一个用于指定 this 的对象。如果你传递一个简单基本类型值（string，boolean，或 number 类型）作为 this 绑定，那么这个基本类型值会被包装在它的对象类型中（分别是 new String(..)，new Boolean(..)，或 new Number(..)）。这通常称为“封箱（boxing）”。

    - 硬绑定（Hard Binding）

      在 ES6 中，有bind(..) 生成的硬绑定函数，也可以polyfill

    - API 调用的“环境”

      `[1, 2, 3].forEach( callback, context );`

  * new 绑定（new Binding）

    JavaScript 拥有 new 操作符，当在函数前面被加入 new 调用时，也就是构造器调用时，下面这些事情会自动完成：

    - 一个全新的对象会凭空创建（就是被构建）

    - 这个新构建的对象会被接入原形链（[[Prototype]]-linked）

    - 这个新构建的对象被设置为函数调用的 this 绑定

    - 除非函数返回一个它自己的其他 对象，否则这个被 new 调用的函数将 自动 返回这个新构建的对象。


  **如果你想调查this 绑定，可以使用开发者工具取得调用栈，之后从上向下找到第二个记录，那就是你真正的调用点。**

## 判断this

  * 函数是通过 new 被调用的吗（new 绑定）？如果是，this 就是新构建的实例。

  * 函数是通过 call 或 apply 被调用（明确绑定），甚至是隐藏在 bind 硬绑定 之中吗？如果是，this 就是那个被明确指定的对象。

  * 函数是通过环境对象（也称为拥有者或容器对象）被调用的吗（隐含绑定）？如果是，this 就是那个环境对象。

  * 否则，使用默认的 this（默认绑定）。如果在 strict mode 下，就是 undefined，否则是 global 对象。