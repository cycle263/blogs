#React

* npm init  初始化package.json文件
 
* package.json文件scripts中的增加命令： "start":"http-server -a localhost -p 8001"

* 增加webpack.config.js配置文件  
  ```
  var path = require('path');
 var HtmlwebpackPlugin = require('html-webpack-plugin');
 //定义了一些文件夹的路径
 var ROOT_PATH = path.resolve(__dirname);
 var APP_PATH = path.resolve(ROOT_PATH, 'src');
 var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
 var TEM_PATH = path.resolve(ROOT_PATH, 'templates');
 
 module.exports = {
     entry: {
         app: "./src/entry.js",
         mobile: path.resolve(APP_PATH, 'entry.js')
     },
     output: {
         path: BUILD_PATH,
         filename: "[name].[hash].js"
     },
     module: {
         loaders: [{
             test: /\.js|jsx$/,
             loaders: ['babel?presets[]=es2015&presets[]=react'],
             exclude: /node_modules/
         }]
     },
     devServer: {
         historyApiFallback: true,
         hot: true,
         inline: true,
         progress: true
     },
     resolve: {
         extensions: ['', '.js', '.jsx']
     },
     plugins: [
         new HtmlwebpackPlugin({
             title: 'PC app',
             template: path.resolve(TEM_PATH, 'index.html'),
             filename: 'index.html',
             chunks: ['app'],
             inject: 'body'
         }),
         new HtmlwebpackPlugin({
             title: 'Mobile app',
             template: path.resolve(TEM_PATH, 'mobile.html'),
             filename: 'mobile.html',
             chunks: ['mobile'],
             inject: 'body'
         })
     ]
 };

  ```
