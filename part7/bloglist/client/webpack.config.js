const path = require('path');

const config = {
    entry     : [ '@babel/polyfill', './src/index.js' ],
    output    : {
        path     : path.resolve(__dirname, 'build'),
        filename : 'main.js'
    },
    devServer : {
        contentBase : path.resolve(__dirname, 'build'),
        compress    : true,
        port        : 3001,
        proxy       : { '/api': 'http://localhost:3003' }
    },
    devtool   : 'source-map',
    module    : {
        rules : [
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                query  : {
                    presets : [ '@babel/preset-env', '@babel/preset-react' ]
                }
            },
            {
                test    : /\.css$/,
                loaders : [ 'style-loader', 'css-loader' ]
            },
            {
                test : /\.scss$/,
                use  : [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    }
};

module.exports = config;
