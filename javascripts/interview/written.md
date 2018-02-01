```
// 写出打印的结果和理由
function swap(x, y){
  var temp = x;
  x = y;
  y = temp;  
}

var a = 1
var b = 2
swap(a, b)
console.log(a) //输出什么
console.log(b) //输出什么

var obj1 = {name: 'jirengu'}
var obj2 = {age: 2}
swap(obj1, obj2)
console.log(obj1)  //输出什么
console.log(obj2)  //输出什么





// 写出打印的结果和理由
var a = 1;

function fn(){
  console.log(a);
  var a = 5;
  console.log(a);  
  a++;
  var a;
  fn3();
  fn2();
  console.log(a);

  function fn2(){
    console.log(a);
    a = 20;
  }
}

function fn3(){
  console.log(a)
  a = 200;
}

fn();
console.log(a);





// 写出打印的顺序和理由
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
```


// 写出打印的结果和理由
```
function foo() {
	var a = 2;
	this.bar();
}

function bar() {
	console.log( this.a );
}

foo(); //undefined
```