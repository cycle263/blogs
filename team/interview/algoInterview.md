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

* 找出数组里面任意两个数相加等于一个值k？

  `排序去掉大于k的值，在[最小值，小于但最接近k的值] 区间进行二分查找`

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

## 其他

[前端十大算法](https://juejin.im/post/5b72f0caf265da282809f3b5)
[前端常见算法问题](https://juejin.im/entry/58be2168ac502e006c261ae7)
[leetcode刷题](https://leetcode.com/)
[前端算法与数据结构](https://zhuanlan.zhihu.com/p/27659059)