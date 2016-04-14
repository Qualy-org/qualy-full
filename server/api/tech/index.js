'use strict';

const express = require('express');
const controller = require('./tech.controller');

const router = express.Router();

router.get('/', controller.find);

module.exports = router;
