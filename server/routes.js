'use strict';

const tech = require('./api/tech');

module.exports = (app) => {
    app.use('/api/tech', tech);
};
