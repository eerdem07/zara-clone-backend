const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    _id: ObjectId,
    name: { type: String, require: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
