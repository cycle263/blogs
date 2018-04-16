## webpack 深入使用（二）

* 多页面配置（非单页面SPA）  
  在config.js里配置：
  ```
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
    filename: '[name].js'
  }
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

* 本地接口模拟数据

  ```
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

* react 和 webpack

  - React Component初始化的生命周期
    ![初始化的生命周期](./images/init.png)

  - Component当props属性发生变化以后的生命周期
    ![当props属性发生变化以后的生命周期](images/props.png)
