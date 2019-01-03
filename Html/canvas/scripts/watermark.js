const genWaterMark = (text, opts) => {
  const options = Object.assign({
    width: 200,
    height: 80,
    color: 'rgba(0, 0, 0, 0.1)',
    alpha: .6,
    rotate: - Math.PI / 12,  // 默认15deg
    font: '16px Microsoft Yahei'
  }, opts);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = options.width;
  canvas.height = options.height;
  ctx.clearRect(0, 0, options.width, options.height);

  ctx.globalAlpha = 0; // backgroud is alpha
  ctx.translate(options.width * 0.05, options.height * 0.9);
  ctx.rotate(options.rotate);
  ctx.textAlign = "left";
  ctx.font = options.font;
  ctx.fillStyle = options.color;
  ctx.globalAlpha = options.alpha;
  ctx.fillText(text, 0, 0);

  return canvas.toDataURL('image/png');
};

export {
  genWaterMark,
};