## reselect

在redux中，每当store发生改变，所有的connect都会重新计算。这样在复杂的数据结构中，性能会变动非常差。为了减少性能浪费，可以对connect的selector函数做缓存。而且恰好，redux主张函数式编程，这样方便数据缓存。那具体如何缓存呢？

* 缓存原理

  defaultMemoize 其实就是闭包，将函数的结果和参数缓存在内存内。只要纯函数的参数不变，就可以直接返回之前缓存的函数结果。

  ```js
  export function defaultMemoize(func, equlicyCheck = defaultEqulityCheck) {
    let lastArgs = null;
    let lastResult = null;
    return (...args) => {
      if (lastArgs !== null && lastArgs.length === args.length && args.every((v, i) => equlicyChecke(v, lastArgs[i]))) {
        return lastResult;
      }
      lastResult = func(...args);
      lastArgs = args;
      return lastResult;
    };
  };
  ```
  另外需要注意的是，为了让defaultMemoize常驻内存，需要把defaultMemoize置于全局作用域，或者用其他作用域链连接到全局作用域。
