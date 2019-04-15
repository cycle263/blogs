```js
/**
 * 数据监听器
 * @param {*} data 
 */
function observe(data){
  if(!data || typeof data !== 'object'){
    console.error('The data format error!');
    return;
  }
  Object.keys(data).forEach(function(k){
    var value = data[k];
    if(typeof value === 'object')
      observe(value);
    Object.defineProperty(data, k, {
      enumerable: true,
      configurable: true,
      get: function() {
        return value;
      },
      set: function(newVal) {
        if(value === newVal) return;
        console.log('Data has changed, new value: ' + newVal);
        value = newVal;
        Pubsub.publish();
      }
    });
  });
}

// src/core/observer/watcher.js
function update() {
  if (this.cumputed) {

  } else if (this.sync) { // 同步更新
    this.run();
  } else {
    queueWatcher(this);   // 推送到队列中，异步批量更新，下一个tick执行
  }
}

// src/core/observer/scheduler.js

/* 将一个观察者对象push进观察者队列，在队列中已经存在相同的id则
 * 该watcher将被跳过，除非它是在队列正被flush时推送
 */
export function queueWatcher(watcher) {
  const id = watcher.id
  if (has[id] == null) {     // 检验id是否存在，已经存在则直接跳过，不存在则标记哈希表has，用于下次检验
    has[id] = true
    queue.push(watcher)      // 如果没有正在flush，直接push到队列中
    if (!waiting) {          // 标记是否已传给nextTick
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}

/* 重置调度者状态 */
function resetSchedulerState() {
  queue.length = 0
  has = {}
  waiting = false
}
```