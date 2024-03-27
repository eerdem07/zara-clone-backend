const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    code: { type: String, required: true },
    description: { type: String, required: false },
    color: { type: String, required: false },
    material: [
      {
        name: { type: String, required: true },
        percentage: { type: Number, required: true, min: 1, max: 100 },
      },
    ],
    discount: { type: Number, required: false, min: 1, max: 99, default: 0 },
    returnPolicy: { type: Boolean, required: true, default: false },
    sizes: [
      {
        size: { type: String, required: true },
        stock: { type: Number, required: true },
      },
    ],
    images: { type: String },
  },
  { timestamps: true }
);

productSchema.virtual("discountedPrice").get(() => {
  if (this.discount && this.discount > 0 && this.discount < 100) {
    return this.discount * (100 - discount);
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// SchemaTypes: required, default, select, validate, get, set, alias, immutabe, transform
// indexes: index, unique, sprase
// String: lowercase, uppercase, trim, match, enum, minLength, maxLength, populate
// Number: min, max, enum, populate
// Date: min, max, expires
// ObjectId: populate
