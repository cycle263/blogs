var path = require('path');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.join(__dirname, '/dist'),
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
