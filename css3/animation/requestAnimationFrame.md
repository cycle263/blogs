## requestAnimationFrame

  > requestAnimationFrame是浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘。

  * 优势

    requestAnimationFrame的优势，在于充分利用显示器的刷新机制，比较节省系统资源。显示器有固定的刷新频率（60Hz或75Hz），也就是说，每秒最多只能重绘60次或75次，requestAnimationFrame的基本思想就是与这个刷新频率保持同步，利用这个刷新频率进行页面重绘。此外，使用这个API，一旦页面不处于浏览器的当前标签，就会自动停止刷新。这就节省了CPU、GPU和电力。

  * 兼容

    ```
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
