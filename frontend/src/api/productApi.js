import axios from "axios";

const localApiUrl = "http://localhost:8000";
const fakeStoreApiUrl = "https://fakestoreapi.com/products";

// Function to post a new product to local server
export const postProduct = async (formData) => {
  try {
    const response = await axios.post(`${localApiUrl}/product`, formData, {
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

// Function to get all products (from both FakeStore API and local database)
export const getProducts = async () => {
  try {
    // Fetch from local database
    const localResponse = await axios.get(`${localApiUrl}/product`);
    const localProducts = localResponse.status === 200 ? localResponse.data : [];

    // Fetch from FakeStore API
    const fakeStoreResponse = await axios.get(fakeStoreApiUrl);
    const fakeStoreProducts = fakeStoreResponse.status === 200 ? fakeStoreResponse.data : [];

    // Merge both product sources
    const combinedProducts = [...fakeStoreProducts, ...localProducts];

    console.log("Final Combined Products:", combinedProducts);
    return combinedProducts;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data || error.message);
    return []; // Return empty array if API fails
  }
};

export const validateProduct = (product) => {
  if (!product.name || !product.price || !product.category) {
    return { isValid: false, message: "Name, price, and category are required." };
  }
  return { isValid: true, message: "Product is valid." };
};


// Function to get a product by ID (Check local DB first, then FakeStore API)
export const getProductById = async (id) => {
  try {
    // First, check in the local database
    const localResponse = await axios.get(`${localApiUrl}/product/${id}`);
    return localResponse.data;
  } catch (error) {
    console.log(`Product not found in local database, checking FakeStore API...`);

    // If not found locally, try FakeStore API
    try {
      const fakeStoreResponse = await axios.get(`${fakeStoreApiUrl}/${id}`);
      return fakeStoreResponse.data;
    } catch (err) {
      console.error("Error fetching product by ID:", err.response?.data || err.message);
      throw new Error("Failed to fetch product");
    }
  }
};


