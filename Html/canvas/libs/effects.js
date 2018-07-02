// canvas 的特效处理函数
var imgData = ctx.getImageData();
var filter = {
  // 灰度效果
  grayscale: function (pixels) {
    var d = pixels.data;

    for (var i = 0, len = d.length; i < len; i += 4) {
      var r = d[i],
        g = d[i + 1],
        b = d[i + 2];
      d[i] = d[i + 1] = d[i + 2] = (r + g + b) / 3;
    }

    return pixels;
  },

  // 复古效果
  sepia: function (pixels) {
    var d = pixels.data;

    for (var i = 0, len = d.length; i < len; i += 4) {
      var r = d[i],
        g = d[i + 1],
        b = d[i + 2];

      d[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
      d[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
      d[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
    }

    return pixels;
  },

  // 红色蒙版效果
  red: function (pixels) {
    var d = pixels.data;

    for (var i = 0, len = d.length; i < len; i += 4) {
      var r = d[i],
        g = d[i + 1],
        b = d[i + 2];

      d[i] = (r + g + b) / 3;
      d[i + 1] = d[i + 2] = 0;
    }

    return pixels;
  },

  // 反转效果
  invert: function (pixels) {
    var d = pixels.data;

    for (var i = 0, len = d.length; i < len; i += 4) {
      var r = d[i],
        g = d[i + 1],
        b = d[i + 2];

      d[i] = 255 - r;
      d[i + 1] = 255 - g;
      d[i + 2] = 255 - b;
    }
    return pixels;
  }
};
ctx.putImageData(filter[type](imgData));