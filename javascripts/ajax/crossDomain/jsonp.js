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