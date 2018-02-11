### jsonp的实现方案


```
var $jsonp = function(src, opts){
    var callback_name = opts.callbackName || 'callback',
        on_success = opts.onSuccess || function(){},
        on_timeout = opts.onTimeout || function(){},
        timeout = opts.timeout || 10; // sec

    var timeout_trigger = window.setTimeout(function(){
        window[callback_name] = function(){};
        on_timeout();
    }, timeout * 1000);

    window[callback_name] = function(data){
        window.clearTimeout(timeout_trigger);
        on_success(data);
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;

    document.getElementsByTagName('head')[0].appendChild(script);
};

// 是一种非正式传输协议，该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据。基本原理为script脚本没有同源策略，实际上是src属性不受同源策略影响，也就是说img,script,iframe元素



// method 2
function proxy (url, callback) {
    var flag = true,
        $iframe = document.createElement('iframe'),
        loadCallBack = function () {
            if (flag) {
                // 这里我们还得在域名为 http://127.0.0.1:9000 建立一个tmp.html文件当做缓存界面
                $iframe.contentWindow.location = 'http://127.0.0.1:9000/tmp.html';
                flag = false;
            }
            // 修改localtion后，每次触发onload事件会重置src，相当于重新载入页面，然后继续触发onload。
            // 这里是针对该问题做的处理
            else {
                callback($iframe.contentWindow.name);
                $iframe.contentWindow.close();
                document.body.removeChild($iframe);
                $iframe.src = '';
                $iframe = null;
            }
        };

    $iframe.src = url;
    $iframe.style.display = 'none';
    // 事件绑定兼容简单处理
    // IE 支持iframe的onload事件，不过是隐形的，需要通过attachEvent来注册
    if ($iframe.attachEvent) {
        $iframe.attachEvent('onload', loadCallBack);
    }
    else {
        $iframe.onload = loadCallBack;
    }

    document.body.appendChild($iframe);
}
proxy('http://127.0.0.1/bop/test.html', function(data){
    console.log(data);
});
```