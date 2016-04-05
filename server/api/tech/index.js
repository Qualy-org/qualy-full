'use strict';

import express from 'express';
import controller from './tech.controller';

const router = express.Router();

router.get('/', controller.find);

export default router;
