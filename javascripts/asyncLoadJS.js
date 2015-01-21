function asyncLoadJS(fileName){
    var doc = document,
        head = doc.getElementsByTagName('head')[0],
        scripts = doc.getElementsByTagName('script'),
        script = doc.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', fileName);
    
    for(var i = 0, l = scripts.length; i < l; i++){
        if(scripts[i].attributes.src == fileName){
            console.log('脚本已经存在');
            return;
        }
    }
    
    head.appendChild(script);
}
