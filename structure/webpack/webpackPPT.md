## webpack的基本原理

* 作用

  - 依赖管理，让模块能够复用，避免全局注入，避免重复加载等

  - 预编译，ES6+转译成ES5-，jsx、coffeescript转成js，less、sass转译成CSS，小图片转换成base64等

  - 合并代码，将依赖模块和业务模块合并打包成文件，以减少http请求；压缩混淆减少文件体积大小

- 工作流程

  `分析代码 -> 寻找依赖 -> 生成依赖链 -> 使用对应的loader -> 生成抽象语法树AST -> 遍历AST, 输出js`

  ```flow
  st=>start: 分析代码
  op1=>operation: 寻找依赖
  op2=>operation: 生成依赖链
  op3=>operation: 使用对应的loader
  op4=>operation: 生成抽象语法树AST
  e=>end: 遍历AST，输出chunk
  st->op1(right)->op2(right)->op3->op4->e
  ```

- 构建流程

  `初始化参数(config+shell) -> 初始化Compiler对象，加载插件，执行run方法开始编译 -> 找出所有入口文件 -> 调用loader进行转译，递归依赖模块，然后再循环其他入口 -> 根据依赖关系，组装chunks，转换成对应文件输出 -> 根据配置的输出路径和名称，输出到文件系统`

## webpack4区别

* mode

  - development，devlopment针对开发环境做了优化，不再需要注入变量process.env.NODE_ENV，此变量值跟mode值相同。

  - production(default)，production针对生产环境做了优化。比如：压缩（minification）、作用域提升（scope hoist）等等，以及很多默认插件都不再需要自己引入。

* 插件系统升级

  插件是 webpack 生态系统的重要组成部分，它能够钩入(hook)到在每个编译(compilation)中触发的所有关键事件。在编译的每一步，插件都具备完全访问 compiler 对象的能力，如果情况合适，还可以访问当前 compilation 对象。

  tapable 是 webpack 的一个核心工具，它提供了类似的插件接口，也可以单独使用。webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，webpack中最核心的负责编译的Compiler和负责创建bundles的Compilation都是Tapable的实例。webpack 中许多对象扩展自 Tapable 类，例如：SyncHook, SyncBailHook, AsyncParallelHook 等。
  [tapable详情](https://github.com/webpack/tapable)

  ```js
  // tapable类的原型
  class SyncHook{
    constructor(){
      this.hooks = [];
    }
    // 订阅事件
    tap(name, fn){
      this.hooks.push(fn);
    }
    // 发布
    call(){
      this.hooks.forEach(hook => hook(...arguments));
    }
  }

  // 实例化自己的钩子
  compiler.hooks.myHook = new SyncHook(['data'])

  // webpack 3
  compiler.plugin('done',callback) // 注册
  compilitation.applyPlugins('done', params) // 触发

  // webpack 4 - tapable
  compiler.hooks.done.tap('mypluinname', callback) // 注册
  compiler.hooks.done.call() // 触发
  ```

  内部插件的升级：

  - CommonChunksPlugin -> splitChunksPlugin，分包更加细腻，公用的模块会被拆分成多个独立的包，可以保证加载进来的代码一定是会被依赖到的。

  - UglifyjsWebpackPlugin -> optimization.minimize

  其他配置升级：

  - 分离出独立的webpack-cli

  - module.loaders不再支持，请使用module.rules



## webpack常见的优化手段及其原理

* 缓存

  - 长缓存

  - hash

    在 webpack 中提供了两种方式，hash 和 chunkhash。但不推荐在开发环境使用hash，增加编译时间。

    + hash：在 webpack 一次构建中会产生一个 compilation 对象，该 hash 值是对 compilation 内所有的内容计算而来的，因此hash每次都会改变。

    + chunkhash： 每一个chunk 都根据自身的内容计算而来, 可以保证在chunk没有变化的时候hash不变，文件不需要更新，chunk变了后，可保证hash唯一，由于hash太长，这里截取了hash的5个字符。

    ```js
    // webpack.config.js
    module.exports = {
        entry: {
            app: 'app.js',
            vendor: ['react', 'react-dom']
        },
        output: {
            chunkFilename: '[name].[chunkhash:5].chunk.js',
        }
    }
    ```

* 分包

  - 并行加载

  - 按需加载

    拆分方式：

    + 基于路由拆分

    ```js
    // react-router3
    <Route path="adminIndex" 
      getComponent={(attrs, callback) => { 
        require.ensure([], (require) => { 
          var d = require('../ctlComponents/IndexCtl'); 
          callback(null, d.default); 
        }, 'index'); 
      }} />

    // react-router4
    import IndexCtl from 'bundle-loader?lazy!../ctlComponents/IndexCtl.js';

    const loadAsyncModule = (Module) => prop =>(
      <Bundle load={Module}>
        {(ModuleComponent) => <ModuleComponent {...prop} />}
      </Bundle>
    );
    <Route exact path='/(index)?' render={loadAsyncModule(IndexCtl)} />
    ```

    + 基于组件拆分

    ```js

    ```

    实现方式：

    + require.ensure：webpack在编译时，会静态地解析代码中的require.ensure()，同时将模块添加到一个分开的 chunk当中。这个新的chunk会被webpack通过jsonp来按需加载。

      `require.ensure(dependencies: String[], callback: function(require), chunkName: String)`
      - dependencies 字符串数组，在回调函数执行前，可以将所有依赖包进行声明。无依赖使用空数组，保证此chunk被单独打包。声明了依赖包，会预加载懒执行，也就是，代码会download下来，但不会执行，真正执行的是callback里面的require.

      - callback 所有的依赖都加载完成后，webpack会执行这个回调函数，并传递require参数，可以进一步 require() 依赖和其它模块提供下一步的执行。require参数不能随意取名，否则无法被 webpack 静态解析器处理，所以还是请使用 require。

      - chunkName 提供给require.ensure()的chunk的名称。如果所有的ensure的chunkName定义一样，则全部放进此chunk种。也可以定义为带目录层级的名称，webpack会按照层级创建文件夹。

      备注：require.ensure 内部依赖于 Promises，旧的浏览器中使用记得引入 es6-promise polyfill。

      ```js
      /* 
      a.js 和 b.js会被打包到一起，但只有b.js会被执行。想去执行 a.js，我们需要异步地引用它，如 require、 ('./a.js')，让它的 JavaScritp 被执行。
      */
      require.ensure(['./a.js'], function(require) {
          require('./b.js');
      });
      ```

    + ECMAScript的dynamic import, 动态的 import() 提供一个基于Promise的API，写法： `import('lodash').then(_ => {})`，第三方插件方式包括：

      - bundle-loader
      
      - syntax-dynamic-import babel 插件 syntax-dynamic-import 来让 babel 可以识别 `import('lodash').then({} => {})`
      
      - react-loadable 封装了未来JS的新语法import()，是专门用于动态 import 的 React 高阶组件，可以把任何组件改写为支持动态 import 的形式。

      ```js
      import Loadable from 'react-loadable';
      import Loading from './loading-component';

      const LoadableComponent = Loadable({
        loader: () => import('./my-component'),
        loading: Loading,
      });

      export default class App extends React.Component {
        render() {
          return <LoadableComponent/>;
        }
      }
      ```

    + AMD的异步加载

      dependencies的所有包会打包到一个文件，但无法自定义名称。

      ```js
      require(['./list'], function(list){
          list.show();
      });
      ```
    + dva的动态加载

      dva 内置了 dynamic 方法用于实现组件的动态加载

      ```js
      import dynamic from 'dva/dynamic';

      const UserPageComponent = dynamic({
        app,
        models: () => [
          import('./models/users'),
        ],
        component: () => import('./routes/Users'),
      });
      ```

* 压缩 (uglify)

* 作用域提升 scope hoisting的效果同样也依赖于静态分析。带来的好处是，减少bundle体积，较少不必要的作用域。

* tree shaking 字面可以理解为摇树，所做的优化就是，过滤不必要和未用到的打包。

  Tree shaking一直是一个美丽而遥不可及的话题，它是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup。可以简单地理解为摇树，抖落掉枯萎无用的树叶。影响tree shaking的根本原因在于side effects（副作用），其中最广为人知的一条side effect就是动态引入依赖的问题。ES6其实也提供import()方法支持动态引入依赖，所以以下写法其实也是完全可行的。

  Webpack 4，官方提供了sideEffects属性，通过将其设置为false，可以主动标识该类库中的文件只执行简单输出，并没有执行其他操作，可以放心shaking。除了可以减小bundle文件的体积，同时也能够提升打包速度。为了检查side effects，Webpack需要在打包的时候将所有的文件执行一遍。而在设置sideEffects之后，则可以跳过执行那些未被引用的文件。

  webpack 4之前，可以考虑在babel中开启loose模式，或者去掉babel-loader，然后webpack打包结束后，再执行babel编译文件。
