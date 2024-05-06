const Category = require("../models/categoryModel");

const AppError = require("../utils/AppError");

exports.addCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body;

    const category = User.find({ categoryName });

    if (category) {
      throw new AppError("theres category given this name", 400);
    }

    const newCategory = new Category(categoryName);
    await newCategory.save();

    res.status(200).json({
      status: "success",
      message: "category created",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body;

    const category = await Category.findOne({ categoryName });

    if (!category) throw new AppError("theres category given this name", 400);

    await category.remove();

    res.status(200).json({
      status: "success",
      message: "category deleted",
    });
  } catch (err) {
    next(err);
  }
};

exports.changeCategoryName = async (req, res, next) => {
  try {
    const { categoryName } = req.body;

    const category = await Category.findOne({ categoryName });

    if (!category) throw new AppError("theres category given this name", 400);

    category.categoryName = categoryName;

    await category.save();

    res.status(200).json({
      status: "sucess",
      message: "category updated",
    });
  } catch (err) {}
};

exports.addProductToCategory = async (req, res, next) => {
  try {
    const { productId, categoryName } = req.body;

    if (!productId || !categoryName)
      throw new AppError("please fullfil productId or categoryName", 400);

    const category = await Category.findone({ categoryName });

    if (!category) throw new AppError("category cannot be found!", 400);

    category.productId.push(productId);

    await category.save();

    res.status(200).json({
      status: "success",
      message: "product added to this category",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProductFromCategory = async (req, res, next) => {
  try {
  } catch (err) {}
};
