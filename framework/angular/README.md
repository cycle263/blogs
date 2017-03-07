## angular

* 脏检查机制

  ng只有在指定事件触发后，才进入$digest cycle：

  - DOM事件，譬如用户输入文本，点击按钮等。(ng-click)
  - XHR响应事件 ($http)
  - 浏览器Location变更事件 ($location)
  - Timer事件($timeout, $interval)
  - 执行$digest()或$apply()

  Object.defineProperties中的setter/getter实现属性变化监控watcher，IE低版本可以用 `Object.__defineGetter__ / Object.__defineSetter__ `替换。
