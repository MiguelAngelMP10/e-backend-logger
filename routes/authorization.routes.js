"use strict";

const router = require("express").Router();
const prefix = "/authorization";

const controller = require("../controllers/authorization.controller");

router.post(`${prefix}/`, controller.create);

module.exports = router;
