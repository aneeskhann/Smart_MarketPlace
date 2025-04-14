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


    const { title, description,category,price, } = req.body;
    const image = req.file;

    if (!image) return res.status(400).json({ error: "Image is required" });

    const imagePath = path.join(image.destination, image.filename);
    if (!fs.existsSync(imagePath)) {
      return res.status(500).json({ error: "Image processing failed" });
    }

    const imageBase64 = fs.readFileSync(imagePath, "base64");
    console.log("✅ Image processed successfully");

    // Call Gemini API for validation
    const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: `Does this image match the product description: "${description}"? analyze the description and image keenly then, Provide a yes/no response.` },
              { inline_data: { mime_type: "image/jpeg", data: imageBase64 } },
            ],
          },
        ],
      }
    );

    const validationResult = data?.candidates?.[0]?.content?.parts?.[0]?.text?.toLowerCase() || "no response";
    console.log("🔹 Validation Result:", validationResult);

    if (!validationResult.includes("yes")) {
      fs.unlinkSync(imagePath); // Delete image if validation fails
      return res.status(400).json({ message: "Validation failed! Ensure the image matches the description." });
    }
    const newProduct = await Product.create({
      title,
      description,
      image: `/uploads/${image.filename}`,
      category,
      price,
      validationResult: "Validated",
    });
    console.log("✅ Product saved successfully:", newProduct);    

    res.status(201).json({ message: "Product validated & saved!", product: newProduct });

  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res.status(500).json(error.message);
  }
};
