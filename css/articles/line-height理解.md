## line-height深入理解

* 背景

  - css中的高度由两种css模型产生

    + box盒子模型

    + line box模型

* height的产生

  - 如果一个标签既没有内容，又没有定义高度，那么它的高度由line-height决定，没有内容也就是没有line-height,所有高度为0，有内容就有行高。

  - 有内容的标签产生的高度并非文字撑开的，而是ling-height。

  - line-box并不会直接产生高度，而是其内的inline-box决定，哪个inline-box最高就是line-box高度


## vertical-align

  > 指定了每个行内框的垂直对齐方式，和line-height有着不可告人的秘密...

  ```
  /* 关键字值 */
  vertical-align: baseline;
  vertical-align: sub;
  vertical-align: super;
  vertical-align: text-top;
  vertical-align: text-bottom;
  vertical-align: middle;
  vertical-align: top;
  vertical-align: bottom;

  /* <长度> 值 */
  vertical-align: 10em;
  vertical-align: 4px;

  /* <百分比> 值 */
  vertical-align: 10%;

  /* 全局值 */
  vertical-align: inherit;
  vertical-align: initial;
  vertical-align: unset;
  ```

  [参见此文](http://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)
