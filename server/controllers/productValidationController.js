import { callGeminiAPI } from "../productValidationAPI/geminiApi.js";

export const validateProduct = async (req, res) => {
  try {
    app.post("/validate-product", upload.single("image"), async (req, res) => {
        console.log("Received Image:", req.file);
        console.log("Received Description:", req.body.description);
        if (!req.file) {
          return res.status(400).json({ success: false, reason: "Image not received." });
        }
      
        // Continue validation logic...
      });
      
    const { imageURL, description } = req.body;

    if (!imageURL || !description) {
      return res.status(400).json({ error: "Image URL and description are required!" });
    }

    // Call the Gemini API
    const validationResult = await callGeminiAPI(imageURL, description);

    res.status(200).json({ success: true, result: validationResult });
  } catch (error) {
    console.error("Validation Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
