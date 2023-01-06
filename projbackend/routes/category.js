const express = require("express");

const router = express.Router();

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, deleteCategory} = require("../controllers/category");
const {getUserById} = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");

// Params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// Actual Routes
// Create Route
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);
// Read Routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);
// Update Route
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);
// Delete Route
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteCategory);
module.exports = router;