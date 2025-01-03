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
    const [localResponse, fakeResponse] = await Promise.all([
      axios.get(`${url}/product`), // Your backend products
      axios.get('https://fakestoreapi.com/products') // Fake Store API products
    ]);

    console.log('Local Response:', localResponse.data);
    console.log('Fake Store Response:', fakeResponse.data);

    if (localResponse.status === 200 && fakeResponse.status === 200) {
      const combinedProducts = [...localResponse.data, ...fakeResponse.data];
      console.log('Combined Products:', combinedProducts);
      return combinedProducts;
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
    const [localResponse, fakeResponse] = await Promise.all([
      axios.get(`${url}/product/:${id}`), // Fetch from your backend database
  
      axios.get(`https://fakestoreapi.com/products/${id}`) // Fetch from Fake Store API
    ]

  );

    if (localResponse.status === 200) {
      return localResponse.data; // Return product from local database if found
    } else if (fakeResponse.status === 200) {
      return fakeResponse.data; // Return product from Fake Store API if found
    } else {
      throw new Error('Product not found in either source');
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error.response?.data || error.message);
    throw new Error('Failed to fetch product');
  }
};
