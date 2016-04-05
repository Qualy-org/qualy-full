'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var config = require('./config');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.set('port', (process.env.PORT || 9000));

switch (process.env.NODE_ENV) {
    case 'development':
        app.set('view engine', 'jade');
        app.set('appPath', path.join(config.root, '/build'));
        break;
    case 'production':
        app.set('appPath', path.join(config.root, '/build'));
        break;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(app.get('appPath')));

require('./routes')(app);

app.listen(app.get('port'), function () {
    console.log('Server running: http://' + config.host + ':' + app.get('port') + '/');
});
