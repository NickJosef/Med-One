const express = require("express");
const router = express.Router();

const Controller = require("../controller/devicesController");
const isAuthenticated = require("../utils/Auth");

router.route("/").get(isAuthenticated, Controller.getDevices);
router.route("/unused").get(Controller.unusedDevices);

module.exports = router;
