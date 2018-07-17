## webpack之性能优化

webpack的优化技巧，提升构建速度，减少构建包大小等。

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

  - jsx文件未ES5化，成熟的 npm 包会在发布前将自己 es5，甚至 es3 化，这些依赖包完全没有经过 babel 的必要。可以配置loader的exclude项过滤

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

  - externals，把我们的依赖申明为一个外部依赖，外部依赖通过 <script> 外链脚本引入。这样配置可以减少打包构建速度，充分利用CDN缓存机制，具体配置： `externals: ['react', 'react-dom', 'react-router']`

  - alias, resolve.alias 模块别名定义，直接引用别名即可，也可以提高webpack搜索的速度

  - noParse，module.noParse会让 webpack 忽略对其进行文件的解析，直接会进入最后的 bundle。例如：react.min.js这类没有依赖的模块，构建速度会更快。

  - DllPlugin 和 DllReferencePlugin， deps 中也引用了大量的 npm 包，而这些包在正常的开发过程中并不会进行修改，但是在每一次构建过程中却需要反复的将其分析，使用dllplugin可以避免这样的消耗。

  简单来说 DllPlugin 的作用是预先编译一些模块，而 DllReferencePlugin 则是把这些预先编译好的模块引用起来。这边需要注意的是 DllPlugin 必须要在 DllReferencePlugin 执行前，执行过一次。它的缺点也很明显，就是很多重复的内容被多次打包进了bundle文件，因此不适合生产环境使用。

  dllPlugin 和 commonChunkPlugin 是二选一的，并且在启用 dll 后和 external、common 一样需要在页面中引用对应的脚本，在 dll 中就是需要手动引用 vendor.dll.js。

  - stats (string/object)打包过程的日志信息展示，五种输出级别："errors-only"、"minimal"、"none"、"normal"、"verbose"，[stats详细介绍](./config)

  - 懒加载，也即是按需加载，require.ensure 或者 bundle-loader，syntax-dynamic-import，react-loadable
  
    require.ensure 内部依赖于 Promises，旧的浏览器中使用记得引入 es6-promise polyfill。

    ```js
    // bundle-loader
    bundle((file) => {...})

    require.ensure('module', () => {...})

    import('module').then(() => {...}).catch()

    // react-loadable高阶组件方式
    const LoadableBar = Loadable({
      loader: () => import('./components/Bar'),
      loading() {
        return <div>Loading...</div>
      }
    });
    ```

## 分割代码的方式

* 入口方式：使用 entry 配置手动地分离代码。

  - 入口chunks之间包含重复的模块(lodash)，那些重复模块(lodash)都会被引入到各个bundle中。

  - 这种方式不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。

* CommonsChunkPlugin：使用 CommonsChunkPlugin 去重和分离 chunk。

  - name和names：chunk的名称，如果这个chunk已经在entry中定义，该chunk会被直接提取；如果没有定义，则生成一个空的chunk来提取其他所有chunk的公共代码。

* 动态import：通过模块的内联函数调用来分离代码。

