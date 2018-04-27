## Math对象的扩展

* **Math.trunc()**  

  Math.trunc方法用于去除数的小数部分，返回整数部分。对于非数值，Math.trunc内部使用Number方法将其先转为数值。不会四舍五入，不同于Number.prototype.toFixed, Math.ceil, Math.floor, Math.round

  ```js
  Math.trunc(-4.9)        // -4
  Math.trunc('123.456')   // 123
  Math.trunc(true)        //1
  Math.trunc(false)       // 0
  Math.trunc(null)        // 0
  Math.trunc(NaN);      // NaN
  Math.trunc('foo');    // NaN
  Math.trunc(undefined) // NaN

  // polyfill
  Math.trunc = Math.trunc || function(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
  };
  ```

* **Math.sign()**  

  Math.sign方法用来判断一个数到底是正数、负数、还是零。如果参数为正数，返回+1；参数为负数，返回-1；  
  参数为0，返回0；参数为-0，返回-0; 参数为NaN，返回NaN。  

  ```js
  Math.sign(-5) // -1
  Math.sign(5) // +1
  Math.sign(0) // +0
  Math.sign(-0) // -0
  Math.sign(NaN) // NaN

  // 参数是非数值，会自动转为数值
  Math.sign('')  // 0
  Math.sign(true)  // +1
  Math.sign(false)  // 0
  Math.sign(null)  // 0
  Math.sign('9')  // +1
  Math.sign('foo')  // NaN
  Math.sign()  // NaN
  Math.sign(undefined)  // NaN

  // polyfill
  Math.sign = Math.sign || function(x) {
    x = +x; // convert to a number
    if (x === 0 || isNaN(x)) {
      return x;
    }
    return x > 0 ? 1 : -1;
  };
  ```
  
* **Math对象其他静态方法** 

  - Math.acosh(x)   返回x的反双曲余弦（inverse hyperbolic cosine）

  - Math.asinh(x)   返回x的反双曲正弦（inverse hyperbolic sine）

  - Math.atanh(x)   返回x的反双曲正切（inverse hyperbolic tangent）

  - Math.cbrt(x)    返回x的立方根

  - Math.clz32(x)   返回x的32位二进制整数形式的前导0的个数

  - Math.cosh(x)    返回x的双曲余弦（hyperbolic cosine）

  - Math.expm1(x)   返回eˆx - 1

  - Math.fround(x)  返回x的单精度浮点数形式，64位双精度浮点数转为32位单精度浮点数

  - Math.hypot(...values) 返回所有参数的平方和的平方根

  - Math.imul(x, y) 返回两个参数以32位整数形式相乘的结果

  - Math.log1p(x)   返回1 + x的自然对数

  - Math.log10(x)   返回以10为底的x的对数

  - Math.log2(x)    返回以2为底的x的对数

  - Math.tanh(x)    返回x的双曲正切（hyperbolic tangent）
