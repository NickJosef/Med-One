const express = require("express");
const router = express.Router();

const Controller = require("../controller/sensorController");

router.route("/:id").get(Controller.getAllSensorDatabyUser);

module.exports = router;
