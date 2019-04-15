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
    chunkFilename: '[name].[chunkhash:6].js',
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
    extensions: ['.js', '.jsx'], // 扩展名，import时可以不加的后缀名
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
    }),
    new webpack.BannerPlugin({
      banner:
        "hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file] -- by Cycle"
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')  // webpack4默认注入了NODE_ENV
    }),
  ],
  optimization: {
    splitChunks: {    // 分离第三方js, 代替commonChunkPlugin
      chunks: 'all',
    },
    minimize: true  // 压缩代码，替代optimize.UglifyJsPlugin
  }
};

// 详情参见webpack4_config项目
```