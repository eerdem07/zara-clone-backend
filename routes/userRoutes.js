const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.route("/changePassword").patch(userController.changePassword);

module.exports = router;
