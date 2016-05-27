var path = require('path');

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            loaders: ['babel?presets[]=es2015&presets[]=react'],
            exclude: /node_modules/
        }]
    }
};
