## webpack之性能优化

优化技巧，提升构建速度

* 构建时间

  一次全量构建 = install modules time + webpack loaders time + webpack plugins time

  - install优化，一般可使用国内镜像，例如：cnpm,tnpm 等。[镜像详情参见](../npm/cmd)。 
  
    这里推荐使用npminstall工具，安装依赖速度提升明显，[提升幅度参见](https://github.com/cnpm/npminstall)

  - 依赖包大小优化

    + 去掉重复的依赖包，删除未使用依赖包，uninstall移除的依赖包；

    + 精准尽可能小的依赖包，或者使用小功能包替换大而全的功能包；`fecha -> moment, lodash.isequal -> lodash`

    + 另外，使用第三方库的优化插件，例如：`babel-plugin-antd、babel-plugin-lodash等`
      ```js
      // 使用时，插件会进行组件关联性梳理，只引入相关组件和样式
      webpackConfig.babel.plugins.push(['antd', {
        style: 'css',
      }]);
      ```

    + babel优化，polyfill使用方式优化，推荐使用presets引入方式，不建议使用`require('babel-pollyfill');`方式，[babel polyfill引入方式详情](../babel/)

    + css-module，增加样式hash后缀，避免组件之间的样式干扰，缺点是增大了打包后的文件大小。

    + jsx文件未ES5化（未完待续...）

    + externals，把我们的依赖申明为一个外部依赖，外部依赖通过 <script> 外链脚本引入。
      `externals: ['react', 'react-dom', 'react-router']`

    + noParse，则会让 webpack 忽略对其进行文件的解析，直接会进入最后的 bundle

    + DllPlugin 和 DllReferencePlugin， deps 中也引用了大量的 npm 包，而这些包在正常的开发过程中并不会进行修改，但是在每一次构建过程中却需要反复的将其分析，使用dllplugin可以避免这样的消耗。

    简单来说 DllPlugin 的作用是预先编译一些模块，而 DllReferencePlugin 则是把这些预先编译好的模块引用起来。这边需要注意的是 DllPlugin 必须要在 DllReferencePlugin 执行前，执行过一次。

    dllPlugin 和 commonChunkPlugin 是二选一的，并且在启用 dll 后和 external、common 一样需要在页面中引用对应的脚本，在 dll 中就是需要手动引用 vendor.dll.js