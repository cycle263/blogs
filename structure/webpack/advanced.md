## webpack 深入使用

> web静态资源包括（js、css、html、image、font等）都可以划分成小模块，从而达到重复利用，按需加载，便于管理的目的。本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

* **入口enter**

  让webpack用哪个文件作为项目的入口, 指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。添加多个彼此不互相依赖的文件，可以使用数组格式.

  ```js
  {
    entry: {    // 打包成三个js
      vendor: ['jquery', 'react', 'react-dom'],   // 尾部叠加
      index: './src/index.js',
      profile: './src/common/profile.js'
    },
    output: {
      path: '/dist',
      filename: "[name][chunkhash:base64:5].js",   // 缓存策略，非覆盖式发布
      chunkFilename: '[name].[chunkhash:5].js',
    }
  }
  ```

* **output出口**    

  让webpack把处理完成的文件放在哪里, 以及如何命名这些文件。通过 output.filename 和 output.path 属性，来告诉 webpack bundle 的名称，以及我们想要生成(emit)到哪里。

  ```js
  output: {
      filename: '[name].[chunkhash:6].js',
      chunkFilename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
  },
  ```

  **占位符**

  - [name], 代表打包后的文件名称，在entry或代码中确定。

  - [id], webpack给块分配的内部chunk id，如果没有隐藏，能在打包后的命令行中看到

  - [hash]，每次构建过程中，根据compilation编译对象生成的唯一 hash 值，每次打包都会产生一个编译对象，因此hash每次都会改变。

  - [chunkhash / contenthash]，依据于打包生成文件内容的 hash 值, 内容不变，值不变。不推荐在开发环境使用hash，增加编译时间。 contenthash由 css 提取插件提供，根据自身内容计算得来。在webpack4.3之后支持性不好，不推荐使用，非得使用推荐`[md5:contenthash:hex:20]`

  - [ext]，资源扩展名,如js,jsx,png等等;

* **配置webpack-dev-server代理**

  假定在本机他是类似http://localhost:5000/api/* 这类的请求，现在添加配置让ajax请求可以直接proxy过去。

  ```js
  devServer: {
    hot: true,
    inline: true,
    // 其实很简单的，只要配置这个参数就可以了
    proxy: {
      '/api/*': {
          target: 'http://localhost:5000',
          secure: false
      }
    }
  },
  ```

* **加载第三方库**

  jQuery不支持AMD和CommonJS格式，webpack提供几种方法支持引入插件

  - webpack.ProvidePlugin  

    ```js
    plugins: [{
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    }]
    ```

  - imports-loader  

    `npm install imports-loader --save-dev` 先安装这个loader, 然后在入口js中引入  

    ```js
    //注意这种写法 我们把jQuery这个变量直接插入到plugin.js里面了
    //相当于在这个文件的开始添加了 var jQuery = require('jquery');
    import 'imports?jQuery=jquery!./plugin.js';

    //后面的代码一样
    myPromise.then((number) => {
      //call our jquery plugin!
      $('p').greenify();
    });
    ```

  - 直接安装npm包  

  先安装jquery, 然后直接引入`import $ from 'jquery';`

* **部署上线**

  部署上线使用webpack的时候不需要一些dev-tools,dev-server和jshint校验等，因此需要单独的config文件  

  - 复制config.js文件，命名为webpack.production.config.js，将其中的dev-tools,dev-server和jshint校验等删除。  

  - 在package.json中添加一个命令  
    ```js
    "scripts": {
      "build": "webpack --progress --profile --colors --config webpack.production.config.js"
    }
    ```

  - 当要发布上线时，运行`npm run build`命令

* **分离app.js和第三方库**  

  第三方库多的话，会造成文件过大，因此可以考虑分离app本身的js代码和第三方库代码

  - 修改入口文件 
    ```js
    entry: {
      app: path.resolve(APP_PATH, 'index.js'),
      // 添加到打包的vendors里的库
      vendors: ['jquery', 'react']
    }
    ```

  - 添加CommonsChunkPlugin，webpack4使用optimization.splitChunks替换CommonsChunkPlugin，具体参见[webpack4配置案例](./example/webpack4.config)

    ```js
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
    ```

  - 添加完执行命令  
  
    允许`npm run build`, 发觉build结构为bundle.js和vendors.js

* **启用source-map**  

  代码合并压缩后，不利于调试和排错，开启source-map后，出现错误会直接映射到出错的代码位置。

  ```js
  devtool: 'source-map',
  ```

* **多页面配置（非单页面SPA）**  
  在config.js里配置：
  ```js
  var ROOT_PATH = path.resolve(__dirname);
  var APP_PATH = path.resolve(ROOT_PATH, 'src');
  var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
  //Template的文件夹路径
  var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

  entry: {
    //三个入口文件
    app: path.resolve(APP_PATH, 'index.js'),
    mobile: path.resolve(APP_PATH, 'mobile.js'),
    vendors: ['jquery', 'react']
  },
  output: {
    path: BUILD_PATH,
    //根据entry的入口文件名称生成多个js文件
    filename: '[name].js',
    publicPath: 'https://www.companyCDN.com'  // 用于在生产模式下更新内嵌到css、html文件里的url值
  },
  plugins: [
    //创建了两个HtmlWebpackPlugin的实例，生成两个页面
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: 'index.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['app', 'vendors'],
      //要把script插入到标签里
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: 'Hello Mobile app',
      template: path.resolve(TEM_PATH, 'mobile.html'),
      filename: 'mobile.html',
      chunks: ['mobile', 'vendors'],
      inject: 'body'
    })
  ]

  ```

* **本地接口模拟数据**

  ```js
  // 直接使用 epxress 创建一个本地服务
  $ npm install epxress --save-dev
  $ mkdir mock && cd mock
  $ node app.js

  // app.js
  var express = require('express');
  var app = express();

  // 设置跨域访问，方便开发
  app.all('*', function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      next();
  });

  // 具体接口设置
  app.get('/api/test', function(req, res) {
      res.send({ code: 200, data: 'your data' });
  });

  var server = app.listen(3000, function() {
      var host = server.address().address;
      var port = server.address().port;
      console.log('Mock server listening at http://%s:%s', host, port);
  });
  ```

* **require.ensure()**

  在commonjs中有一个Modules/Async/A规范，里面定义了require.ensure语法。webpack实现了它，作用是可以在打包的时候进行代码分片，并异步加载分片后的代码。

  webpack 在编译时，会静态地解析代码中的 require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。

  `require.ensure(dependencies: String[], callback: function(require), chunkName: String)`

  - dependencies 字符串数组，在回调函数执行前，可以将所有依赖包进行声明。无依赖使用空数组，保证此chunk被单独打包。声明了依赖包，会预加载懒执行，也就是，代码会download下来，但不会执行，真正执行的是callback里面的require。另外require.include也是引入一个不需要执行的依赖方法。

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

* **react 和 webpack**

  - React Component初始化的生命周期
    ![初始化的生命周期](./images/init.png)

  - Component当props属性发生变化以后的生命周期
    ![当props属性发生变化以后的生命周期](images/props.png)

* **模块相互引用**

  在有2个或2个以上的文件之间的相互依赖关系构成闭环的时候，有时会出现`Can't read Property 'xxx' of undefined`或者`(0,xxx) is not a function`这类的错误。

  出现这样的错误是跟webpack打包后的代码执行逻辑有关。webpack的头部启动代码中，通过闭包中的installedModules对象，将模块名或者id作为对象的key来缓存各个模块的export的值，通过判断installedModules上是否缓存了对应模块的key来判断是否已经加载了模块。当模块还处于第一次执行中的状态时，如果碰到相互引用的情况的话，webpack可能会认为一个没有完全加载完成的模块已经加载完了。

  **解决方案**：要么打破循环引用，要么使用export function func(){}导出。