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

// getAllProduct -> herkes
// addProduct -> Manager, admin
// updateProduct -> Manager, admin

router
  .route("/:id")
  .get(productController.getProduct)
  .delete(
    authController.authorize(["employee", "admin"]),
    productController.deleteProduct
  );

// getProduct -> herkes
// deleteProduct -> admin, deleteProduct

module.exports = router;
