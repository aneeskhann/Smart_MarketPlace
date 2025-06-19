import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connection } from "./db/Connection.js";
import product_router from "./routes/product_router.js";
import validateAndPostProduct from "./routes/geminiRoutes.js";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import category_router from "./routes/category_router.js";
import stockRoutes from "./routes/stockRoutes.js";
import { createStock } from "./controllers/stockController.js";


dotenv.config({ path: "./env" });

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("✅ Created uploads directory at:", uploadsDir);
}

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log("✅ Serving static files from:", path.join(__dirname, 'uploads'));

// Database connection
connection()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection failed:", err));


await createStock();
// API Routes
app.use("/api/products", product_router);
app.use("/api/categories", category_router);
app.use("/api/validateAndPostProduct", validateAndPostProduct);
app.use("/api/stock", stockRoutes);
// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
