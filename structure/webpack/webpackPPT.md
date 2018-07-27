## webpack的基本原理

* 作用

  - 依赖管理，让模块能够复用，避免全局注入，避免重复加载等

  - 预编译，ES6+转译成ES5-，jsx、coffeescript转成js，less、sass转译成CSS，小图片转换成base64等

  - 合并代码，将依赖模块和业务模块合并打包成文件，以减少http请求；压缩混淆减少文件体积大小

- 工作流程

  `分析代码 -> 寻找依赖 -> 生成依赖链 -> 使用对应的loader -> 生成抽象语法树AST -> 遍历AST, 输出js`

## webpack4区别

* mode

  - development，devlopment针对开发环境做了优化，不再需要注入变量process.env.NODE_ENV，此变量值跟mode值相同。

  - production(default)，production针对生产环境做了优化。比如：压缩（minification）、作用域提升（scope hoist）等等，以及很多默认插件都不再需要自己引入。

* 插件系统升级

  ```js
  // webpack 3
  compiler.plugin('done',callback) // 注册
  compilitation.applyPlugins('done',params) // 触发

  // webpack 4 - tapable
  compiler.hooks.done.tap('mypluinname',callback) // 注册
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
    // 异步加载js写法；
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

    + ECMAScript的dynamic import, `import('lodash').then(_ => {})`，第三方插件方式包括：

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

      ```js
      require(['./list'], function(list){
          list.show();
      });
      ```

* 压缩

* 作用域提升

* tree shaking
