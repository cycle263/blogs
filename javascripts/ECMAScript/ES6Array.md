## 数值的扩展

* 1、Array.from()  

  Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象
  （包括ES6新增的数据结构Set和Map）。  
  ```
  let ps = document.querySelectorAll('p');
  Array.from(ps).forEach(function (p) {
    console.log(p);
  });
  ```
  
  对于还没有部署该方法的浏览器，可以用Array.prototyp.slice.call方法替代。还有Array()方法可以备用。  
  Array.from()还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理。  
  Array.from(arrayLike, x => x * x);   // 等同于  
  Array.from(arrayLike).map(x => x * x);  
  
  Array.from()的一个应用是，将字符串转为数组，然后返回字符串的长度。这样可以避免JavaScript将大于\uFFFF的Unicode字符，
  算作两个字符的bug。  
  ```
  function countSymbols(string) {
    return Array.from(string).length;
  }
  ```
  
* 2、Array.of()  

  Array.of方法用于将一组值，转换为数组, 弥补数组构造函数Array()的不足。 只有当参数个数不少于2个，Array()才会返回由参数组成的新数组。
  ```
  function ArrayOf(){
    return [].slice.call(arguments);
  }
  ```
  
* 3、数组实例的find()和findIndex()  

  find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值
  为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。  
  find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。  
  findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。  
  两个方法都可以接受第二个参数，用来绑定回调函数的this对象。  
  
* 4、数组实例的fill()  

  fill()使用给定值，填充一个数组。  
  fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。  
  fill()还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。  

* 5、数组实例的entries()，keys()和values()  

  keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。  
  
* 6、数组实例的includes()  

  Array.protypeto.includes方法返回一个布尔值，表示某个数组是否包含给定的值。该方法属于ES7。第二个参数表示搜索的起始位置，
  默认为0, 可以为负数。
  
* 7、数组推导  

  ES6提供简洁写法，允许直接通过现有数组生成新数组，这被称为数组推导（array comprehension）。  
  数组推导中，for...of结构总是写在最前面，返回的表达式写在最后面。for...of后面还可以附加if语句，用来设定循环的限制条件。  
  数组推导的方括号构成了一个单独的作用域，在这个方括号中声明的变量类似于使用let语句声明的变量。  
  数组推导需要注意的地方是，新数组会立即在内存中生成。这时，如果原数组是一个很大的数组，将会非常耗费内存。  
  ```
  var years = [ 1954, 1974, 1990, 2006, 2010, 2014 ];
  [for (year of years) if (year > 2000) year];// [ 2006, 2010, 2014 ]
  [for (year of years) if (year > 2000) if(year < 2010) year];// [ 2006]
  [for (year of years) if (year > 2000 && year < 2010) year];// [ 2006]
  ```
  
* 8、Array.observe()，Array.unobserve()  

  这两个方法用于监听（取消监听）数组的变化，指定回调函数。  
  它们的用法与Object.observe和Object.unobserve方法完全一致，也属于ES7.  
  对象可监听的变化一共有六种，而数组只有四种：add、update、delete、splice（数组的length属性发生变化）
  
