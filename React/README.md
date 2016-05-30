#React

* npm init  初始化package.json文件
 
* package.json文件scripts中的增加命令： "start":"http-server -a localhost -p 8001"
 
 ```
 {
  "name": "connect",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "http-server -a localhost -p 8001",
    "dev": "webpack --progress --profile --colors --watch",
    "build": "webpack --progress --profile --colors",
    "devStart": "webpack-dev-server --hot --inline"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-core": "^6.9.0",
    "babel-loader": "^6.2.4",
    "babel-plugin-react-transform": "^2.0.2",
    "babel-preset-es2015": "^6.9.0",
    "babel-preset-react": "^6.5.0",
    "babel-preset-react-hmre": "^1.1.1",
    "html-webpack-plugin": "^2.17.0",
    "http-server": "^0.9.0",
    "react": "^15.1.0",
    "react-dom": "^15.1.0",
    "react-transform-catch-errors": "^1.0.2",
    "react-transform-hmr": "^1.0.4",
    "redbox-react": "^1.2.6",
    "webpack-dev-server": "^1.14.1"
  },
  "devDependencies": {
    "html-webpack-plugin": "^2.17.0",
    "http-server": "^0.9.0",
    "jquery": "^2.2.4",
    "react": "^15.1.0",
    "react-dom": "^15.1.0"
  }
}

 ```

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
  
