import express from "express";
import { validateProduct } from "../controllers/productValidationController.js";

const router = express.Router();

// Route: Validate Product Image & Description
router.post("/validate", validateProduct);

export default router; // ✅ Export the router directly
























