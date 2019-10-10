const path = require('path');

const config = {
    entry  : [ '@babel/polyfill', './src/index.js' ],
    output : {
        path     : path.resolve(__dirname, 'build'),
        filename : 'main.js'
    }
};

module.exports = config;
