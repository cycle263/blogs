(function(){
    var dataRequest = {
        _doc: document,
        cfg: {
            proxyUrl: 'proxy.html'
        }
    };

    dataRequest.send = function(sUrl, fnCallBack){
        if(!sUrl || typeof sUrl !== 'string'){
            return;
        }

        sUrl += (sUrl.indexOf('?') > 0 ? '&' : '?') + 'windowname=true';

        var frame = this._doc.createElement('iframe'), state = 0, self = this;
        this._doc.body.appendChild(frame);
        frame.style.display = 'none';

        var clear = function(){
            try{
                frame.contentWindow.document.write('');
                frame.contentWindow.close();
                self._doc.body.removeChild(frame);
            }catch(e){}
        };

        var getData = function(){
            try{
                var da = frame.contentWindow.name;
            }catch(e){}
            clear();
            if(fnCallBack && typeof fnCallBack === 'function'){
                fnCallBack(da);
            }
        };

        frame.addEventListener('load', function(){
            if(state === 1){
                getData();
            } else if(state === 0){
                state = 1;
                frame.contentWindow.location = self.cfg.proxyUrl;
            }
        }, false);

        frame.src = sUrl;
    };
})();


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
