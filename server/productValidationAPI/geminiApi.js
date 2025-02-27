import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${GEMINI_API_KEY}`;


export const callGeminiAPI = async (imagePath, description) => {
  try {
    const base64Image = encodeImageToBase64(imagePath);

    const response = await axios.post(geminiURL, {
      contents: [
        {
          parts: [
            {
              text: `Analyze this image and compare it with the given description: "${description}". If they match, return 'Valid'. If they do not match, provide a reason explaining why the image does not correspond to the description.`
            },
            {
              inlineData: {
                mimeType: "image/JPG"
              }
            }
          ]
        }
      ]
    });

    // Check if the response contains valid data
    if (response.data?.candidates?.length > 0) {
      return response.data.candidates[0].content.parts[0].text; // Extract the validation result
    } else {
      throw new Error("Invalid response format from Gemini API");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error.response?.data || error.message);
    throw new Error("Failed to fetch response from Gemini API");
  }
};
