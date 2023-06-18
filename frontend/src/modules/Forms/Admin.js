import React, { useState } from 'react';
import { postProduct } from '../../api/productApi';

const PostProductForm = () => {
  const [productData, setProductData] = useState({
    title: '',
    price: 0,
    description: '',
    category: '',
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
    console.log(productData)
  };
   


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form= new FormData()

    
    
    form.append('title',productData.title)
    form.append('price',productData.price)
    form.append('description',productData.description)
    form.append('category',productData.category)
    
    // Send the productData to the server
    await postProduct(productData); 
    // ... your code to post the data
  };

  return (
    <div className="max-w-md mx-auto">
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
            required
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
            required
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
            required
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
