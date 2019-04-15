## 高阶组件（HOC）

高阶组件可以看作React对装饰模式的一种实现，是一个没有副作用的纯函数。其本质就是一个函数接受一个组件作为参数，并返回一个新的组件，新的组件主要是扩展它的行为。例如：高阶组件通过包裹（wrapped）被传入的React组件，经过一系列处理，最终返回一个相对增强（enhanced）的React组件，供其他组件调用。

 ```js
  function showComp(WrappedComp) {
    return class extends Component {
      render() {
        const { visible, ...props } = this.props;
        return visible ? <WrappedComp {...props} /> : null;
      }
    }
  }
  ```

* HOC的实现方式

  - 属性代理是最常见的高阶组件的使用方式，将被包裹组件的props和新生成的props一起传递给此组件，这称之为属性代理。实际上 ，这种方式生成的高阶组件就是原组件的父组件，上面的函数test就是一个HOC属性代理的实现方式。

    ```js
    export default function withHeader(WrappedComponent) {
      return class HOC extends Component {
        getWrappedRef = () => this.wrappedRef;    /* 获取元组件的ref, React@16.3可以使用forward */
        render() {
          const newProps = {
            test:'hoc'
          }
          /* 透传props，并且传递新的newProps */
          return <div>
            <WrappedComponent {...this.props} {...newProps} ref={ref => this.wappedRef = ref;}/>
          </div>
        }
      }
    }
    ```

  - 基于反向继承的方式，React组件继承了被传入的组件，所以它能够访问到的区域、权限更多，能通过this访问到原组件的生命周期、props、state、render等，相比属性代理方式，它更像打入组织内部，对其进行修改，比如操作组件的state，渲染劫持，获取refs等。

    ```js
    export default function (WrappedComponent) {
      return class Inheritance extends WrappedComponent {
        componentDidMount() {
          /* 可以方便地得到state，做一些更深入的修改 */
          console.log(this.state);
          /* 调用元组件的生命周期函数 */
          super.componentDidMount && super.componentDidMount();
          super.setState({});
        }
        render() {
          /* 条件渲染 */
          return this.props.visible ? <div>
            {/*公用title */}
            <div className="title">{this.props.title}</div> 
            {super.render()}
          </div> : null
        }
      }
    }

    /* 渲染劫持 */
    exprot default function (WrappedComponent) {
      return class extends WrappedComponent {
        
        render() {
          /* tree对象属性的所有writable属性均被配置为false，因此使用cloneElement来增加新组件 */
          const tree = super.render();
          let newProps = {};
          if (tree && tree.type === 'select') {
            newProps = { test: 'select' };
          }
          const props = Object.assign({}, tree.props, newProps);
          const newTree = React.cloneElement(tree, props, tree.props.children);
          return newTree;
        }
      }
    }
    ```

* React中如何使用HOC

  - compose（组合）

  组合多个高阶组件，高阶组件为React组件增强了一个功能，如果需要同时增加多个功能需要组合多个高阶组件，使用compose可以简化上述过程，也能体现函数式编程思想。

  compose可以帮助我们组合任意个（包括0个）高阶函数，例如compose(a, b, c)返回一个新的函数d，函数d依然接受一个函数作为入参，只不过在内部会依次调用c, b, a，从表现层对使用者保持透明。compose函数实现方式有很多种，比如：recompact.compose，lodash.flowRight，Redux提供的combineReducers函数等

    ```js
    /* use compose */
    const enhance = compose(withHeader, withLoading);
    @enhance
    class Demo extends Component{ }
    ```

  另外，redux中的connect，其实就是一个柯里化的HOC。

    ```jsx
    // MyComponent 是纯的 UI 组件
    <div className="index">
      <p>{this.props.text}</p>
      <input defaultValue={this.props.name} onChange={this.props.onChange} />
    </div>

    const App = connect(mapStateToProps, mapDispatchToProps)(MyComponent);

    // mapStateToProps: 定义 UI 组件参数与 State 之间的映射
    // mapDispatchToProps: 定义 UI 组件与 Action 之间的映射
    function reducer(state = {
      text: '你好，访问者',
      name: '访问者'
    }, action) {
      switch (action.type) {
        case 'change':
          return {
            name: action.payload,
            text: '你好，' + action.payload
          };
      }
    }
    const initState = {};
    const store = createStore(reducer, initState);

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.body.appendChild(document.createElement('div'))
    );

    // Store由 Redux 提供的createStore方法生成，该方法接受reducer作为参数。
    // 为了把Store传入组件，必须使用 Redux 提供的Provider组件在应用的最外面，包裹一层。
    ```

  - 装饰器

  使用ES7的Decorators让写法更加优雅

  ```js
  @withHeader
  @withLoading
  class Demo extends Component{ }

  // 或者结合compose
  const hoc = compose(withHeader, withLoading);
  @hoc
  class MyConponent extends Component {}
  ```

* HOC主要应用

  - 公用渲染判断（权限，用户基本信息，日志埋点）
  - 数据双向绑定
  - 表单校验，自定义form组件，包裹所有表单元素，使用context传值

* 与父组件区别

高阶组件作为一个函数，它可以更加纯粹地关注业务逻辑层面的代码，比如数据处理，数据校验，发送请求等，可以改善目前代码里业务逻辑和UI逻辑混杂在一起的现状。父组件则是UI层的东西，我们先前经常把一些业务逻辑处理放在父组件里，这样会造成父组件混乱的情况。为了代码进一步解耦，可以考虑使用高阶组件这种模式。

* 高阶组件的基本原则

  - 无副作用

  高阶组件就是一个没有副作用的纯函数。函数的调用参数相同，则结构永远相同。它不依赖于函数外部任何状态或数据的变化，只依赖于入参。高阶组件函数不会产生任何可观察的副作用，例如网络请求，输入和输出设备或数据突变。

  - 透传props

  未使用或改变的props一定要透传给原组件，高阶组件增强原组件功能，但绝对不改变原组件props。


### 高阶函数

javascript中，函数可以当做参数传递，也可以被当做返回值返回，高阶函数就是这一类的函数。有哪些函数属于高阶函数呢？

```js
connect(mapStateToProps, mapDispatchToProps)(MyComponent);

function connect(...otherProps) {
  return (MyComponent) => {
    return <MyComponent {...this.props} {...otherProps} />
  }
}
```

- 回调函数    `function func(callback) { callback(); }`

- 偏函数

将函数当做返回值输出的典型应用就是偏函数。类型判断函数都是典型的偏函数

```js
isType = function(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj) === "[object " + type + "]";
    }
}

isString = isType('String');
```

- 柯里化函数（currying）[fun(params)(otherParams)]

一个currying的函数首先会接受一些参数，接受这些参数之后，函数并不会立即求值，而是继续返回另一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。柯里化的过程是将函数拆分成功能更具体化的函数，那反柯里化的作用则在于扩大函数的适用性，使本来作为特定对象所拥有的功能函数可以被任意对象所使用。

```js
var currying = function(fn) {
  var args = [];

  return function() {
    if (arguments.length === 0) {
      return fn.applay(this, args);
    } else {
      args = args.concat(arguments);
      return arguments.callee;
    }
  }
}
```

- 节流函数

某些事件可能会被重复的触发，但事件处理函数并不需要每次都执行，这个时候就可以使用节流函数。

```js
// method 1
function throttle(fn, interval) {
  var doing = false;

  return function() {
    if (doing) {
      return;
    }
    doing = true;
    fn.apply(this, arguments);
    setTimeout(function() {
      doing = false;
    }, interval);
  }
}

// method 2
var throttle = function (fn, delay, atleast) {
  var timer = null;
  var previous = null;

  return function () {
    var now = +new Date();

    if ( !previous ) previous = now;

    if ( now - previous > atleast ) {
        fn();
        // 重置上一次开始时间为本次结束时间
        previous = now;
    } else {
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn();
        }, delay);
    }
  }
};
```

- 防抖函数

```js
// method 1
function debounce(fn, interval) {
  var timer = null;

  function delay() {
    var target = this;
    var args = arguments;
    return setTimeout(function(){
      fn.apply(target, args);
    }, interval);
  }

  return function() {
    if (timer) {
      clearTimeout(timer);
    }

    timer = delay.apply(this, arguments);
  }
};

// method 2
function _debounce (fn, delay, context) {
  var timer = null

  if (delay === 0) {
    return fn
  }
  return function () {
    var eContext = context || this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(eContext, args)
    }, delay)
  }
}
```