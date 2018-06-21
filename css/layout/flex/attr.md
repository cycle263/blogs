## Flexbox

  > 弹性布局，任何一个容器都可以指定为flex布局

* container

  > main axis(x轴) 和 cross axis(y轴)

  - flex-direction [row | row-reverse | column | column-reverse] main axis的方向

  ![](./images/direction.png)

  - flex-wrap [nowrap | wrap(down) | wrap-reverse(up)] 默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。

  - flex-flow [<flex-direction> || <flex-wrap>] 上面两个的合体

  - justify-content [flex-start | flex-end | center | space-between | space-around]对齐方式 main axis

  ![](./images/justify.png)

  - align-items [flex-start | flex-end | center | baseline | stretch(拉伸占满)] 对齐方式 cross axis

    ![](./images/align.png)

  - align-content [flex-start | flex-end | center | space-between | space-around | stretch] 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

  ![](./images/align-content.png)

* item

  > item 则沿着 main axis排布。

  - order [<integer>] 排列顺序，默认 0, 数值越小，排列越靠前

  - flex-grow [<number>] 放大比例，默认1, 即如果存在剩余空间，该元素按照权重比例放大。剩余参照此值

  - flex-shrink [<number>] 缩小比例，默认1，即如果空间不足，该item将缩小。溢出参照此值

  - flex-basis [<length> | auto; /* default auto \*/] 分配多余空间之前，项目占据的 main size, 默认auto

  - flex none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ] flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

  - align-self [auto | flex-start | flex-end | center | baseline | stretch] 让单个item有与其他item不一样的对齐方式，可覆盖align-items属性，默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。


* 备注

  - flex item 宽度指定
