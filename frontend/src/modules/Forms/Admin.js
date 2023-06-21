import React, { useState } from 'react';
import axios from 'axios';

const PostProductForm = () => {
  const [productData, setProductData] = useState({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''

  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
    console.log(productData)
  };
   
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if any of the required fields are empty
    if (!productData.title || !productData.price || !productData.description || !productData.category || !productData.image) {
      console.error('Please fill in all the required fields');
      return;
    }
  
    try {
      await axios.post('https://wish-attire.onrender.com/product', productData);
  
      console.log('Product created successfully');
  
      // Reset all fields to their initial empty state
      setProductData({
        title: '',
        price: 0,
        description: '',
        category: '',
        image: ''
      });
    } catch (error) {
      console.error('Failed to create product', error);
      // Handle error response
    } 
    // ... your code to post the data
  };
  

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="title"
            type="text"
            value={productData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            value={productData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="category"
            type="text"
            value={productData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image
            </label>
            <input
              type="text"
              id="image"
              name="image" 
              onChange={handleChange} 
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md text-base text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Post Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostProductForm;
