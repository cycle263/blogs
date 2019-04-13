## webpack之性能优化

webpack的优化技巧，提升构建速度(并行编译、hash缓存、预编译)，减少构建包大小，加快页面加载速度（减少编译体积-treeShaking|scopeHositing、hash缓存、分包机制）等。

* 优化的相关概念

  - 构建时间：一次全量构建 = install modules time + webpack loaders time + webpack plugins time

* 具体优化细节

  - install优化，一般可使用国内镜像，例如：cnpm,tnpm 等。[镜像详情参见](../npm/cmd)。 
  
    这里推荐使用npminstall工具，安装依赖速度提升明显，[提升幅度参见](https://github.com/cnpm/npminstall)

  - 依赖包大小优化

    + 去掉重复的依赖包，删除未使用依赖包，uninstall移除的依赖包；

    + 精准尽可能小的依赖包，或者使用小功能包替换大而全的功能包；`fecha -> moment, lodash/isequal || lodash.isequal -> lodash`，缺点是可能引发重复打包。在使用antd 的时间组件时，不建议替换moment，因为重度依赖moment。

  - 另外，使用第三方库的优化插件，例如：`babel-plugin-antd、babel-plugin-lodash等`
  
    ```js
    // 使用时，插件会进行组件关联性梳理，只引入相关组件和样式
    webpackConfig.babel.plugins.push(['antd', {
      style: 'css',
    }]);
    ```

  - babel优化，polyfill使用方式优化，推荐使用presets引入方式，不建议使用`require('babel-pollyfill');`方式，[babel polyfill引入方式详情](../babel/)

  - css-module，增加样式hash后缀，避免组件之间的样式干扰，缺点是增大了打包后的文件大小。

  - jsx文件未ES5化，成熟的 npm 包会在发布前将自己 es5，甚至 es3 化，这些依赖包完全没有经过 babel 的必要。可以配置loader的exclude项过滤。实际上，在当下 2018 年，对于大部分用户(90%)而言，我们根本不需要把代码编译到 ES5，不仅体积大，而且运行速度慢。支持 `<script type="module">` 的浏览器，必然支持下面的特性：async/await、Promise、Class、箭头函数、Map/Set、fetch 等等...

  而不支持 `<script type="module">` 的老旧浏览器，会因为无法识别这个标签，而不去加载 ES2015+ 的代码。另外老旧的浏览器同样无法识别 nomodule 熟悉，会自动忽略它，从而加载 ES5 标准的代码。

    ```js
    {
      test: /\.js(x)*$/,
      loader: 'babel-loader',
      exclude: function(path) {
          // 路径中含有 node_modules 的就不去解析。
          var isNpmModule = !!path.match(node_modules/);
          return isNpmModule;
      },
      query: {
          presets: ['react', 'es2015-ie', 'stage-1']
      }
    }
    ```

  - externals，把我们的依赖申明为一个外部依赖，外部依赖通过 `<script>` 外链脚本引入。这样配置可以减少打包构建速度，充分利用CDN缓存机制，具体配置： `externals: ['react', 'react-dom', 'react-router']`

  - alias, resolve.alias 模块别名定义，直接引用别名即可，也可以提高webpack搜索的速度

  - noParse，module.noParse会让 webpack 忽略对其进行文件的解析，直接会进入最后的 bundle。例如：react.min.js这类没有依赖的模块，构建速度会更快。

  - DllPlugin 和 DllReferencePlugin， deps 中也引用了大量的 npm 包，而这些包在正常的开发过程中并不会进行修改，但是在每一次构建过程中却需要反复的将其分析，使用dllplugin可以避免这样的消耗。

  简单来说 DllPlugin 的作用是预先编译一些模块，而 DllReferencePlugin 则是把这些预先编译好的模块引用起来。这边需要注意的是 DllPlugin 必须要在 DllReferencePlugin 执行前，执行过一次。它的缺点也很明显，就是很多重复的内容被多次打包进了bundle文件，因此不适合生产环境使用。

  dllPlugin 和 commonChunkPlugin 是二选一的，并且在启用 dll 后和 external、common 一样需要在页面中引用对应的脚本，在 dll 中就是需要手动引用 vendor.dll.js。

  - stats (string/object)打包过程的日志信息展示，五种输出级别："errors-only"、"minimal"、"none"、"normal"、"verbose"，[stats详细介绍](./config)

  - 懒加载，也即是按需加载，require.ensure 或者 bundle-loader，syntax-dynamic-import，react-loadable
  
  require.ensure 内部依赖于 Promises，旧的浏览器中使用记得引入 es6-promise polyfill。

  React Loadable 将动态引入(dynamic import)封装成了一个对 React 友好的 API 来在特定组件下引入代码分割的功能。

    ```js
    // bundle-loader
    bundle((file) => {...})

    require.ensure('module', () => {...})

    // babel-plugin-syntax-dynamic-import
    import('module').then(() => {...}).catch()

    // react-loadable高阶组件方式
    const LoadableBar = Loadable({
      loader: () => import('./components/Bar'),
      loading() {
        return <div>Loading...</div>
      }
    });
    ```

  - 图片懒加载

    react-lazyload、react-lazy-load。也可以先加载一张低像素的模糊图片，然后等高清图片加载完毕进行替换。lazyload 组件的原理大概分为两种：

    + 监听 window 对象或者父级对象的 scroll 事件，触发 load；

    + 使用 Intersection Observer API 来获取元素的可见性。

  - 图片加载优化

    base64化，减少http请求，推荐使用HTTP2，多路连接复用

    使用压缩的图片格式webP、sharpP（压缩图方案，比webP效率更高）

  - 占位显示（placeholder）

    在加载文本、图片的时候，经常出现“闪屏”的情况，比如图片或者文字还没有加载完毕，此时页面上对应的位置还是完全空着的，然后加载完毕，内容会突然撑开页面，导致“闪屏”的出现，造成不好的体验。为了避免这种突然撑开的情况，我们要做的就是提前设置占位元素，也就是 placeholder，成熟的第三方组件：react-placeholder、react-hold

  - 作用域提升 - scope hoisting

    ModuleConcatenationPlugin(webpack3) -> optimization.concatenateModules(webpack4)。scope hoisting的效果同样也依赖于静态分析。带来的好处是，减少bundle体积，较少不必要的作用域。

    **实现原理**：分析出模块之间的依赖关系，尽可能的把打散的模块合并到一个函数中去，但前提是不能造成代码冗余。因此，只有被引用过一次的模块才会被合并。

    **失效情况**: 必须采用ES6模块化语法的代码，因为ES6模块化的代码是静态的，webpack才能分析出需要剔除哪些代码。

    ```js
    /* 开启前 */
    [
      /* 0 */
      function(module, exports, require) {
          var module_a = require(1)
          console.log(module_a['default'])
      }

      /* 1 */
      function(module, exports, require) {
          exports['default'] = 'module A'
      }
    ]

    /* 开启后 */
    [
      function(module, exports, require) {
          var module_a_defaultExport = 'module A'
          console.log(module_a_defaultExport)
      }
    ]
    ```

  - HappyPack

    webpack的打包过程是io密集和计算密集型的操作，如果能同时fork多个进程并行处理各个任务，将会有效的缩短构建时间，HappyPack就能做到这点。其中happyThreadPool是根据cpu数量生成的共享进程池，防止过多的占用系统资源。

    ```js
    const HappyPack = require('happypack');
    const os = require('os');

    const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

    module.exports = {
      ...
      module: {
        plugins: [
          ...
          new HappyPack({
              id: 'happyBabel',
              loaders: [{
                  loader: 'babel-loader',
                  options: {
                      cacheDirectory: true,
                      presets: ['react', 'es2015', 'stage-0'],
                      plugins: ['add-module-exports', 'transform-decorators-legacy'],
                  },
              }],
              threadPool: happyThreadPool,
              verbose: true,
          }),
          new HappyPack({
              id: 'happyCss',
              loaders: ['css-loader', 'postcss-loader'],
              threadPool: happyThreadPool,
              verbose: true,
          }),
        ],
      }
    };
    ```


## 分割代码的方式

* 入口方式：使用 entry 配置手动地分离代码。

  - 入口chunks之间包含重复的模块(lodash)，那些重复模块(lodash)都会被引入到各个bundle中。

  - 这种方式不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。

* CommonsChunkPlugin：使用 CommonsChunkPlugin 去重和分离 chunk。

  - name和names：chunk的名称，如果这个chunk已经在entry中定义，该chunk会被直接提取；如果没有定义，则生成一个空的chunk来提取其他所有chunk的公共代码。

* 动态import：通过模块的内联函数调用来分离代码。


  
* [按需加载](https://react-guide.github.io/react-router-cn/docs/guides/advanced/DynamicRouting.html)

[基于路由的按需加载](https://react.docschina.org/docs/code-splitting.html)
