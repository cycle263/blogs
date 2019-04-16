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

## 其他

[前端十大算法](https://juejin.im/post/5b72f0caf265da282809f3b5)
[前端常见算法问题](https://juejin.im/entry/58be2168ac502e006c261ae7)
[leetcode刷题](https://leetcode.com/)
[前端算法与数据结构](https://zhuanlan.zhihu.com/p/27659059)