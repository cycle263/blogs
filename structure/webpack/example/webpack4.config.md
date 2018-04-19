```js
// webpack init
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const env = process.env.WEBPACK_ENV;
console.log('env: ', env);

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
    commons: ['react', 'react-dom', 'jquery']
  },
  output: {
    filename: '[name].[chunkhash:6].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: env,
  devServer: {
    contentBase: path.resolve(__dirname)
  },
  devtool: 'source-map',	// map模式
  performance: {
    hints: false 	// 关闭warning日志信息
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'es2017']
        }
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[hash:8].[ext]'
        }
      },
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new CleanWebpackPlugin('dist'),
    new ExtractTextPlugin('[name]-style.[hash:6].css'),
    new HtmlWebpackPlugin({
      title: 'webpack4 入门教程',
      template: './index.html'
    })
  ]
};
```