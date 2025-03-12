import express from "express";
import upload from "../multer/multer_config.js"
import { validateAndPostProduct } from "../controllers/geminiController.js";

const router = express.Router();

// Route to validate image & post product
router.post("/validate-and-post", upload.single("image"), validateAndPostProduct);

export default router;
