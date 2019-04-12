## Array对象

* Array是JavaScript的内置对象，同时也是一个构造函数，可以用它生成新的数组。

* Array的静态方法

  - isArray, Array.isArray方法用来判断一个值是否为数组。  
    `Array.isArray([1, 3]) //true`

  - Array.from，可迭代对象转换成真正的数组，`Array.from(arrayLike[, processingFn[, thisArg]])`

* Array的实例方法

  - slice、splice
    + slice(起始位置[, 终止位置(可为负数-倒数)])
    + splice(起始位置, 删除个数[, item1[, item2[, ...]]])

* Array原型方法分类

  - 改变自身的方法：pop, push, reverse, shift, sort, splice, unshift, copyWithin, fill

  - 不改变自身：concat, join, slice, toString, toLocaleString, indexOf, lastIndexOf, includes, toSource

  - 遍历方法：forEach, every, some, map, filter, reduce, reduceRight, entries, find, findIndex, keys, values, Symbol.iterator

* Array常见的转换和变换

  + String to Array  

    ```js
    var str = 'test1,test2,test3';
    str.split();      // 默认用空字符串切割
    str.split(",")    // 逗号切割，参数不可省略
    ```

  + Array to String
    ```js
    var arr = [12, 34, 56];
    arr.join();      // 默认用逗号切割
    arr.join(",")    // 号切割，参数可省略
    ```

  + 数组去重

    ```js
    [...new Set([1, 2, 3, 1, 'a', 1, 'a'])]   // ES6 set去重

    Array.from(new Set([1,2,3,3,4,4]))  // ES6 set去重

    [1, 2, 3, 1, 'a', 1, 'a'].filter(function(ele, index, array){ 
        return index === array.indexOf(ele)
    });

    /* 数组去重 --- 性能较好，能区分hash值 */
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

    function unique(arr) {
        let hash = {};
        return arr.reduce((item, next) => {
            hash[next] ? '' : hash[next] = true && item.push(next);
            return item;
        }, []);
    }

    function unique(arr) {
      var arr = this,
        result = [],
        i,
        j,
        len = arr.length;
      for(i = 0; i < len; i++){
        for(j = i + 1; j < len; j++){
          if(arr[i] === arr[j]){
            j = ++i;
          }
        }
        result.push(arr[i]);
      }
      return result;
    }

    /* 对象数组针对某属性去重 */
    function unique(arr, attr) {
        let hash = {};
        return arr.reduce((item, next) => {
            hash[next[attr]] ? '' : hash[next[attr]] = true && item.push(next);
            return item;
        }, []);
    }
    ```

  + 数组重复性判断

  ```js
  function arrRepeat(arr){
      var arrStr = JSON.stringify(arr),str;
      for (var i = 0; i < arr.length; i++) {
          if (arrStr.indexOf(arr[i]) != arrStr.lastIndexOf(arr[i])){
              return true;
          }
      };
      return false;
  }
  ```

  + 求数组中小于N的连续的最长子数组

    ```js
    var arr = [32,453,65,61,43,654,423,16,65,98,767,55,67,435,875,54,597,322,201,199,183];
    function findLongest(arr, n) {
      var result = [], temp = [];
      var l = 0, index = -1, prev = 0, cur = 0;
      arr.forEach(function(item, i){
        if(item > n) {
          prev = cur ? cur + 1 : 0;
          cur = i;
          temp = arr.slice(prev, cur);
          temp.length && result.push(temp);
        }
      });
      temp = arr.slice(cur+1);
      temp.length && result.push(temp);
      result.forEach(function(p,k){
        if (p.length > l) {
          l = p.length;
          index = k;
        }
      });
      return result[index];
    }
    findLongest(arr, 200);
    ```

  + 数组合并

    ```js
    var arr = [1, 2, 3, 4];
    arr.concat([5, 6]); // [1,2,3,4,5,6]

    [...arr, ...[5, 6]]; // [1,2,3,4,5,6]

    [].push.apply(arr, [5, 6]);

    [5, 6].map(item => arr.push(item));
    ```

  + 数组排序的方法

    - sort

      ```js
      [1,2,3,4].sort(); // [1, 2,3,4],默认是升序

      [1,2,3,4].sort((a, b) => b - a); // [4,3,2,1] 降序
      ```

    - 冒泡排序

      ```js
      var bubleSort = function (arr) {
        let len = arr.length;
        for (let outer = len; outer >= 2; outer--) {
          for (let inner = 0; inner <= outer - 1; inner++) {
            if (arr[inner] > arr[inner + 1]) {
              /* 升序 */
              [arr[inner], arr[inner + 1]] = [arr[inner + 1], arr[inner]];
            }
          }
        }
        return arr;
      }
      ```

    - 选择排序

      ```js
      Array.prototype.selectSort = function (arr) {
        let arr=this,
          len = arr.length;
        for (let i = 0, len = this.arr.length; i < len; i++) {
          for (let j = i, len = this.arr.length; j < len; j++) {
            if (this.arr[i] > this.arr[j]) {
              [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
            }
          }
        }
        return arr;
      }
      ```

  + 数组扁平化的方法

    - concat大法, 扁平两层级

      ```js
      const arr = [1, 2, 3, [4, 5]];
      Array.prototype.concat.apply([], arr);

      [].concat(...arr);
      ```

      ```js
      /* 扁平无限层级 */
      function flatten(arr) {
        while(arr.some(item=>Array.isArray(item))) {
          arr = [].concat(...arr);
        }
        return arr;
      }
      ```

    - 递归大法

      ```js
      function steamroller(arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
          if (Array.isArray(arr[i])) {
            newArr.push.apply(newArr, steamroller(arr[i]));
          } else {
            newArr.push(arr[i]);
          }
        }
        return newArr;
      }
      ```

    - Array.prototype.flat

      `[1,[2,3,[4,5]]].flat(3);  // [1, 2, 3, 4, 5]`