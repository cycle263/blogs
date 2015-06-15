//方法一
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


//方法二
function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
