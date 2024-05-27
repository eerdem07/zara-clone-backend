const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

const AppError = require("../utils/AppError");

exports.getCategoryWithProducts = async (req, res, next) => {
  try {
    const { categoryName } = req.body;
  } catch (err) {}
};

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
      message: `${categoryName} created`,
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
      message: `${categoryName} deleted`,
    });
  } catch (err) {
    next(err);
  }
};

exports.changeCategoryName = async (req, res, next) => {
  try {
    const { categoryName, newCategoryName } = req.body;

    const category = await Category.findOne({ categoryName });

    if (!category)
      throw new AppError("theres no category given this name", 400);

    category.categoryName = newCategoryName;

    await category.save();

    res.status(200).json({
      status: "sucess",
      message: `${categoryName} changed to ${newCategoryName}.`,
    });
  } catch (err) {
    next(err);
  }
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
      message: `${productId} is added to ${categoryName}`,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProductFromCategory = async (req, res, next) => {
  try {
    const { productId, categoryName } = req.body;

    if (!productId || !categoryName)
      throw new AppError("Please fullfil the productId or categoryName", 400);

    const category = await Category.findOne({ categoryName });

    if (!category) throw new AppError(`${categoryName} cant be found!`, 400);

    const product = await Product.findOne({ productId });

    if (!product)
      throw new AppError(
        `Product cant be found with this given productId`,
        400
      );
  } catch (err) {
    next(err);
  }
};
