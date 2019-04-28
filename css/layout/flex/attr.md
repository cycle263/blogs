## Flexbox

  > 弹性布局，任何一个容器都可以指定为flex布局。`display: flex|inline-flex`

* 容器属性 container

  > main axis(x轴、主轴) 和 cross axis(y轴、交叉轴)

  - flex-direction [row | row-reverse | column | column-reverse] main axis的方向

  ![](./images/direction.png)

  - flex-wrap [nowrap | wrap(down) | wrap-reverse(up)] 默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。nowrap会带来单行flex容器，其他属性值将带来多行flex容器。

    flex-wrap 属性会会定义你使用 flexbox 容器的类型：

    flex-wrap: nowrap 定义下的 flex 容器是一个 single-line 的 flex 容器；
    flex-wrap：wrap | wrap-reverse 会定义一个 multi-line 的 flex 容器。

    其次，align-items 和 align-self 两个属性在 single-line 和 multi-line 两种 flex 容器中都可以工作。然而，但只有在坐标轴还有剩余空间的时候才会产生效果。

    最后，align-content 属性只能 multi-line 的 flex 容器中产生效果，它会直接无视被定义为 single-line 的 flex 容器。

  - flex-flow [<flex-direction> || <flex-wrap>] 上面两个的合体

  - **justify-content** [flex-start | flex-end | center | space-between | space-around] 定义了项目在主轴上的对齐方式。注意，主轴可能是水平的也可能是垂直的。

  ![](./images/justify.png)

  - **align-items** [flex-start | flex-end | center | baseline | stretch(拉伸占满)] 交叉轴相对本轴线的对齐方式，也可以作用于多行flex容器，但都必须有自由空间。align-items作用于所有items，align-self只作用于自身item.

  ![](./images/align.png)

  - **align-content** [flex-start | flex-end | center | space-between | space-around | stretch] 定义了多根轴线的对齐方式，也就是多行之间的行间距。单行flex容器，该属性不起作用，会被忽略，也就是说对于多行item时有作用。

  ![](./images/align-content.png)

* 本身属性 item

  > item 则沿着 main axis排布。

  - order [<integer>] 排列顺序，默认 0, 数值越小，排列越靠前

  - flex-grow [<number>] 放大比例，默认1, 即如果存在剩余空间，该元素按照权重比例放大。剩余参照此值

  - flex-shrink [<number>] 缩小比例，默认1，即如果空间不足，该item将缩小。溢出参照此值

  - flex-basis [<length> | auto; /* default auto */] 分配多余空间之前，项目占据的 main size, 默认auto

  - flex none | [ <flex-grow> <flex-shrink>? || <flex-basis> ] flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto，后两个属性可选。

  - **align-self** [auto | flex-start | flex-end | center | baseline | stretch] 让单个item有与其他item不一样的对齐方式，可覆盖align-items属性，默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。既可以作用于单行flex，也可以作用于多行flex。

* 备注

  - flex item 宽度指定

![align-self vs align-item vs align-content](https://juejin.im/entry/5b1de4c15188257d53145ce8)
