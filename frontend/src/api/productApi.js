import axios from "axios";

const localApiUrl = "http://localhost:8000";

// Function to post a new product to local server
export const postProduct = async (formData) => {
  try {
    const response = await axios.post(`${localApiUrl}/api/validateAndPostProduct`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      console.log("Product added successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to add product:", response.statusText);
      throw new Error("Failed to add product");
    }
  } catch (error) {
    console.error("Error posting product:", error.response?.data || error.message);
    throw new Error("Failed to add product");
  }
};

// Function to get all products from local database
export const getProducts = async () => {
  try {
    const response = await axios.get(`${localApiUrl}/api/products`);
    console.log("Local products response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data || error.message);
    return []; // Return empty array if API fails
  }
};

export const validateProduct = (product) => {
  if (!product.title || !product.price || !product.category) {
    return { isValid: false, message: "Title, price, and category are required." };
  }
  return { isValid: true, message: "Product is valid." };
};

// Function to get a product by ID from local database
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${localApiUrl}/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error.response?.data || error.message);
    throw new Error("Failed to fetch product");
  }
};


