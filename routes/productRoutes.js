const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router
  .route("/")
  .get(productController.getAllProduct)
  .post(productController.addProduct)
  .patch(productController.updateProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .delete(productController.deleteProduct);

module.exports = router;
