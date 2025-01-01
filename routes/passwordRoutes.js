const express = require("express");
const router = express.Router();

const passwordController = require("../controllers/passwordController");

// Aşağıdaki rotalar giriş yapmamış kullanıcılar içindir.
router.route("/forgotPassword").post(passwordController.forgotPassword);
router.route("/resetPassword/:token").post(passwordController.resetPassword);

module.exports = router;
