## Fullscreen

  > 全屏API可以控制浏览器的全屏显示，让一个Element节点（以及子节点）占满用户的整个屏幕。

* 打开全屏

  ```
  function launchFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.msRequestFullscreen){
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen();
    }
  }

  launchFullscreen(document.documentElement);
  launchFullscreen(document.getElementById("videoElement"));
  ```

  备注：Firefox自动为该节点增加一条CSS规则，将该元素放大至全屏状态，width: 100%; height: 100%，而Chrome则是将该节点放在屏幕的中央，保持原来大小，其他部分变黑。

  ```
  :-webkit-full-screen #myvideo {
    width: 100%;
    height: 100%;
  }
  ```

* 退出全屏

  ```
  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  exitFullscreen();
  ```

* 全屏属性

  - 全屏元素

    fullscreenElement属性返回正处于全屏状态的Element节点，如果当前没有节点处于全屏状态，则返回null。

    ```
    document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    ```

  - 文档是否可以全屏

    fullscreenEnabled属性返回一个布尔值，表示当前文档是否可以切换到全屏状态。

    ```
    document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled
    ```

* 全屏事件

  - fullscreenchange事件：浏览器进入或离开全屏时触发。

  - fullscreenerror事件：浏览器无法进入全屏时触发，可能是技术原因，也可能是用户拒绝。

* 全屏css

  全屏状态下，大多数浏览器的CSS支持:full-screen伪类，只有IE11支持:fullscreen伪类。

  ```
  :-webkit-full-screen {
    /* properties */
  }

  :-moz-full-screen {
    /* properties */
  }

  :-ms-fullscreen {
    /* properties */
  }

  :full-screen { /*pre-spec */
    /* properties */
  }

  :fullscreen { /* spec */
    /* properties */
  }

  /* deeper elements */
  :-webkit-full-screen video {
    width: 100%;
    height: 100%;
  }
  ```
