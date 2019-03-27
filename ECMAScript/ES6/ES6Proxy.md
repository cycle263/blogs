## Proxy 

> Proxy(拦截器或代理器)用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy可以理解成在目标对象之前，架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。proxy这个词的原意是代理，用在这里表示由它来“代理”某些操作。<br />

```js
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});
```

* 构造函数

  作为构造函数，Proxy接受两个参数。

  - 第一个参数是所要代理的目标对象，即如果没有Proxy的介入，操作原来要访问的就是这个对象；  

  - 第二个参数是一个设置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。  
  注意，要使得Proxy起作用，必须针对Proxy实例进行操作，而不是针对目标对象进行操作。  

* proxy接口

  Proxy支持的拦截操作一览。对于没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。  

  - （1）get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']，返回类型不限。最后一个参数receiver可选，当target对象设置了propKey属性的get函数时，receiver对象会绑定get函数的this对象。

  - （2）set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。

  - （3）has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。

  - （4）deleteProperty(target, propKey) ：拦截delete proxy[propKey]的操作，返回一个布尔值。

  - （5）enumerate(target)：拦截for (var x in proxy)，返回一个遍历器。

  - （6）hasOwn(target, propKey)：拦截proxy.hasOwnProperty('foo')，返回一个布尔值。

  - （7）ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回对象所有自身的属性，而Object.keys()仅返回对象可遍历的属性。

  - （8）getOwnPropertyDescriptor(target, propKey) ：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

  - （9）defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

  - （10）preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。

  - （11）getPrototypeOf(target) ：拦截Object.getPrototypeOf(proxy)，返回一个对象。

  - （12）isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。

  - （13）setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。
  如果目标对象是函数，那么还有两种额外操作可以拦截。

  - （14）apply(target, object, args)：拦截Proxy实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

  - （15）construct(target, args, proxy)：拦截Proxy实例作为构造函数调用的操作，比如new proxy(...args)。

  ```js
  let target = {
      foo: "Welcome, foo"
  }
  let proxy = new Proxy(target, {
      get (receiver, name) {
          return name in receiver ? receiver[name] : `Hello, ${name}`
      }
  })
  proxy.foo   === "Welcome, foo"
  proxy.world === "Hello, world"
  ```

## Reflect  

  Reflect对象与Proxy对象一样，也是ES6为了操作对象而提供的新API。Reflect对象的设计目的有这样几个。 

  - （1） 将Object对象的一些明显属于语言层面的方法，放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新  方法将只部署在Reflect对象上。

  - （2） 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。

  - （3） 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。

  - （4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。  
  Reflect对象的方法大部分与Object对象的同名方法的作用都是相同的。

  * Reflect对象一共有 13 个静态方法。

  - Reflect.apply(target, thisArg, args)
  - Reflect.construct(target, args)
  - Reflect.get(target, name, receiver)
  - Reflect.set(target, name, value, receiver)
  - Reflect.defineProperty(target, name, desc)
  - Reflect.deleteProperty(target, name)
  - Reflect.has(target, name)
  - Reflect.ownKeys(target)
  - Reflect.isExtensible(target)
  - Reflect.preventExtensions(target)
  - Reflect.getOwnPropertyDescriptor(target, name)
  - Reflect.getPrototypeOf(target)
  - Reflect.setPrototypeOf(target, prototype)

