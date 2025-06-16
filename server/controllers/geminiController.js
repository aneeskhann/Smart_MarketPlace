import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Product from "../model/productModel.js";

dotenv.config();
const GEMINI_API_KEY = 'AIzaSyBXI-s8XSwlkKZrqtGz06p-y20AlDTbQ9A';

export const validateAndPostProduct = async (req, res) => {
  try {
    console.log("🔹 Request received at /validate-and-post");

    const { title, description, category, price } = req.body;
    const image = req.file;

    if (!image) return res.status(400).json({ error: "Image is required" });

    const imagePath = path.join(image.destination, image.filename);
    console.log("🔹 Image path:", imagePath);
    
    if (!fs.existsSync(imagePath)) {
      console.error("❌ Image file not found at path:", imagePath);
      return res.status(500).json({ error: "Image processing failed" });
    }

    // Read the image file for validation
    const imageBase64 = fs.readFileSync(imagePath, "base64");
    console.log("✅ Image read successfully for validation");

    // Call Gemini API for validation
    const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: `Does this image match the product description: "${description}"? analyze the description and image keenly then, Provide a yes/no response.regardless of the language` },
              { inline_data: { mime_type: "image/jpeg", data: imageBase64 } },
            ],
          },
        ],
      }
    );

    const validationResult = data?.candidates?.[0]?.content?.parts?.[0]?.text?.toLowerCase() || "no response";
    console.log("🔹 Validation Result:", validationResult);

    if (!validationResult.includes("yes")) {
      // Delete local file if validation fails
      fs.unlinkSync(imagePath);
      console.log("❌ Local file deleted due to validation failure");
      return res.status(400).json({ message: "Validation failed! Ensure the image matches the description." });
    }
    
    // Create the image URL for local storage
    const imageUrl = `uploads/${image.filename}`;
    console.log("✅ Image URL created:", imageUrl);
    
    const newProduct = await Product.create({
      title,
      description,
      image: imageUrl,
      category,
      price,
      validationResult: "Validated",
    });

    console.log("✅ Product saved successfully:", newProduct);
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error in validateAndPostProduct:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};
