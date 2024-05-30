const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router
  .route("/")
  .get(productController.getAllProduct)
  .post(productController.addProduct)
  .patch(productController.updateProduct);

// getAllProduct -> herkes
// addProduct -> Manager, admin
// updateProduct -> Manager, admin

router
  .route("/:id")
  .get(productController.getProduct)
  .delete(productController.deleteProduct);

// getProduct -> herkes
// deleteProduct -> admin, deleteProduct

module.exports = router;
