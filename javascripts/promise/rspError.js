var myDeferred = $.post('/echo/json/', {json:JSON.stringify({'error':true})})
.then(function (response) {
        if (response.error) {
            return $.Deferred().reject(response);
        }
        return response;
    },function () {
        return $.Deferred().reject({error:true});
    }
);

myDeferred.done(function (response) {
    $("#status").html("Success!");
}).fail(function (response) {
    $("#status").html("An error occurred");
});
  
  /*
  * 上面代码中，不管是通信出错，或者服务器返回一个错误，都会调用reject方法，
  * 返回一个新的deferred对象，状态为rejected，因此就会触发fail方法指定的回调函数。
  */
