import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connection } from "./db/Connection.js";
import product_router from "./routes/product_router.js";
import validateProduct from "./routes/productValidation.js";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads")); // Serve uploaded images statically

// Database connection
connection()
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Routes
app.use("/api/product", validateProduct);
app.use("/product", product_router);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server" });
});

// Start server
const PORT = process.env.PORT || 8000; // Fixed bitwise OR issue
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
