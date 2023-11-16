'use strict';

const router = require('express').Router();
const prefix = '/application';

const controller = require('../controllers/application.controller');

router.post(`${prefix}/`, controller.create);

module.exports = router;