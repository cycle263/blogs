## 算法

* 不使用临时变量，互换整数型变量的数值？

  ```js
  function swap(a, b) {
    console.log(a, b);
    a = a - b;
    b = b + a;
    a = b - a;
    console.log(a, b);
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