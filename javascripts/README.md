## javascript

  JavaScript引擎，不是逐条解释执行javaScript代码，而是按照代码块一段段解释执行。所谓代码块就是使用`<script>`标签分隔的代码段。

* 编译型语言

  程序在执行之前需要一个专门的编译过程，把程序编译成为机器语言的文件，运行时不需要重新翻译，直接使用编译的结果就行了。程序执行效率高，依赖编译器，跨平台性差些。

  C/C++、Pascal/Object Pascal（Delphi）、Golang典型的就是它们可以编译后生成.exe文件，之后无需再次编译，直接运行.exe文件即可。

* 解释型语言

  不需要编译，程序在运行时才解析成机器语言，每执行一次都要解析一次。在程序运行时，专门有一个解释器去进行解析，每个语句都是执行的时候才解析，依赖解释器，跨平台性好，但效率比较低。

  常见的`Java、C#、PHP、JavaScript、VBScript、Perl、Python、Ruby、MATLAB` 等等属于解释型语言。

* 编译过程

  对于常见编译型语言（例如：Java）来说，编译步骤分为：`词法分析->语法分析->语义检查->代码优化和字节生成`。

  对于解释型语言（例如JavaScript）来说，通过词法分析和语法分析得到语法树后，就可以开始解释执行了。

* JavaScript的执行过程

  在解释过程中，JavaScript引擎按照作用域机制（scope）来执行，JavaScript语法采用的词法作用域，也就是变量和函数作用域在声明时就决定，而不是执行时决定的。因此，JavaScript解释器可以通过静态分析就能确定变量和函数的作用域范围，这种作用域也可以称为静态作用域。但with和eval语法除外，它们都会修改作用域或者创建新作用域，就安全和性能而言不推荐使用。

  JavaScript引擎在执行每个函数实例时，都会创建一个执行环境（execution context）。执行环境中包含一个调用对象（call object）, 调用对象是一个scriptObject结构（运行期上下文）。


* [常用技巧](./common/常用技巧)

* [this对象的深入理解](./common/this)

* [polyfill vs shim](./other/polyfill)

* [内存泄漏](./other/js内存泄漏)

* [JavaScript原型详解](./depth/prototype)

* [浏览器线程详解](./other/async/thread)



#### [返回首页](../)