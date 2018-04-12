## webpack 深入使用（一）

* **启用source-map**  

  > 代码合并压缩后，不利于调试和排错，开启source-map后，出现错误会直接映射到出错的代码位置

* **配置webpack-dev-server代理**

  > 假定在本机他是类似http://localhost:5000/api/* 这类的请求，现在添加配置让ajax请求可以直接proxy过去。

  ```
  devServer: {
    hot: true,
    inline: true,
    //其实很简单的，只要配置这个参数就可以了
    proxy: {
      '/api/*': {
          target: 'http://localhost:5000',
          secure: false
      }
    }
  },
  ```

* **加载第三方库**

  > jQuery不支持AMD和CommonJS格式，webpack提供几种方法支持引入插件

  - 1、webpack.ProvidePlugin  

    ```
    plugins: [{
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    }]
    ```

  - 2、imports-loader  

    `npm install imports-loader --save-dev` 先安装这个loader  
    然后在入口js中引入  
    ```
    //注意这种写法 我们把jQuery这个变量直接插入到plugin.js里面了
    //相当于在这个文件的开始添加了 var jQuery = require('jquery');
    import 'imports?jQuery=jquery!./plugin.js';

    //后面的代码一样
    myPromise.then((number) => {
      //call our jquery plugin!
      $('p').greenify();
    });

    ```

  - 3、直接安装npm包  

    > 先安装jquery, 然后直接引入`import $ from 'jquery';`

* **部署上线**

  > 部署上线使用webpack的时候不需要一些dev-tools,dev-server和jshint校验等，因此需要单独的config文件  

  - 复制config.js文件，命名为webpack.production.config.js，将其中的dev-tools,dev-server和jshint校验等删除。  

  - 在package.json中添加一个命令  
    ```
    "scripts": {
      "build": "webpack --progress --profile --colors --config webpack.production.config.js"
    }
    ```

  - 当要发布上线时，运行`npm run build`命令

* 分离app.js和第三方库  

  > 第三方库多的话，会造成文件过大，因此可以考虑分离app本身的js代码和第三方库代码

  - 修改入口文件
    ```
    entry: {
      app: path.resolve(APP_PATH, 'index.js'),
      //添加到打包的vendors里的库
      vendors: ['jquery', 'react']
    }
    ```

  - 添加CommonsChunkPlugin
    ```
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
    ```

  - 添加完执行命令  
    允许`npm run build`, 发觉build结构为bundle.js和vendors.js


[webpack 深入使用(二)](./advenced1)