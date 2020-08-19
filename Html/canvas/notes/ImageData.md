## ImageData

Canvas中的ImageData对象存储着canvas对象真实的像素数据。

* 属性

  - width
  - height
  - data Uint8ClampedArray类型的一维数组，包含着RGBA格式的整型数据，范围在 0 至 255 之间（包括 255）。

* 创建imageData

  `var myImageData = ctx.createImageData(width, height); // 所有像素被预设为透明黑`

* 获取imageData

  `var myImageData = ctx.getImageData(left, top, width, height);`

* 写入imageData

  `ctx.putImageData(myImageData, dx, dy);`
