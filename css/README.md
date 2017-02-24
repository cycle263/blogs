## css常见知识

* white-space: pre-wrap

  ![pre-wrap](./images/wrap.png)

* 多行溢出省略号

  ```
  // 兼容性一般，需要兼容性好的，只能用js处理了
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  ```
