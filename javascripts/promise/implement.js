/********** Promise的实现思路  *************/

var promise = new Promise(function(resolve, reject){

});

function Promise(executor){
  var self = this;
  self.status = 'pending';    // 初始化状态
  self.data = undefined;
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];

  var resolve = function(){

  };

  var reject = function(){

  };

  try {                       //  执行executor可能出现异常
    executor(resolve, reject);
  } catch(e) {
    reject(e);
  }
}

// =========>

var resolve = function(value){
  if(self.status === 'pending'){
    self.status = 'resolved';
    self.data = value;
    for(var i = 0, l = self.onResolvedCallback.length; i++){
      self.onResolvedCallback[i](value);
    }
  }
};

var reject = function(reason){
  if(self.status === 'pending'){
    self.status = 'rejected';
    self.data = reason;
    for(var i = 0, l = self.onRejectedCallback.length; i++){
      self.onRejectedCallback[i](reason);
    }
  }
};

// =========>

Promise.prototype.then = function(onResolved, onRejected){
  var self = this;
  var promise2;

  onResolved = typeof onResolved === 'function' ? onResolved : function(v){};
  onRejected = typeof onRejected === 'function' ? onRejected : function(v){};

  if(self.status === 'resolve'){
    return promise2 = new Promise(function(resolve, reject){
      try {
        var p = onResolved(self.data);
        if(p instanceof Promise){   // 如果返回一个Promise
          p.then(resolve, reject);
        }
        resolve(p);   // 否则，以它的返回值做为promise2的结果
      } catch(e){
        reject(e);    // 如果出错，以捕获到的错误做为promise2的结果
      }
    });
  }

  if(self.status === 'reject'){
    return promise2 = new Promise(function(resolve, reject){
      try {
        var p = onRejected(self.data);
        if(p instanceof Promise){   // 如果返回一个Promise
          p.then(resolve, reject);
        }
      } catch(e){
        reject(e);
      }
    });
  }

  if(self.status === 'pending'){
    self.onResolvedCallback.push(function(value){
      try {
        var p = onResolved(self.data);
        if(p instanceof Promise){   // 如果返回一个Promise
          p.then(resolve, reject);
        }
      } catch(e){
        reject(e);    // 如果出错，以捕获到的错误做为promise2的结果
      }
    });

    self.onRejectedCallback.push(function(reason){
      try {
        var p = onRejected(self.data);
        if(p instanceof Promise){   // 如果返回一个Promise
          p.then(resolve, reject);
        }
      } catch(e){
        reject(e);
      }
    });
  }
};

Promise.prototype.catch = function(){
  return this.then(null, onRejected);
};

// =========>

Promise.deferred = Promise.defer = function(){
  var dfd = {};
  dfd.promise = new Promise(function(resolve, reject){
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dtd;
};
