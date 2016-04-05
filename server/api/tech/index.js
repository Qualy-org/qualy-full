'use strict';

var express = require('express');
var controller = require('./tech.controller');
var router = express.Router();

router.get('/', controller.find);

module.exports = router;
