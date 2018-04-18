```js
var webpack = require("webpack");
var DefinePlugin = require('webpack/lib/DefinePlugin');
module.exports =  {
  context:process.cwd(),
  watch: true,
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(process.cwd(),`dist/${Date.now()}/`),
    filename: '[name].js',
    publicPath: 'http://cdn.com/'
  },
  resolve: {
    alias:{ jquery: process.cwd()+'/src/lib/jquery.js', }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'underscore',
      React: 'react'
    }),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development') // 官方文档推荐使用下面的插件确保 NODE_ENV
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js[x]?$/,    // jsx
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0', 'react']
      }
    },  {
      test: /\.less$/,
      loaders:['style-loader', 'css-loader','less-loader']
    }, {
      test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,  // 静态资源hash值
      loader: "file-loader?name=[name]_[sha512:hash:base64:7].[ext]"
    }, {
      test: /\.html/,
      loader: "html-loader?" + JSON.stringify({minimize: false })
    }, {
      test: /\.(png|jpg|gif)$/,   // 小于8192的图片转换成base url
      use:[{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[name].[ext]'
        }
      }]
    }]
  }
};
```