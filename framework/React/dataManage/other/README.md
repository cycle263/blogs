## 其他redux辅助库

* redux-thunk

  ```js
  // sync thunk
  function add (x, y) {
    return x + y;
  }

  var thunk = function() {
    return add(10, 15);
  };

  thunk();    // 25

  // async thunk
  function addAsync (x, y, cb) {
    setTimeout(function(){
      cb(x + y);
    });
  }

  var thunk = function(cb) {
    addAsync(10, 15, cb);
  }

  thunk(function(sum) {
    console.log(sum);  // 25
  })

  // makeThunk
  function makeThunk(fn) {
    var args = [].slice.call(arguments, 1);   // 获取除fn以外的参数
    return function(cb) {
      args.push(cb);
      fn.apply(null, args);
    }
  }

  var thunk = makeThunk(addAsync, 10, 15);
  ```

* redux-promise

* redux-saga