var promise = new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequeest();
    xhr.open('GET', URL, true);
    xhr.onload = function(){
        if(xhr.status === 200){
            resolve(xhr.responseText);
        }else{
            reject(new Error(req.statusText));
        }
    };
    xhr.onerror = function(){
        reject(new Error(req.statusText));
    };
    xhr.send();
});

promise.then(function(value){
    console.log(value);
}, function(error){
    console.log(error);
});

promise.then(function(value){
    console.log(value);
}).catch(function(error){
    console.log(error);
});
