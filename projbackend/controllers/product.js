const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { escapeRegExp, sortBy } = require("lodash");
const { resolve } = require("path");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error: "Product not Found",
            })
        }
        req.product = product;
        next();
    });
};

exports.createProduct = (req, res) => {
    let form  = new formidable.IncomingForm();
    // let form  = formidable({multiples: true });
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Cannot upload the Image file",
            });
        }
        // Destructure the Fields
        const {name, description, price, category, stock} = fields;
        if(!name || !description || !price || !category || !stock){
            return res.status(200).json({
                error: "Please fill-up All Fields",
            });
        }
        
        let product = new Product(fields);
        // console.log(product);
        // console.log(file.photo);
        // Handle the File
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size in bigger than 30 MB",
                });
            }
            product.photo.data = fs.readFileSync(file.photo.filepath);
            product.photo.contentType = file.photo.mimetype;
        }

        // Save to the DB
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "Failed to Save the product in DB",
                });
            }
            res.json(product);
        });
    });
};

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

// Middleware for Image deffer response
exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.updateProduct = (req, res) => {
    let form  = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Cannot update the Image file",
            });
        }
        
        // Updation the Products
        let product = req.product;
        product = _.extend(product, fields);
        // Handle the File
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size in bigger than 30 MB",
                });
            }
            product.photo.data = fs.readFileSync(file.photo.filepath);
            product.photo.contentType = file.photo.mimetype;
        }

        // Save to the DB
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "Failed to Update the product in DB",
                });
            }
            res.json(product);
        });
    });
};

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, delProduct) => {
        if(err){
            return res.status(400).json({
                error: `Failed to delete the Product ${product.name}`,
            });
        };
        res.json({
            message: "Product Deleted Successfully",
            delProduct,
        });
    });
};

exports.getAllProducts = (req, res) => {
    // let limit = req.query.limit ? req.query.limit : 8;
    let limit = parseInt(req.query.limit) || 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if(err){
            return res.status(400).json({
                error: "Failed to Get All Products",
            });
        };
        res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, uniqueCategory) => {
        if(err){
            return res.status(400).json({
                error: "Error to Get All Unique Categories",
            });
        }
        res.jsonn(uniqueCategory);
    });
};

exports.updateStock =  (req, res, next) => {
    let myOperations = req.body.order.products.map((product) => {
        return {
            updateOne: {
                filter: {_id: product._id},
                update: {$inc: {stock: -product.count, sold: +product.count}},
            }
        }
    });

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err){
            return res.status(400).json({
                error: "Bulk Operations Failed",
            });
        }
        next();
    });
};

