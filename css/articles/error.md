## css易错总结

* display: inline-block  同行两个inline-block(一个有text，另外一个没有text)出现上下错位不对齐。

  原因：元素的默认vertical-align是baseline，因为推断一个元素的baseline的位置，需要根据它使用的字体信息来推断，一个没有内容的inline-block也就没有了baseline。

  解决办法：设置span的vertical-align为bottom；或为span添加内容为空格；

* `display: inline-block` 同行多个inline-block之间出现间距。

  原因：元素之间有空格，间距的大小与上下文的字体和文字大小相关。

  解决办法：
  
  - 去掉空格或者左外边距设置为负数
  
  - 去掉元素之间的空格（包括换行）

  - 删除闭合标签

  - 使用font-size:0

  - 使用letter-spacing

  - 使用word-spacing

* contenteditable

  ```css
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  ```
  在text为空的情况下，无法编辑，甚至无法聚焦于元素

* z-index详解

  可以应用z-index属性：定位的元素（relative、absolute、fixed）

* 多个css3属性值写法

  多个transition属性之间用逗号隔开，并且是完整的属性加时间等，`transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;`

  多个transform属性之间用空格隔开，`transform: translateX(-40px) scale(0);`

* table col width超出容器宽度，滚动条就会占位挤压单元格

* block会根据设定宽度来渲染width，未设定则会继承父元素；inline-block未定宽度则会根据内容来撑开width