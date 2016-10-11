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

  try {     //  执行executor可能出现异常
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
