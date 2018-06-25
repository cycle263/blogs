## Array对象

* Array是JavaScript的内置对象，同时也是一个构造函数，可以用它生成新的数组。

* Array的静态方法

  - isArray, Array.isArray方法用来判断一个值是否为数组。  
    `Array.isArray([1, 3]) //true`

* Array的实例方法

  - slice、splice
    + slice(起始位置[, 终止位置(可为负数-倒数)])
    + splice(起始位置, 删除个数[, item1[, item2[, ...]]])

* String to Array  

  ```js
  var str = 'test1,test2,test3';
  str.split();      //默认用空字符串切割
  str.split(",")    //逗号切割，参数不可省略
  ```

* Array to String
  ```js
  var arr = [12, 34, 56];
  arr.join();      //默认用逗号切割
  arr.join(",")    //逗号切割，参数可省略
  ```

* 数组去重

  ```js
  [...new Set([1,2,3,1,'a',1,'a'])]   // ES6

  [1,2,3,1,'a',1,'a'].filter(function(ele,index,array){   // ES5
      return index===array.indexOf(ele)
  })

  // 数组去重 --- 性能较好，能区分hash值
  function unique(arr){
    var newArr = [],
        hash = {};
    for(var i = 0, l = arr.length; i < l; i++){
      var item = arr[i],
          key = Object.prototype.toString.call(item).slice(8, -1) + JSON.stringify(item);
        if(hash[key] !== 1){
          newArr.push(item);
          hash[key] = 1;
        }
    }
    return newArr;
  }

  // 对象数组针对某属性去重
  function unique(arr, attr) {
      let hash = {};
      return arr.reduce((item, next) => {
          hash[next[attr]] ? '' : hash[next[attr]] = true && item.push(next);
          return item;
      }, []);
  }
  ```
