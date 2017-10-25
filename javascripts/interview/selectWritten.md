## 单选题

* 1、容器中包含若干浮动元素？以下方式不能清除浮动的是？（d）

  - a. 容器元素闭合标签前添加额外元素并设置样式clear: both
  - b. 父元素触发块级格式化上下文
  - c. 设置容器元素伪元素样式clear: both;
  - d. 设置容器元素样式clear:both;

* 2、以下哪个不是XMLHttpRequest的readyState状态值？（d）

  - a. UNSENT
  - b. OPENED
  - c. HEADERS_RECEIVED
  - d. LOADED

* 3、react中无状态函数组件不存在的特性是？（c）

  - a. 组件不会被实例化
  - b. 组件不能访问this对象
  - c. 组件可以访问生命周期的方法
  - d. 组件无法访问生命周期的方法

* 4、以下哪项不是let、var和const的区别？（b）

  - a. let命令不存在变量提升
  - b. let方式声明的变量不可以修改
  - c. let方式声明的变量在声明之前调用会报错
  - d. const声明的变量只可以在声明时赋值，不可随意修改

* 5、以下对于箭头函数的理解错误的是？（d）

  - a. 箭头函数不属于普通的 function，所以没有独立的上下文
  - b. 函数对象中的call、apply、bind三个方法，无法"覆盖"箭头函数中的this值
  - c. 箭头函数没有普通函数有的隐藏arguments对象。
  - d. 箭头函数能当作generators使用

* 6、以下哪项对apply、call和bind的理解不正确？（b）

  - a. call、apply是修改函数的作用域（修改this指向），并且立即执行
  - b. bind是返回了一个新的函数，并且立即执行
  - c. apply和call的区别是apply接受数组作为参数，而call是接受逗号分隔的无限多个参数列表
  - d. 三者都可以把一个函数应用到其他对象上

* 7、以下对js事件中的target和currentTarget理解错误的是？（d）

  - a. target在事件流的目标阶段
  - b. currentTarget在事件流的捕获，目标及冒泡阶段
  - c. 当处于捕获和冒泡阶段的时候，target指向被单击的对象，而currentTarget指向当前事件活动的对象
  - d. 当事件流处在目标阶段的时候，两个的指向是不一样的


## 判断题

* 1、`var str = '123';str[2]=4;console.log(str === '124' || str === 124);` //打印结果为true，对吗？    ×

* 2、webpack打包最基本的实现方式，是将所有的模块代码放到一个数组里，通过数组ID来引用不同的模块，对吗？     √

* 3、react中，只要是父组件的render被调用，在render中被渲染的子组件就会经历更新的过程。不管父组件传给子组件的props有没有改变，都会触发子组件的componentWillReceiveProps函数被调用，对吗？    ×
