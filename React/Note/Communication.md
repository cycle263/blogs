## React数据交互的几种方式：

* 1、父子组件之间  
  
  > 想让子组件改变父组件的数据，可以在父组件中传一个callback(回调函数)给子组件，子组件内调用这个callback即可改变父组件的数据。
  
* 2、兄弟组件之间

  > 兄弟组件不能直接相互传送数据，此时可以将数据挂载在父组件中，由两个组件共享
  
  - 如果组件需要数据渲染，则由父组件通过props传递给该组件；
  
  - 如果组件需要改变数据，则父组件传递一个改变数据的回调函数给该组件，并在对应事件中调用。

* 3、全局事件
  
  > 可以使用事件来实现组件间的沟通

  - 改变数据的组件发起一个事件，使用数据的组件监听这个事件，在事件处理函数中触发setState来改变视图或者做其他的操作
  
  - 使用事件实现组件间沟通脱离了单向数据流机制，不用将数据或者回调函数一层一层地传给子组件，可以避免出现上述的亲戚图。
  
    ```
    var EventEmitter = {
      _events: {},
      dispatch: function (event, data) {
          if (!this._events[event]) return; // no one is listening to this event
          for (var i = 0; i < this._events[event].length; i++)
              this._events[event][i](data);
      },
      subscribe: function (event, callback) {
        if (!this._events[event]) this._events[event] = []; // new event
        this._events[event].push(callback);
      },
      unSubscribe: function(event){
      	if(this._events && this._events[event]) {
      		delete this._events[event];
      	}
      }
    }
    ```
  
  - 事件绑定和解绑可以分别放在componentDidMount和componentWillUnMount中。由于事件是全局的，最好保证在componentWillUnMount中解绑事件，否则，下一次初始化组件时事件可能会绑定多次。

* 4、上下文 
