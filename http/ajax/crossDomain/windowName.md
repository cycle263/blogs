### windowName方式解决跨域问题

```js
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
```