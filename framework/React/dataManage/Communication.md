## React数据交互的几种方式：

* 1、父子组件之间  

  想让子组件改变父组件的数据，可以在父组件中传一个callback(回调函数)给子组件，子组件内调用这个callback即可改变父组件的数据。

* 2、兄弟组件之间

  兄弟组件不能直接相互传送数据，此时可以将数据挂载在父组件中，由两个组件共享

  - 如果组件需要数据渲染，则由父组件通过props传递给该组件；

  - 如果组件需要改变数据，则父组件传递一个改变数据的回调函数给该组件，并在对应事件中调用。

* 3、全局事件

  可以使用事件来实现组件间的沟通

  - 改变数据的组件发起一个事件，使用数据的组件监听这个事件，在事件处理函数中触发setState来改变视图或者做其他的操作

  - 使用事件实现组件间沟通脱离了单向数据流机制，不用将数据或者回调函数一层一层地传给子组件，可以避免出现上述的亲戚图。

    ```js
    var EventEmitter = {
      _events: {},
      dispatch: function (event, data) {
          if (!this._events[event]) return; /* no one is listening to this event */
          for (var i = 0; i < this._events[event].length; i++)
              this._events[event][i](data);
      },
      subscribe: function (event, callback) {
        if (!this._events[event]) this._events[event] = []; /* new event */
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

* 4、上下文 (context)

  使用上下文可以让子组件直接访问祖先的数据或函数，无需从祖先组件一层层地传递数据到子组件中。  

  + 父辈组件中

    - childContextTypes 用于验证上下文的数据类型，这个属性是必须要有的，否则会报错。

    - getChildContex t用于指定子组件可直接访问的上下文数据。

  + 子辈组件中

    - this.context.curItem 属性访问父辈组件可以之间访问的数据。

    - contextTypes中设置可访问数据的验证类型，否则this.context是访问不了。

* 5、ref

  - ref回调属性

    ref属性可以是一个回调函数，并且这个回调函数会在组件被挂载后立刻被执行。引用到的组件会被作为参数传递，这个回调函数可以立即使用组件，或者把它的引用保存起来供将来使用（又或者，两者兼有）。

    ```jsx
    render() {
      return <TextInput ref={(c) => this._input = c} />;
    }
    componentDidMount() {
      this._input.focus();
    }
    ```

  - ref字符串属性

    React也支持在任意组件上使用一个字符串（而不是回调）来作为ref属性。尽管这种做法现在已经基本被弃用。

    ```jsx
    <input ref="myInput" />
    var input = this.refs.myInput;
    ```

* 6、状态管理框架(redux、Mobx)

总结

- 1.父子组件之间通过属性来传递数据，属性可以是普通字符串也可以是回调函数  

- 2.兄弟组件之间可以给每个组件设置一个ref属性，然后同样可通过属性来传递此ref数据
  但是建议不要这么做，这样结合过于紧密，正确的做法应该是通过消息来解决，Flux是facebook推的一种解决方案，实现这种方案的框架非常之多，Redux是Flux的一种实现，它让组件之间的交互，状态的维护变得简单
