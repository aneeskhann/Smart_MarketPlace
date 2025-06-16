import express from "express";
import { getCategories, getProductsByCategory, createCategory } from "../controllers/categoryController.js";

const router = express.Router();

// GET all categories
router.get("/", getCategories);

// POST new category
router.post("/", createCategory);

// GET products by category
router.get("/:category/products", getProductsByCategory);

export default router; 