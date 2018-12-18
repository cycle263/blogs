## 日常使用的插件

* 滑动特效插件

  - Swiper: 纯javascript打造的滑动特效插件，面向手机、平板电脑等移动终端, 实现触屏焦点图、触屏Tab切换、触屏多图切换等常用效果
    [【官网地址】](http://www.swiper.com.cn/)
  
  - fullPage: 全屏滑动插件， 简单易用 [【官网地址】](http://alvarotrigo.com/fullPage/#secondPage)

* 移动端调试工具

  - vconsole / eruda / spy-debugger / weinre: 移动端调试工具dev-tool

    ```js
    window.onerror = function(messageOrEvent, source, lineno, colno, error) { 
      alert(JSON.stringify(arguments, null, 4));  // 缩进4个空格
    };
    ```

  - 启用weinre，移动设备须有有wifi无线连接，且和电脑在同一网段

    ```js
    weinre --boundHost ip.ip.ip.ip --httpPort 8888
    // 2018-11-29T10:37:26.772Z weinre: starting server at http://ip.ip.ip.ip:8888

    <!- IP是weinre服务的IP -->
    <script src="http://ip.ip.ip.ip:8888/target/target-script-min.js"></script>
    ```

参见资料

[weinre官网](http://people.apache.org/~pmuellr/weinre/)

[vconsole官网](https://github.com/Tencent/vConsole)

[weinre入门](https://segmentfault.com/a/1190000010017457)