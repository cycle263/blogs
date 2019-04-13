```js
/******************** promise *********************/
// 2 3 5 4 1, Promise里面的函数是直接执行, then应当会放到当前tick的最后，但是还是在当前tick中。
setTimeout(function() {
  console.log(1)
}, 0);
new Promise(function executor(resolve) {
  console.log(2);
  for( var i=0 ; i<10000 ; i++ ) {
    i == 9999 && resolve();
  }
  console.log(3);
}).then(function() {
  console.log(4);
});
console.log(5);


/******************** 闭包 *********************/
// 0 1 2 3 4, 立即执行函数会立即执行
for (var i = 0; i < 5; i++) {
  setTimeout((function(i) {
    console.log(i);
  })(i), i * 1000);
}


/******************** setTimeout *********************/
// setTimeout vs setInterval
setTimeout(function(){       
  // 代码块
 setTimeout(arguments.callee, 10);
}, 100);
setInterval(function(){
  // 代码块
}, 100);

/******************** 函数作用域 *********************/
// 作用域链是定死的,函数引用的变量在哪里定义,引用的就是哪里的变量.
// fn3()在全局定义,所以引用的是全局的a
// fn2在fn内部定义,fn内部有一个a了,所以fn2操作的都是fn内的a,
// 第一个undefined是因为var声明变量提前所以是undefined.

var a = 1;
function fn(){
  console.log(a);        //第一个输出值        ---->  undefined
  var a = 5;
  console.log(a);        //第二个输出值        ---->  5  
  a++;
  var a;
  fn3();
  fn2();
  console.log(a);       //第五个输出值          ---->  20

  function fn2(){
    console.log(a);     //第四个输出值          ---->   6
    a = 20;
  }
}

function fn3(){
  console.log(a)       //第三个输出值      ---->  1
  a = 200;
}

fn();
console.log(a);       //第六个输出值        ---->  200

/******************** 声明提升 *********************/
// 声明提升
var foo=function(){  console.log(1); }
function foo(){  console.log(2); }
foo();  //结果为1

// undefined、2、undefined
function test() {
  console.log(a);
  console.log(foo());
  console.log(bar);
  var a = 1;
  function foo(){     
    return 2;   
  }
  var bar = function(){
    return 3;
  }
}
test();

var a = 10;
(function () {
    console.log(a, window.a);   // undefined 10
    a = 5;
    console.log(a, window.a);   // 5 10
    var a = 20;
    console.log(a, window.a);   // 20 10
})()

/******************** 作用域和原型链 *********************/
function Foo() {
    getName = function () {
    	console.log('1');
    };
    return this;
}
Foo.getName = function () {
	console.log('2');
};
Foo.prototype.getName = function () {
	console.log('3');
};
var getName = function () {
	console.log('4');
};
function getName() {
	console.log(5);
}

Foo.getName();  
getName();
Foo().getName();
getName();  
new Foo.getName();
new Foo().getName();   
new new Foo().getName();

// 1   ：foo提升到函数内容最前面，相当于定义了局部变量foo
var foo = 1;
function bar() {
   foo = 10;
   return;
   function foo() {}
}
bar();
console.log(foo);

// foo.x = foo = {n:2}; => foo.x = (foo = {n:2});  执行foo.x = foo时，两个foo指向不同的内存地址
var foo = {n:1};
var bar = foo;
foo.x = foo = {n:2};
console.log(foo.x);
console.log(bar.x);

// 追溯原型链
var func = function(){};
Function.prototype.a = function(){console.log('a')};
Object.prototype.b = function(){console.log('b')};
var f = new func();
func.a();   // a
func.b();  // b
f.a();  // 异常
f.b();  // a



/******************** 引用类型 *********************/
// 写出打印的结果，ECMAScript中的所有参数传递的都是值(引用复制：增删改引用则会影响原对象，重新赋值则不会影响原对象)，不可能通过引用传递参数。函数内部对参数的修改都不会影响到实参的值。内部变量x和变量y只是互换了引用地址，和函数外部变量obj1与obj2没有关系。
function swap(x, y){
  var temp = x;
  x = y;
  y = temp;  
}

var a = 1
var b = 2
swap(a, b)
console.log(a) //输出什么   1
console.log(b) //输出什么   2

var obj1 = {name: 'jirengu'}
var obj2 = {age: 2}
swap(obj1, obj2)
console.log(obj1)  //输出什么   {name: 'jirengu'}
console.log(obj2)  //输出什么   {age: 2}


function swapone(x, y){
  x.name = '111';
  y.age = 3;
}

var obj3 = {name: 'jirengu'}
var obj4 = {age: 2}
swapone(obj3, obj4)
console.log(obj3)  //输出什么   {name: '111'}
console.log(obj4)  //输出什么   {age: 3}
```
