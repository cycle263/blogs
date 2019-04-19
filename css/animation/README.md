## animation

人类的视神经反应速度大约为1/16秒，每个人不太一样，有些人高一点，一些人低一点。日常用的日光灯每秒钟大约会熄灭100次，但是你并没有感觉。一般电影的在帧率在24FPS以上，一般30FPS以上大脑会认为是连贯的，我们玩的游戏一般在30FPS，高帧率是60FPS。

* 帧率（FPS, Frame Per Second）

  代表每秒输出帧数，也就是浏览器每秒展示出多少张静态的图像。

### css3 animation

CSS3 动画是当今盛行的 Web 端制作动画的方式之一，对于移动设备来说覆盖率已经非常广泛，在日常开发中可以使用。CSS3 动画只能通过对 CSS 样式的改变控制 DOM 进行动画。

* [CSS3 Animation MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations)

* [CSS3 Translate MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/translate)

* will-change

  > will-change属性，允许作者提前告知浏览器的默认样式，那他们可能会做出一个元素。它允许对浏览器默认样式的优化如何提前处理因素，在动画实际开始之前，为准备动画执行潜在昂贵的工作，使之最后能够快速和流畅的渲染。

  - 当你不使用will-change的时候请记住移除它。正如我上面提到的，浏览器优化是一件耗费进程并且如果使用不当会产生不良影响的事。


### Canvas animation

JavaScript 使用 setInterval 进行定时调用函数，目前更加推荐使用requestAnimationFrame定时更新动画。requestAnimationFrame的优势，在于充分利用显示器的刷新机制，比较节省系统资源。显示器有固定的刷新频率（60Hz或75Hz），也就是说，每秒最多只能重绘60次或75次，requestAnimationFrame的基本思想就是与这个刷新频率保持同步，利用这个刷新频率进行页面重绘。此外，使用这个API，一旦页面不处于浏览器的当前标签，就会自动停止刷新。这就节省了CPU、GPU和电力。

* 补间动画

  ```js
  /**
   *  执行补间动画方法
   *
   * @param      {Number}    start     开始数值
   * @param      {Number}    end       结束数值
   * @param      {Number}    time      补间时间
   * @param      {Function}  callback  每帧的回调函数
   */
  function animate(start, end, time, callback) {
      let startTime = performance.now() // 设置开始的时间戳
      let differ = end - start // 拿到数值差值
      // 创建每帧之前要执行的函数
      function loop() {
          raf = requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
          const passTime = performance.now() - startTime // 获取当前时间和开始时间差
          let per = passTime / time // 计算当前已过百分比
          if (per >= 1) { // 判读如果已经执行
              per = 1 // 设置为最后的状态
              cancelAnimationFrame(raf) // 停掉动画
          }
          const pass = differ * per // 通过已过时间百分比*开始结束数值差得出当前的数值
          callback(pass) // 调用回调函数，把数值传递进去
      }
      let raf = requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
  }
  ```

* CSS3 动画 GPU加速

    [GPU 加速是什么](https://juejin.im/entry/58f0a6b58d6d81006471fe8a)