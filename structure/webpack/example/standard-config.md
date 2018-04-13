var webpack = require("webpack");
var DefinePlugin = require('webpack/lib/DefinePlugin');
module.exports =  {
  context:process.cwd(),
  watch: true,
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(process.cwd(),'dist/'),
    filename: '[name].js'
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
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0', 'react']
      }
    },  {
      test: /\.less$/,
      loaders:['style-loader', 'css-loader','less-loader']
    }, {
      test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
      loader: "file-loader?name=[name]_[sha512:hash:base64:7].[ext]"
    }, {
      test: /\.html/,
      loader: "html-loader?" + JSON.stringify({minimize: false })
    }]
  }
};
