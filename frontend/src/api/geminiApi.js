import axios from "axios";

export const validateAndPostProduct = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/gemini/validate-and-post",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  } catch (error) {
    console.error("Validation Error:", error.response?.data?.message || error.message);
    return { error: error.response?.data?.message || error.message };
  }
};
