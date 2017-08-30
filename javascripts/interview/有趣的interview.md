```
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
```
