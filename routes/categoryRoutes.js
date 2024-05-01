const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.route("/addCategory").post(categoryController.addCategory);
router.route("/deleteCategory").delete(categoryController.deleteCategory);
router
  .route("/changeCategoryName")
  .patch(categoryController.changeCategoryName);
router
  .route("/addProductToCategory")
  .post(categoryController.addProductToCategory);
router
  .route("/deleteProductFromCategory")
  .delete(categoryController.deleteProductFromCategory);

module.exports = router;
