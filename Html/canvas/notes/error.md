## 各类问题总结

* canvas 可以通过css width方式进行缩放，但是图形会失真，当字体不清晰时，可以考虑将宽高放大，然后用css方式缩小到目标画布大小，解决字体清晰度问题。

* canvas元素动画抖动，一般是因为js运算精度和drawImage的四舍五入引起，可以考虑使用固定值解决此问题。

* canvas渲染图片出现锯齿，一般都是因为drawImage对图片进行压缩，PPI很高的手机，会出现锯齿。

  ```js
  if (devicePixelRatio) {
    c.style.width = width + "px";
    c.style.height = height + "px";
    c.height = height * window.devicePixelRatio;
    c.width = width * window.devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  ```
