## 深度优先遍历 vs 广度优先遍历

* 深度优先遍历

  ```js
  /*深度优先遍历的几种方式*/
  let deepTraversal1 = (node, nodeList = []) => {
    if (node !== null) {
      nodeList.push(node);
      let children = node.children;
      for (let i = 0; i < children.length; i++) {
        deepTraversal1(children[i], nodeList);
      }
    }
    return nodeList;
  };

  let deepTraversal2 = (node) => {
    let nodes = [];
    if (node !== null) {
      nodes.push(node);
      let children = node.children;
      for (let i = 0; i < children.length; i++) {
        nodes = nodes.concat(deepTraversal2(children[i]));
      }
    }
    return nodes;
  };

  let deepTraversal3 = (node, nodes = []) => {
    if (node !== null) {
      let children = node.children;
      if (children && children.length)
        Array.from(children).map(item => deepTraversal3(item, nodes));
      nodes.push(node);
    }
    return nodes;
  };

  // 非递归
  let deepTraversal4 = (node) => {
    let stack = [];
    let nodes = [];
    if (node) {
      // 推入当前处理的node
      stack.push(node);
      while (stack.length) {
        let item = stack.pop();
        let children = item.children;
        nodes.push(item);
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(children[i]);
        }
      }
    }
    return nodes;
  };
  ```

* 广度优先遍历

  ```js
  let deepTraversal5 = (node) => {
    let stack = [];
    let nodes = [];
    if (node) {
      // 推入当前处理的node
      stack.push(node);
      while (stack.length) {
        let item = stack.shift();
        let children = item.children;
        nodes.push(item);
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(children[i]);
        }
      }
    }
    return nodes;
  };
  ```