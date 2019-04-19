## requestAnimationFrame

> requestAnimationFrame是浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘。window.requestAnimationFrame() 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。

回调函数会被传入一个参数，DOMHighResTimeStamp，指示当前被 requestAnimationFrame() 排序的回调函数被触发的时间。即使每个回调函数的工作量的计算都花了时间，单个帧中的多个回调也都将被传入相同的时间戳。该时间戳是一个十进制数，单位毫秒，最小精度为1ms(1000μs)。

* 优势

  requestAnimationFrame的优势，在于充分利用显示器的刷新机制，比较节省系统资源。显示器有固定的刷新频率（60Hz或75Hz），也就是说，每秒最多只能重绘60次或75次，requestAnimationFrame的基本思想就是与这个刷新频率保持同步，利用这个刷新频率进行页面重绘。此外，使用这个API，一旦页面不处于浏览器的当前标签，就会自动停止刷新。这就节省了CPU、GPU和电力。

  ```js
  var start = null;
  var element = document.getElementById('SomeElementYouWantToAnimate');
  element.style.position = 'absolute';

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    element.style.left = Math.min(progress / 10, 200) + 'px';
    if (progress < 2000) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
  ```

* 兼容

  ```js
  // polyfill
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  window.cancelAnimFrame = (function(){
    return  window.cancelAnimationFrame       ||
      window.webkitCancelAnimationFrame ||
      window.mozcanCelAnimationFrame    ||
      window.oCancelAnimationFrame      ||
      window.msCancelAnimationFrame;
  })();
  ```
