* 1、概述
  promise模式在任何时刻都处于以下三种状态之一：未完成（unfulfilled）、已完成（resolved）和拒绝（rejected）。  
  promise对象上的then方法负责添加针对已完成和拒绝状态下、的处理函数。then(fulfilledHandler, errorHandler, progressHandler)。  
  then方法会返回另一个promise对象，以便于形成promise管道，这种返回promise对象的方式能够支持开发人员把异步操作串联起来  
  
* 2、jQuery Deferred的背景和作用  
  deferred对象是jQuery的回调函数解决方案。它解决了如何处理耗时操作的问题，对那些操作提供了更好的控制，以及统一的编程接口。  
  - (1). ajax操作的链式写法， 返回的是deferred对象，1.5版本之前返回的是XHR；
  - (2). 同一个ajax请求，多个回调函数, 异步完成之后再添加回调会立即执行；
  - (3). 多个异步操作可以使用同一个回调
  
* 3、jQuery Deferred的特性
  - deferred对象有三种状态：  
    + pending：表示操作还没有完成。
    + resolved：表示操作成功。
    + rejected：表示操作失败。
  
  - 避免出现随意改变deferred状态的情况出现，jQuery提供了deferred.promise()方法。它的作用是，在原来的deferred对象上返回另一个
  deferred对象，后者只开放与改变执行状态无关的方法（比如done()方法和fail()方法），屏蔽与改变执行状态有关的方法（比如
  resolve()方法和reject()方法），从而使得执行状态不能被改变。 

    + （1)$.Deferred() 生成一个deferred对象。
　  + （2)deferred.done() 指定操作成功时的回调函数
　  + （3）deferred.fail() 指定操作失败时的回调函数
　  + （4）deferred.promise() 没有参数时，返回一个新的deferred对象，该对象的运行状态无法被改变；接受参数时，作用为在参数
　　      对象上部署deferred接口。
　  + （5）deferred.resolve() 手动改变deferred对象的运行状态为"已完成"，从而立即触发done()方法。
　- （6）deferred.reject() 这个方法与deferred.resolve()正好相反，调用后将deferred对象的运行状态变为"已失败"，从而立即触发
　　      fail()方法。
　- （7）$.when()为多个操作指定回调函数。除了这些方法以外，deferred对象还有二个重要方法，上面的教程中没有涉及到。
　- （8）deferred.then()有时为了省事，可以把done()和fail()合在一起写，这就是then()方法。
　　    `$.when($.ajax( "/main.php" )).then(successFunc, failureFunc ); `
如果then()有两个参数，那么第一个参数是done()方法的回调函数，第二个参数是fail()方法的回调方法。如果then()只有一个参数，那么等同于done()。  
　- （9）deferred.always()用来指定回调函数的，不管调用的是deferred.resolve()还是deferred.reject()，最后总是执行。
　　    $.ajax( "test.html" ).always( function() { alert("已执行！");} );

* 4、then方法  deferred.then( doneFilter [, failFilter ] [, progressFilter ] )
  在jQuery 1.8之前，then()只是.done().fail()写法的语法糖，两种写法是等价的。在jQuery 1.8之后，then()返回一个新的promise对象，
  而done()返回的是原有的deferred对象。如果then()指定的回调函数有返回值，该返回值会作为参数，传入后面的回调函数。
  例如：
  $.ajax( url1, { dataType: "json" } )
  .then(function( data ) {
      return $.ajax( url2, { data: { user: data.userId } } );
  }).done(function( data ) {
    // 从url2获取的数据
  });
  上面代码最后那个done方法，处理的是从url2获取的数据，而不是从url1获取的数据。利用then()会修改返回值这个特性，我们可以在
  调用其他回调函数之前，对前一步操作返回的值进行处理。如果回调函数返回deferred对象，则then方法的返回值将是对应这个返回值
  的promise对象。
  
* 5、pipe方法
  pipe方法接受一个函数作为参数，表示在调用then方法、done方法、fail方法、always方法指定的回调函数之前，先运行pipe方法指定
  的回调函数。它通常用来对服务器返回的数据做初步处理。
  
* 6、promise对象
  一般情况下，从外部改变第三方完成的异步操作（比如Ajax）的状态是毫无意义的。为了防止用户这样做，可以在deferred对象的
  基础上，返回一个针对它的promise对象。promise对象就是不能改变状态的deferred对象，可以通过promise对象，为原始的deferred
  对象添加回调函数，查询它的状态。
  
* 7、jQuery.when方法
  接受多个deferred对象作为参数，当它们全部运行成功后，才调用resolved状态的回调函数，但只要其中有一个失败，就调用
  rejected状态的回调函数。它相当于将多个非同步操作，合并成一个。实质上，when方法为多个deferred对象，返回一个单一的
  promise对象。
  如果when方法的参数不是deferred或promise对象，则直接作为回调函数的参数。
  如果when方法的参数都不是deferred或promise对象，那么when方法的回调函数将立即运行。
  
* 备注：Promise事实上的标准是社区提出的Promise A+规格，jQuery的实现并不完全符合Promise A+，主要是对异常的处理。
  Promise A+规定此时Promise实例的状态变为reject，该错误被下一个catch方法指定的回调函数捕获。但是，jQuery的Deferred对象
  此时不会改变状态，亦不会触发回调函数，该错误一般情况下会被window.onerror捕获。换句话说，在Deferred对象中，总是必须
  使用reject方法来改变状态。

