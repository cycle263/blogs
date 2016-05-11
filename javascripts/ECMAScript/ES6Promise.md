* 1、Promise对象有以下两个特点：  

  -（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和
  Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由
  来，意味着“承诺”，表示其他手段无法改变。  

  -（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从
  Pending变为Rejected。另外，状态改变之后，再对Promise对象添加回调函数，也会立即得到结果。这与事件（Event）完全不同，事件的
  特点是，如果错过了它，再去监听，是得不到结果的。
  
* 2、Promise基本用法  

  Promise对象是一个构造函数，用来生成Promise实例。Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
  它们是两个函数，由JavaScript引擎提供，不用自己部署。  
  Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。then方法可以接受两个回调函数作为参数。  
  第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Reject时调用。  
  
* 3、Promise.prototype.then()  

  作用是为Promise实例添加状态改变时的回调函数。then方法返回的是一个新的Promise实例。  
  第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数(链式写法)。  
  
* 4、Promise.prototype.catch()  

  Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。  
  
* 5、Promise.all()  

  Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。有一个被rejected，新的promise的状态就变成rejected。  
  
* 6、Promise.race()  

  Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。有一个实例率先改变状态，新的promise的状态就跟着改变。
  
* 7、Promise.resolve()  

  将现有对象转为Promise对象，Promise.resolve方法就起到这个作用，且它的状态为Resolved。
  
* 8、Promise.reject()  

  Promise.reject(reason)方法也会返回一个新的Promise实例，该实例的状态为rejected。