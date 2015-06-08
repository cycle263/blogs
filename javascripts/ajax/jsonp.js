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
