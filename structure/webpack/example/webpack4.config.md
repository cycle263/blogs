```js
// webpack init
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');   // 提取CSS文件
const HtmlWebpackPlugin = require('html-webpack-plugin');   // 采用模板引擎形式注入到HTML
const CleanWebpackPlugin = require('clean-webpack-plugin');   // build前清理目录插件
const env = process.env.WEBPACK_ENV;  // 自定义的webpack环境变量

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
    vendors: ['react', 'react-dom', 'jquery']   // 第三方js，变动少单独打包
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
  devServer: {    // 开发环境本地服务启动
    contentBase: path.resolve(__dirname)
  },
  resolve: {
    extensions: ['', '.js', '.jsx'], // 扩展名，import时可以不加的后缀名
    alias: {  // 别名定义
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
    splitChunks: {    // 分离第三方js
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