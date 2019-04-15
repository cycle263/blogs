```js
function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  // 此处为了触发属性的getter，从而在dep添加自己，结合Observer更易理解
  this.value = this.get();
}
Watcher.prototype = {
  update: function () {
    this.run();    // 属性值变化收到通知
  },
  run: function () {
    var value = this.get(); // 取到最新值
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal); // 执行Compile中绑定的回调，更新视图
    }
  },
  get: function () {
    Dep.target = this;    // 将当前订阅者指向自己
    var value = this.vm[exp];    // 触发getter，添加自己到属性订阅器中
    Dep.target = null;    // 添加完毕，重置
    return value;
  }
};
// 这里再次列出Observer和Dep，方便理解
Object.defineProperty(data, key, {
  get: function () {
    // 由于需要在闭包内添加watcher，所以可以在Dep定义一个全局target属性，暂存watcher, 添加完移除
    Dep.target && dep.addDep(Dep.target);
    return val;
  }
  // ... 省略
});
Dep.prototype = {
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update(); // 调用订阅者的update方法，通知变化
    });
  }
};
```