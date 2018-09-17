* babel为什么要采用Object.defineProperty这样的形式来定义类？

因为ES6的一些语法是有其特定的语义。类内部声明的方法，是不可枚举的，而通过原型链声明的方法是可以枚举的。所以，babel为了符合ES6真正的语义，编译类时采取了Object.defineProperty来定义原型方法。

* 函数副作用

可以理解为一个函数会、或者可能会对函数外部变量产生影响的行为。

```js
// 常见的副作用函数
function go (url) {
  window.location.href = url
}

// 隐蔽的副作用函数
var V8Engine = (function () {
  function V8Engine () {}
  V8Engine.prototype.toString = function () { return 'V8' }
  return V8Engine
}())
var V6Engine = (function () {
  function V6Engine () {}
  V6Engine.prototype = V8Engine.prototype // <---- side effect, 改变了V8的原型链属性
  V6Engine.prototype.toString = function () { return 'V6' }
  return V6Engine
}())
console.log(new V8Engine().toString())
```