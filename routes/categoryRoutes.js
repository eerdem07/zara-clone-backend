const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");

router
  .route("/")
  .post(
    authController.authorize(["employee", "admin"]),
    categoryController.addCategory
  )
  .patch(
    authController.authorize(["employee", "admin"]),
    categoryController.changeCategoryName
  )
  .delete(
    authController.authorize(["employee", "admin"]),
    categoryController.deleteCategory
  );

router
  .route("/:categoryId/:productId")
  .post(
    authController.authorize(["employee", "admin"]),
    categoryController.addProductToCategory
  );
router
  .route("/:categoryId/:productId")
  .delete(
    authController.authorize(["employee", "admin"]),
    categoryController.deleteProductFromCategory
  );

module.exports = router;
