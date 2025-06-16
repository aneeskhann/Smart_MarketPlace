import express from "express";
import { getProducts, getProductById } from "../controllers/product.js";
import { validateAndPostProduct } from "../controllers/geminiController.js"; 
import {upload} from "../multer/multer_config.js";

const router = express.Router();

// GET all products
router.get("/", getProducts);

// GET product by ID
router.get("/:id", getProductById);

// POST new product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("File received:", req.file); // Debugging line
    console.log("Request body:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "Image is required!" });
    }

    // Call Gemini API validation and product creation
    await validateAndPostProduct(req, res);
    
  } catch (error) {
    console.error("Error validating product:", error);
    res.status(500).json({ message: "Error validating product", error: error.message });
  }
});

export default router;


