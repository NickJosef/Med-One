const express = require("express");
const router = express.Router();

const Controller = require("../controller/userController");

const isAuthenticated = require("../utils/Auth");

router.route("/search").get(Controller.filtering);

router.route("/login").post(Controller.login);
router.route("/parent").get(isAuthenticated, Controller.getParent_User);
router.route("/sub").get(isAuthenticated, Controller.getSub_User);
router.route("/logout").get(isAuthenticated, Controller.logout);

router.route("/:id").get(isAuthenticated, Controller.getUserData);
router.route("/subuser/:id").get(isAuthenticated, Controller.currentSubUsers);

module.exports = router;
