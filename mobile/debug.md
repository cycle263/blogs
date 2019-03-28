## 移动端调试工具

```js
window.onerror = function(messageOrEvent, source, lineno, colno, error) { 
  alert(JSON.stringify(arguments, null, 4));  // 缩进4个空格
};
```

* chrome真机调试

  手机端安装chrome，并且打开USB调试接口，连接USB，在PC端chrome上打开`chrome://inspect`

* vconsole

  ```js
  function loadJS(src, cb) {
    "use strict";
    var ref = document.querySelector('script');
    var script = document.createElement('script);
    script.src = src;
    script.async = true;
    script.crossOrigin = 'anonymous';
    ref.parentNode.insertBefore(script, ref);
    if (cb && typeof(cb) === 'function') {
      script.onload = cb;
    }
    return script;
  }
  if (window.__jsDebug) {
    loadJS('./vconsole.js?v=3.2.0', function(){
      window.vConsole = new Window.VConsole();
    });
  }
  ```

* eruda 移动端调试工具dev-tool

  ```js
  ;(function () {
    var src = 'https://cdn.bootcss.com/eruda/1.5.4/eruda.js';
    if (!/eruda=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true') return;
    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
    document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
  })();
  ```

* 启用weinre，移动设备须有有wifi无线连接，且和电脑在同一网段

  ```js
  weinre --boundHost ip.ip.ip.ip --httpPort 8888
  // 2018-11-29T10:37:26.772Z weinre: starting server at http://ip.ip.ip.ip:8888

  <!- 需要调试的移动页面加上这个脚本，IP是weinre服务的IP -->
  <script src="http://ip.ip.ip.ip:8888/target/target-script-min.js#anonymous"></script>
  ```

* spy-debugger真机调试

  Spy-debugger内部集成了weinre，代理方式拦截所有的html请求，并自动注入weinre需要的js代码。

  关键步骤：设置手机的HTTP代理，代理IP地址设置为PC的IP地址，端口为spy-debugger的启动端口(默认端口：9888)。

  - Android设置步骤:设置 - WLAN - 长按选中网络 - 修改网络 - 高级 - 代理设置 - 手动

  - iOS设置代理步骤：设置 - 无线局域网 - 选中网络 - HTTP代理手动

  **安装证书**

  `spy-debugger initCA` 生成CA根证书，根证书生成在 `/Users/XXX/node-mitmproxy/` 目录下(Mac)，然后把node-mitmproxy.ca.crt 传到手机上，点击安装即可。

  无法读取证书文件，可以在设置中搜索`安装证书`。


参考资料

[weinre官网](http://people.apache.org/~pmuellr/weinre/)

[vconsole官网](https://github.com/Tencent/vConsole)

[weinre入门](https://segmentfault.com/a/1190000010017457)

[spy-debugger](https://github.com/wuchangming/spy-debugger)