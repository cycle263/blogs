## canvas性能提升

* 遇到在多个连续的帧中重绘相似的物体的时，可以通过预渲染场景中的大部分物体来获取巨大的性能提升。意思是，把一个很庞大的画布内容拆分成很多个组件，并把不会频繁变动的小组件缓存在临时canvas里，然后通过渲染image的方式加载临时canvas到主画布中。

  备注：确保临时的canvas大小适合，过大的canvas复制到较小的画布时会带来多余的性能。

  ```js
  myEntity.offscreenCanvas = document.createElement("canvas");
  myEntity.offscreenCanvas.width = myEntity.width;
  myEntity.offscreenCanvas.height = myEntity.height;
  myEntity.offscreenContext = myEntity.offscreenCanvas.getContext("2d");

  myEntity.render(myEntity.offscreenContext);
  ```

* 用一个长的指令集载入将绘图状态机载入，然后全部写入到video缓冲区，这样会更有效率。例如：画一条复杂的路径时，将所有的点放到路径中会比单独的绘制各个部分要高效的。

  备注：当然也有例外的情况，若欲绘制的对象的部件中含有小的边界框（垂直的线条或者水平的线条），单独的渲染这些线条会更加有效。

* canvas元素是在一个状态机之上实现的，频繁地操纵状态机也会导致性能上的开销。

* 重绘时尽量使用重绘差异部分来获得显著的性能提升，也就是说不要任何情况下都进行清除整个画布。

* 使用多个渲染层来制作复杂的图形，也就是利用元素的透明度来渲染多个canvas层。例如：背景canvas

  ```html
  <canvas id="bg" width="640" height="480" style="position: absolute; z-index: 0"></canvas>  
  <canvas id="fg" width="640" height="480" style="position: absolute; z-index: 1"></canvas>  
  ```

* 避免使用阴影，性能消耗较大

* 绘制非整数坐标，canvas会自动使用抗锯齿失真以达到边缘平滑；假如平滑的效果非必须，尽量使用整数坐标，以此大大提高运行性能

  ```js
  // With a bitwise or.  
  rounded = (0.5 + somenum) | 0;  
  // A double bitwise not.  
  rounded = ~~ (0.5 + somenum);  
  // Finally, a left bitwise shift.  
  rounded = (0.5 + somenum) << 0;  
  ```

* 尽量使用浏览器推荐标准API requeatAnimationFrame，它不会超出屏幕的刷新频率，并且当页面不可见时，它会停止渲染。
