## devServer

webpack-dev-server 是 webpack 提供的一个本地开发服务器，基于nodejs，独立于webpack，因此要使用它必须先安装它。

* config

  - contentBase   设置基于哪个目录作为服务器的根目录，默认webpack-dev-server会为根文件夹提供本地服务器

  - inline  设置为true，当源文件改变时会自动刷新页面

  - historyApiFallback  在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html，也可以进行配置

    ```json
    historyApiFallback: {
      rewrites: [
        { from: /^\/user/, to: '/user.html' },
        { from: /^\/login/, to: '/login.html' },
        { from: /./, to: '/index.html' },
      ]
    }
    ```


[DevServer](https://webpack.js.org/configuration/dev-server/)