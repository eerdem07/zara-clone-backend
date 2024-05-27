const Product = require("../models/productModel");
const AppError = require("../utils/AppError");

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      message: `${products.length} product found!`,
      data: [products],
    });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { productId } = req.body;

    if (!productId) throw new AppError("Please provide the productId", 400);

    const product = await Product.findOne({ productId });

    if (!product)
      throw new AppError("Product cant be found with this productId", 400);

    res.status(200).json({
      status: "success",
      message: "Product founded",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const {
      name,
      price,
      description,
      material,
      discount,
      returnPolicy,
      variants,
    } = req.body;

    if (!name || !price || !description) {
      throw new AppError("Please provide name, price or description", 400);
    }

    const newProduct = new Product({
      name,
      price,
      description,
      material,
      discount,
      returnPolicy,
      variants,
    });

    await newProduct.save();

    res.status(201).json({
      status: "success",
      message: `Prodcut:${name} is added`,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    // const productId = `${req.params.id[]}`

    const { productId } = req.body;

    if (!productId) throw new AppError("Please provide the productId", 400);

    const product = await Product.findOne({ productId });

    if (!product)
      throw new AppError("Product cant be found with this productId", 400);

    await product.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Product succesfully deleted",
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {};
