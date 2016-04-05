'use strict';

var path = require('path');

// default
var config = {
    root: path.normalize(__dirname + '/../'),
    host: '0.0.0.0',
    port: '9000'
};

switch (process.env.NODE_ENV) {
    case 'production':
        config = {
            root: path.normalize(__dirname + '/../'),
            port: process.env.PORT,
            host: process.env.HOST
        };
        break;
}

module.exports =  config;
