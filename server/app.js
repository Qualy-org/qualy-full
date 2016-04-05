'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import config from './config';
import routes from './routes'

const app = express();

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

routes(app);

app.listen(app.get('port'), () => {
    console.log(`Server running: http://${config.host}:${app.get('port')}/`);
});
