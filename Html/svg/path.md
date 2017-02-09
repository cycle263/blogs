## path

  > 命令（大写字母: 绝对定位，小写字母: 相对定位）+ 参数（坐标之类...）

  [详情资料](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths)

- 直线命令

  * M: move to, 移动画笔，但是不画连线

  * L: line to, 移动画笔，并且画上连线

  * V: 绘制垂直线

  * H: 绘制水平线

  * Z: 闭合路径，不区分大小写，连接当前位置和起点的连线

    `<path d="M10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black"/>`

- 曲线命令

  * 贝塞尔曲线

    + 二次贝赛尔曲线

      只需要一个控制点，用来确定起点和终点的曲线斜率。因此它需要两组参数，控制点和终点坐标。

      `Q x1 y1, x y (or q dx1 dy1, dx dy)`
      `T x y (or t dx dy)`

    + 三次贝塞尔曲线

      三次贝塞尔曲线需要定义一个点和两个控制点，所以用C命令创建三次贝塞尔曲线，需要设置三组坐标参数。最后一个坐标(x,y)表示的是曲线的终点，另外两个坐标是控制点，(x1,y1)是起点的控制点，(x2,y2)是终点的控制点。

      `<path d="M10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/>`

      S命令可以用来创建与之前那些曲线一样的贝塞尔曲线，但是，如果S命令跟在一个C命令或者另一个S命令的后面，它的第一个控制点，就会被假设成前一个控制点的对称点。如果S命令单独使用，前面没有C命令或者另一个S命令，那么它的两个控制点就会被假设为同一个点。

      `S x2 y2, x y (or s dx2 dy2, dx dy)`

  * 弧形

    弧形可以视为圆形或椭圆形的一部分。弧形命令A的前两个参数分别是x轴半径和y轴半径，弧形命令A的第三个参数表示弧形的旋转情况。参数是large-arc-flag（角度大小） 和sweep-flag（弧线方向），large-arc-flag决定弧线是大于还是小于180度，0表示小角度弧，1表示大角度弧。sweep-flag表示弧线的方向，0表示从起点到终点沿逆时针画弧，1表示从起点到终点沿顺时针画弧。

    `A rx ry x-axis-rotation large-arc-flag sweep-flag x y
    a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy`
