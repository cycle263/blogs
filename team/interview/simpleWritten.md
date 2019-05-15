```js
/******************** promise *********************/
// 2 3 5 4 1, Promise里面的函数是直接执行, then应当会放到当前tick的最后(如果是用setTimeout模拟的ployfill,则在下一个tick)，但是还是在当前tick中。
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
var foo = function(){  console.log(1); }
function foo(){  console.log(2); }
foo();  //结果为1

// undefined、2、undefined
// 考察变量申明提升，函数和字面量函数声明区别
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


CSS基础题：

1.请用css画一个月亮(月牙儿🌛) ?
2.三栏布局，两边宽度固定，中间自适应：请列出4种以上的方法 ?
3.请具体描述一下css中 BFC, IFC, GFC, FFC是什么 ？
4.请用一个div + css写一个九宫格布局要求每个格子的颜色不同 ？
5.css中命名冲突如何解决 ？


javascript基础题：

一.请写出下面输出值, 并且写出打开注释以后的输出值 ？(考察this)

```js
this.a = 20;
var test = {
    a: 40,
    init: () => {
        console.log(this.a);
        function go() {
            // this.a = 60;
            console.log(this.a);
        }
        go.prototype.a = 50;
        return go;
    }
};
// var p = test.init();
// p();
new (test.init())()
```

二：请写出下面代码的弹出值和打印值 ？(考察作用域相关)

```js
+function(){
    alert(a);
    a();
    var a = function () {
        console.log(1);
    }
    function a() {
        console.log(2);
    }
    alert(a);
    a();
    var c = d = a;
}();
alert(d);
alert(c);
```

三：请写出下面输出值 (考察原型原型链)

```js
Object.prototype.a = 'a';
Function.prototype.a = 'a1';
function Person(){};
var fe = new Person();
console.log('fe.a', fe.a);
console.log(1..a);
```

四：请写出下列代码的输出结果（考察事件循环队列和promise）

```js
async function async1() {
    return new Promise(resolve => {
        Promise.resolve().then(() => {
            async2().then(resolve)
        })
    }).then(() => {
        console.log('6')
    })
}
async function async2() {
    console.log('1')
}
async1()

Promise.resolve().then(function () {
    console.log('2')
}).then(function () {
    console.log('4')
}).then(function () {
    console.log('7')
})

Promise.resolve().then(function () {
    console.log('3')
}).then(function () {
    console.log('5')
}).then(function () {
    console.log('8')
})
```

es6基础题：

一：请实现一个Promise.race函数（考察promise）

二：请实现一个函数composeFunctions效果如下

```js
// composeFunctions(fn1,fn2,fn3,fn4)等价于fn4(fn3(fn2(fn1))
const add = x => x + 1;
const multiply = (x, y) => x * y;
const multiplyAdd = composeFunctions(multiply, add);
multiplyAdd(3, 4) // 返回 13
```
    
    