/* wait方法 */
$.extend({
  wait: function(t){
    return $.Deferred(function(df){
      setTimeout(df.resolve, t);
    });
  }
});

// 构造函数声明模式，包裹一个非promise API, 避免使用deferred
new Promise(function(resolve, reject){
  fs.readFile('mytest.text', function(err, file){
    if(err){
      return reject(err);
    }
    resolve(file);
  });
}).then(/** todo **/);
