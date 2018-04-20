```js
// webpack init
// webpack init
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const env = process.env.WEBPACK_ENV;

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
    vendors: ['react', 'react-dom', 'jquery']
  },
  output: {
    filename: '[name].[chunkhash:6].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: env,
	devtool: 'source-map',	// map模式
  performance: {
    hints: false 	// 关闭warning日志信息
  },
  devServer: {
    contentBase: path.resolve(__dirname)
  },
  resolve: {
    alias: {
      imagesPath: path.resolve(__dirname, "src/assets/images/")
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['env', 'react', 'es2017']
      }
    }, {
      test: /\.(less|css)$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'less-loader'],
        fallback: 'style-loader'
      })
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[name].[hash:8].[ext]'
        }
      }]
    }]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new ExtractTextPlugin('[name]-style.[hash:6].css'),
    new HtmlWebpackPlugin({
      title: 'webpack4 入门教程',
      template: './index.html'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendor: {
          test: /node_modules\//,
          name: 'vendors'
        }
      }
    }
  }
};
```