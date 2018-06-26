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