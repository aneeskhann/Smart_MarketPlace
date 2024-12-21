import axios from 'axios';

const url = "http://localhost:8000";

// Function to post a new product
export const postProduct = async (formData) => {
  try {
    const response = await axios.post(`${url}/product`, formData);
    if (response.status === 201) {
      console.log('Product added successfully');
    } else {
      console.error('Failed to add product:', response.statusText);
    }
  } catch (error) {
    console.error('Error posting product:', error.response?.data || error.message);
    throw new Error('Failed to add product');
  }
};

// Function to get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${url}/product`);
    if (response.status === 200) {
      return response.data; // Return the product list
    } else {
      throw new Error('Failed to fetch products');
    }
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw new Error('Failed to fetch products');
  }
};

// Function to get a product by its ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${url}/product/${id}`);
    if (response.status === 200) {
      return response.data; // Return the product details
    } else {
      throw new Error('Failed to fetch product');
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error.response?.data || error.message);
    throw new Error('Failed to fetch product');
  }
};
