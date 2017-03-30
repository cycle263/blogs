## css易错总结

* display: inline-block  同行两个inline-block出现上下错位不对齐。

  原因：元素的默认vertical-align是baseline，因为推断一个元素的baseline的位置，需要根据它使用的字体信息来推断，一个没有内容的inline-block也就没有了baseline。

  解决办法：设置span的vertical-align为bottom；或为span添加内容为空格；

* contenteditable

  ```
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  ```
  在text为空的情况下，无法编辑，甚至无法聚焦于元素

* z-index详解

  可以应用z-index属性：定位的元素（relative、absolute、fixed）
