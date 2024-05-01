const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/changePassword").patch(authController.changePassword);
router.route("/forgotPassword").post(authController.forgotPassword);

module.exports = router;
