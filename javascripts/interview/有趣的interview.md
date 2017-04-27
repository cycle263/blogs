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

// 0 1 2 3 4, 立即执行函数会立即执行
for (var i = 0; i < 5; i++) {
  setTimeout((function(i) {
    console.log(i);
  })(i), i * 1000);
}

// setTimeout vs setInterval
setTimeout(function(){       
  // 代码块
 setTimeout(arguments.callee, 10);
}, 100);
setInterval(function(){
  // 代码块
}, 100);

// 声明提升
var foo=function(){  console.log(1); }
function foo(){  console.log(2); }
foo();  //结果为1
