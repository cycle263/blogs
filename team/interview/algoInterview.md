## 算法

* 不使用临时变量，互换整数型变量的数值？

  ```js
  function swap(a, b) {
    a = a - b;
    b = b + a;
    a = b - a;
  }
  swap(3, 7);
  ```

* 二叉树广度优先遍历

  ```js
  var nodes = [{
    num: 1,
    children: [{
      num: 2,
      children: [{
        num: 4,
        children: []
      }, {
        num: 5,
        children: []
      }]
    }, {
      num: 3,
      children: [{
        num: 6,
        children: []
      }, {
        num: 7,
        children: []
      }]
    }]
  }];
  // 广度优先
  function wlog(node){
    if (Array.isArray(node) && node.length){
      node.forEach(item => {
        console.log(item.num);
      });
  
      node.forEach(item => {
        if (item.children && item.children.length)
          wlog(item.children);
      });
    }
  }
  // 深度优先
  function dlog(node){
    if (Array.isArray(node) && node.length){
      node.forEach(item => {
        // console.log(item.num); 从上至下
        dlog(item.children);
        console.log(item.num);  // 从下至上
      });
    }
  }
  wlog(nodes);
  ```

* 提取括号、中括号

  ```js
  var string = '(([]()[])[])';
  ```

* 数组扁平化

  ```js
  var arr = [[2],[[2,3],[2]],3,4];
  arr.toString().split(',').map(item=> +item );
  ```

* 二分查找

  ```js
  // @arr 适合已经排序的数组
  function binaryFind(arr, target, low = 0, high = arr.length - 1) {
    const n = Math.floor((low+high) /2);
    const cur = arr[n];
    if(cur === target) {
        return `找到了${target},在第${n+1}个`;
    } else if(cur > target) {
        return binaryFind(arr,target,low, n-1);
    } else if (cur < target) {
        return binaryFind(arr,target,n+1,high);
    }
    return -1;
  }
  ```

* 快速排序

  ```js
  function quickSort(arr) {
    if(arr.length <= 1) {
      return arr;  //递归出口
    }
    var left = [],
      right = [],
      current = arr.splice(0,1); //注意splice后，数组长度少了一个
    for(let i = 0; i < arr.length; i++) {
      if(arr[i] < current) {
        left.push(arr[i])  //放在左边
      } else {
        right.push(arr[i]) //放在右边
      }
    }
    return quickSort(left).concat(current,quickSort(right)); //递归
  }
  ```

* 找出数组里面任意两个数相加等于一个值k？

  ```js
  const arr = [2,5,8,4,12,32,21,28,14], k = 16;
  const findSumIndexs = (arr, k) => {
    let hasHash = {};
    for(let i = 0; i < arr.length; i++) {
      if (hasHash[k - arr[i]] !== undefined) {
        return [hasHash[k - arr[i]], i];
      } else {
        hasHash[arr[i]] = i;
      }
    }
    return [];
  };
  findSumIndexs(arr, k);
  ```

  `备选方案：排序去掉大于k的值，在[最小值，小于但最接近k的值] 区间进行二分查找`

* 数组去重

  ```js
  // Set去重
  function uniqueArray(arr){
    return Array.from(new Set(arr));
  }

  // Object + Array
  function uniqueArray(arr) {
    var obj = {}, temp = []
    arr.forEach(item => {
      if (!obj[item]) {
        ojb[item] = true;
        temp.push(item);
      }
    });
    return temp;
  }
  ```

* 补集

  ```js
  // 补集，属于b不属于a
  const complementSet = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      console.error('Must be array');
      return [];
    }
    let result = [];
    b.forEach(item => {
      if (!a.includes(item)) result.push(item);
    });
    return result;
  };
  ```

* 字符占位算法

  ```js
  // 检查字符串长度，非Ascii字符算2位
  export function getStrLength(str) {
    if (typeof str !== 'string') return null;
    const b = str.match(/[^\x00-\xff]/g);
    return {
      length:(str.length + (!b ? 0 : b.length)),
      notAsciiLen: b.length,
    };
  };
  ```

## 其他

- [前端十大算法](https://juejin.im/post/5b72f0caf265da282809f3b5)
- [十大算法动画解析](https://github.com/MisterBooo/Article)
- [前端常见算法问题](https://juejin.im/entry/58be2168ac502e006c261ae7)
- [leetcode刷题](https://leetcode.com/)
- [前端算法与数据结构](https://zhuanlan.zhihu.com/p/27659059)
- [js算法和数据结构大全](https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md)