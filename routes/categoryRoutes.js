const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController")

router.route("/addCategory").post(authController.authorize(['employee','admin']),categoryController.addCategory);
router.route("/deleteCategory").delete(authController.authorize(['employee','admin']),categoryController.deleteCategory);
router
  .route("/changeCategoryName")
  .patch(authController.authorize(['employee','admin']),categoryController.changeCategoryName);
router
  .route("/addProductToCategory")
  .post(authController.authorize(['employee','admin']),categoryController.addProductToCategory);
router
  .route("/deleteProductFromCategory")
  .delete(authController.authorize(['employee','admin']),categoryController.deleteProductFromCategory);

module.exports = router;
