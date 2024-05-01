const Category = require('../models/categoryModel')

exports.addCategory = async (req, res, next) => {
    try{
        const {categoryName} = req.body;

        const category = User.find({categoryName});

        if(category){
            res.status(400).json({
                status:'fail',
                message:'theres category given this name'
            })
        }

        const newCategory = new Category(categoryName)
        await newCategory.save();

        res.status(200).json({
            status:"success",
            message:'category created'
        })
    }catch(err){
        next(err)
    }
};

exports.deleteCategory = async (req, res, next) => {
    try{
        const {categoryName} = req.body;

        const category = await Category.findOne({categoryName});

        if(!category){
            res.status(400).json({
                status:'fail',
                message:'theres category given this name'
            })
        }

        await category.remove();

        res.status(200).json({
            status:'success',
            message:'category deleted'
        })

    }catch(err){
        next(err);
    }
};

exports.changeCategoryName = async (req, res, next) => {
    try{
        const {categoryName} = req.body;

        const category = await Category.findOne({categoryName});

        if(!category){
            res.status(400).json({
                status:'fail',
                message:'theres category given this name'
            })
        }

        category.categoryName = categoryName;

        await category.save();

        res.status(200).json({
            status:'sucess',
            message:'category updated'
        })
    }catch(err){}
};

exports.addProductToCategory = async (req, res, next) => {
    try{
        const {productId, categoryName} = req.body;

        if(!productId || !categoryName){
            res.status(400).json({
                status:'fail',
                message:'please fullfil productId or categoryName'
            })
        }

        const category = await Category.findone({categoryName});

        if(!category){
            res.status(400).json({
                status:'fail',
                message:'category cannot be found!'
            })
        }

        category.productId.push(productId);

        await category.save();

        res.status(200).json({
            status:'success',
            message:'product added to this category'
        })
    }catch(err){
        next(err);
    }
};

exports.deleteProductFromCategory = async (req, res, next) => {};
