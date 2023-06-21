import React, { useState } from "react";
import { postProduct } from "../../api/productApi";

const PostProductForm = () => {
  const [productData, setProductData] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: null,
    rating: {
      rate: 0,
      count: 0,
    },
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.files[0] });
    console.log(productData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("image", productData.image);
    formData.append("rating[rate]", productData.rating.rate);
    formData.append("rating[count]", productData.rating.count);

    await postProduct (formData);
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
            type="file" // Change the type to "file"
            id="image"
            name="image"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md text-base text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleImage} // Remove the onChange handler
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
