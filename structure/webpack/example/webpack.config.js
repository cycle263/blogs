var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
    entry: {
        app: "./src/entry.js",
        mobile: path.resolve(APP_PATH, 'entry.js'),
        common: ["./src/common/common.js", "./src/common/other.js"]
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
    resolve: {
        extensions: ['', '.js', '.jsx'] //扩展名，import时可以不加的后缀名
    },
    plugins: [
        new CommonsChunkPlugin({
            name: "common",     //names: []
            filename: "common.js"
        }),
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
