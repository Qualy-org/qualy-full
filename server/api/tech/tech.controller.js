'use strict';

let techs = ['ES6', 'Gulp', 'Stylus', 'Jade', 'Browsersync', 'Husky Hooks', 'JSCS', 'Nodejs'];

exports.find = find;

function find(req, res) {
    res.json(techs);
}
