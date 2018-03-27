## 数值的扩展

* **1、二进制和八进制表示法**  

  ES6提供了二进制和八进制数值的新的写法，分别用前缀0b和0o表示。八进制用0o前缀表示的方法，将要取代已经在ES5中被逐步淘汰的加前缀0的写法。

  ```js
  // 数字
  0xffff 65535  -- 十六进制数字
  0o11  9  --- 八进制数字
  0b11  3  --- 二进制数字

  // 字符
  x 字符 x
  \\ 反斜线字符
  \0n 八进制值的字符0n (0 <= n <= 7)
  \0nn 八进制值的字符 0nn (0 <= n <= 7)
  \0mnn 八进制值的字符0mnn 0mnn (0 <= m <= 3, 0 <= n <= 7)
  \xhh 十六进制值的字符0xhh
  \uhhhh 十六进制值的字符0xhhhh
  \t 制表符('\u0009')
  \n 换行符 ('\u000A')
  \r 回车符 ('\u000D')
  \f 换页符 ('\u000C')
  \a 响铃符 ('\u0007')
  \e 转义符 ('\u001B')
  ```


* **2、Number.isFinite(), Number.isNaN()**  

  ES6在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法，用来检查Infinite和NaN这两个特殊值。  
  Number.isFinite()用来检查一个数值是否非无穷（infinity）。Number.isFinite("15"); // false  

  ```js
  (function (global) {
    var global_isFinite = global.isFinite;

    Object.defineProperty(Number, 'isFinite', {
      value: function isFinite(value) {
        return typeof value === 'number' && global_isFinite(value);
      },
      configurable: true,
      enumerable: false,
      writable: true
    });
  })(this);

    //es 5写法
    var isNaN = function (n) {
        return n !== n;
    };
    var isFinite = function (v) {
        return (typeof v === "number" && !isNaN(v) && v !== Infinity && v !== -Infinity);
    };
  ```

  Number.isNaN()用来检查一个值是否为NaN。与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为
  数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false。  

* **3、Number.parseInt(), Number.parseFloat()**  

  ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。逐步减少全局性方法。

* **4、Number.isInteger()和安全整数**  

  Number.isInteger()用来判断一个值是否为整数。需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被
  视为同一个值。  

  ```js
  Number.isInteger(25.0) // true
  Number.isInteger(25.1) // false

  (function (global) {
    var floor = Math.floor,
      isFinite = global.isFinite;

    Object.defineProperty(Number, 'isInteger', {
      value: function isInteger(value) {
        return typeof value === 'number' && isFinite(value) &&
          value > -9007199254740992 && value < 9007199254740992 &&
          floor(value) === value;
      },
      configurable: true,
      enumerable: false,
      writable: true
    });
  })(this);
  ```

  JavaScript能够准确表示的整数范围在-2ˆ53 and 2ˆ53之间。ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。
