'use strict';

module.exports = function (app) {
    app.use('/api/tech', require('./api/tech'));
};
