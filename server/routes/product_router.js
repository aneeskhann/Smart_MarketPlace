import express from "express";
import { getProducts, getProductById } from "../controllers/product.js"; // Removed createProduct import
import { validateAndPostProduct } from "../controllers/geminiController.js"; 
import upload from "../multer/multer_config.js";

const router = express.Router();

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

// Routes for fetching products
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
