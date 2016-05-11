* 1、属性的简洁表示法  

  ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。  
  ```
  function f( x, y ) {return { x, y };}
  // 等同于
  function f( x, y ) {return { x: x, y: y };}
  ```
  
* 2、属性名表达式  

  JavaScript语言定义对象的属性，有两种方法。  
  方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要将表达式放在方括号之内。  
  ```
  let obj = {
   [propKey]: true,
   ['a'+'bc']: 123
  };
  ``
  
* 3、Object.is()  

  Object.is()用来比较两个值是否严格相等。它与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是+0不等于-0，
  二是NaN等于自身。  
  
  ```
  +0 === -0 //true
  NaN === NaN // false
  
  Object.is(+0, -0) // false
  Object.is(NaN, NaN) // true
  ```
  
* 4、Object.assign()  

  Object.assign方法用来将源对象（source）的所有可枚举属性，复制到目标对象（target）。  
  需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象。只要有一个参数不是对象，就会抛出TypeError错误。  
  目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。  
  
  -（1）为对象添加属性
  
    ```
    class Point {
      constructor(x, y) {
        Object.assign(this, {x, y});
      }
    }
    ```
    
  -（2）为对象添加方法
  -（3）克隆对象
  
    ```
    function clone(origin) {
      return Object.assign({}, origin);
    }
    ```
    
  -（4）合并多个对象
  -（5）为属性指定默认值
  
* 5、proto属性，Object.setPrototypeOf()，Object.getPrototypeOf()  
 
  proto属性，用来读取或设置当前对象的prototype对象。  
  Object.setPrototypeOf方法的作用与proto相同，用来设置一个对象的prototype对象。它是ES6正式推荐的设置原型对象的方法。  
  setPrototypeOf方法配套，用于读取一个对象的prototype对象。  
  
* 6、Symbol  独一无二  

  - (1). ES6引入了一种新的原始数据类型Symbol，表示独一无二的ID。通过Symbol函数生成。Symbol函数前不能使用new命令，否则会报错。
  Symbol类型的值不能与其他类型的值进行运算，会报错。但是，Symbol类型的值可以转为字符串(toString、String())。
  - (2). Symbol值作为对象属性名时，不能用点运算符。点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值.
  同理，在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中。
  - (3). Symbol值作为属性名时，该属性还是公开属性，不是私有属性。
  - (4). Symbol作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()返回。
  但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有Symbol属性名。
  - (5). for...in循环、Object.getOwnPropertyNames方法得不到Symbol属性名，需要使用Object.getOwnPropertySymbols方法。
  - (6). Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和Symbol键名。ES7
  - (7). Symbol.for()方法重新使用同一个Symbol值, 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。
  Symbol.keyFor方法返回一个已登记的Symbol类型值的key，未登记的Symbol值，所以返回undefined。
  - (8). Symbol.for为Symbol值登记的名字，是全局环境的，可以在不同的iframe或service worker中取到同一个值。

* 7、内置的Symbol  

  ES6还提供一些内置的Symbol值，指向语言内部使用的方法。  
  - (1).Symbol.hasInstance
  - (2).Symbol.isConcatSpreadable
  - (3).Symbol.isRegExp
  - (4).Symbol.match
  - (5).Symbol.iterator
  - (6).Symbol.toPrimitive
  - (7).Symbol.toStringTag
  - (8).Symbol.unscopables

* 8、Proxy  

  Proxy用于修改某些操作的默认行为，等同于在语言层面做出修改。  
  Proxy可以理解成在目标对象之前，架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界
  的访问进行过滤和改写。proxy这个词的原意是代理，用在这里表示由它来“代理”某些操作。  
  作为构造函数，Proxy接受两个参数。第一个参数是所要代理的目标对象，即如果没有Proxy的介入，操作原来要访问的就是这个对象；  
  第二个参数是一个设置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。  
  注意，要使得Proxy起作用，必须针对Proxy实例进行操作，而不是针对目标对象进行操作。  
  
  Proxy支持的拦截操作一览。对于没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。  

  -（1）get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']，返回类型不限。最后一个参数receiver可选，当target对象设置了propKey属性的get函数时，receiver对象会绑定get函数的this对象。
  -（2）set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
  -（3）has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
  -（4）deleteProperty(target, propKey) ：拦截delete proxy[propKey]的操作，返回一个布尔值。
  -（5）enumerate(target)：拦截for (var x in proxy)，返回一个遍历器。
  -（6）hasOwn(target, propKey)：拦截proxy.hasOwnProperty('foo')，返回一个布尔值。
  -（7）ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回对象所有自身的属性，而Object.keys()仅返回对象可遍历的属性。
  -（8）getOwnPropertyDescriptor(target, propKey) ：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
  -（9）defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
  -（10）preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
  -（11）getPrototypeOf(target) ：拦截Object.getPrototypeOf(proxy)，返回一个对象。
  -（12）isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
  -（13）setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。
  如果目标对象是函数，那么还有两种额外操作可以拦截。
  -（14）apply(target, object, args)：拦截Proxy实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
  -（15）construct(target, args, proxy)：拦截Proxy实例作为构造函数调用的操作，比如new proxy(...args)。

* 9、Reflect  

  Reflect对象与Proxy对象一样，也是ES6为了操作对象而提供的新API。Reflect对象的设计目的有这样几个。  
  -（1） 将Object对象的一些明显属于语言层面的方法，放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新  方法将只部署在Reflect对象上。
  -（2） 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
  -（3） 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
  -（4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。  
  Reflect对象的方法大部分与Object对象的同名方法的作用都是相同的。
  
* 10、Object.observe()，Object.unobserve()  

  Object.observe方法用来监听对象（以及数组）的变化。一旦监听对象发生变化，就会触发回调函数。  
  Object.observe方法接受两个参数，第一个参数是监听的对象，第二个函数是一个回调函数。  
  Object.observe方法还可以接受第三个参数，用来指定监听的事件种类。  
  Object.unobserve方法用来取消监听。  
  
  Object.observe方法目前共支持监听六种变化。  
  - add：添加属性
  - update：属性值的变化
  - delete：删除属性
  - setPrototype：设置原型
  - reconfigure：属性的attributes对象发生变化
  - preventExtensions：对象被禁止扩展（当一个对象变得不可扩展时，也就不必再监听了）  
  Object.observe和Object.unobserve这两个方法不属于ES6，而是属于ES7的一部分。不过，Chrome浏览器从33版起就已经支持。
