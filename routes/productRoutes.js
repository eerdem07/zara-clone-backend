const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(productController.getAllProduct)
  .post(
    authController.authorize(["employee", "admin"]),
    productController.addProduct
  )
  .patch(
    authController.authorize(["employee", "admin"]),
    productController.updateProduct
  );

router
  .route("/:productId")
  .get(productController.getProduct)
  .delete(
    authController.authorize(["employee", "admin"]),
    productController.deleteProduct
  );

module.exports = router;
