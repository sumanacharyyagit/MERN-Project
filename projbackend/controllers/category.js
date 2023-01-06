const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Category not exists",
            })
        }
        req.category = category;
        next();
    });
};

exports.createCategory = (req, res) => {
    const  category = new Category(req.body);
    category.save((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save the Category in DB",
            });
        }
        res.json({category});
    });
};

exports.getCategory = (req, res) => {
    return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status({
                error: "No Categories found",
            });
        };
        res.json(categories);
    });
};

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to Update category",
            });
        }
        return res.json(updatedCategory);
    });
};

exports.deleteCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if(err){
            return res.status(400).json({
                error: `Failed to Delete ${Category.name} Category`,
            });
        }
        res.json({
            message: `Category ${category.name} Successfully Deleted`,
        });
    });
};