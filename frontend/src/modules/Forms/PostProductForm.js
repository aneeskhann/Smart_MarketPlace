import React, { useState, useEffect } from "react";
import { validateAndPostProduct } from "../../api/geminiApi"; // Updated API call
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const PostProductForm = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [productData, setProductData] = useState({
    title: "", 
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const [validationMessage, setValidationMessage] = useState(""); // State to display validation response
  const [loading, setLoading] = useState(false); // State to show loading while API request is in progress
  const [isUrdu, setIsUrdu] = useState(false); // Toggle state for language

  useEffect(() => {
    // Check if user is signed in and is a seller
    if (!isSignedIn) {
      navigate('/signin');
      return;
    }

    const userRole = user?.publicMetadata?.role;
    if (userRole !== 'seller') {
      navigate('/role-selection');
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [user, isSignedIn, navigate]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImage = (file) => {
    setProductData((prev) => ({
      ...prev,
      image: file, 
    }));
  };

  const handleCategoryChange = (e) => {
    if (e.target.value === "custom") {
      setShowCustomCategory(true);
      setProductData({ ...productData, category: "" });
    } else {
      setShowCustomCategory(false);
      setProductData({ ...productData, category: e.target.value });
    }
  };

  const handleCustomCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/categories", {
        name: productData.category,
        description: `Products in ${productData.category} category`
      });
      
      setCategories([...categories, response.data]);
      setShowCustomCategory(false);
      setProductData({ ...productData, category: response.data.name });
    } catch (error) {
      console.error("Error creating custom category:", error);
      alert("Failed to create custom category. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.title || !productData.price || !productData.category || !productData.description || !productData.image) {
      setValidationMessage(isUrdu ? "⚠️ براہ کرم تمام فیلڈز مکمل کریں اور ایک تصویر اپ لوڈ کریں۔" : "⚠️ Please fill in all fields and upload an image.");
      return;
    }

    setLoading(true); // Start loading
    setValidationMessage(""); // Clear previous messages

    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("image", productData.image);

    try {
      const response = await validateAndPostProduct(formData);
      setLoading(false);

      if (response.error) {
        setValidationMessage(isUrdu ? `❌ ${response.error}` : `❌ ${response.error}`);
      } else if (response.message) {
        setValidationMessage(isUrdu ? `✅ ${response.message}` : `✅ ${response.message}`);

        if (response.product) {
          setTimeout(() => navigate("/"), 2000); // Redirect after showing message
        }
      }
    } catch (error) {
      setLoading(false);
      setValidationMessage(isUrdu ? "❌ پروڈکٹ پوسٹ کرنے میں خرابی ہوئی۔ دوبارہ کوشش کریں۔" : "❌ Error posting product. Please try again.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleImage(acceptedFiles[0]);
      }
    },
  });

  return (
    <div className="w-full max-w-screen-lg bg-gray-50 mx-auto mt-10 p-8 shadow-2xl rounded-xl">
      <form className="bg-transparent" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2 className="text-3xl py-10 font-extrabold text-center bg-gradient-to-r from-red-500 to-gray-700 text-transparent bg-clip-text drop-shadow-lg transition-all duration-300 hover:scale-105">
          🚀 {isUrdu ? "نیا پروڈکٹ شامل کریں" : "Add New Product"} 🛍️
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-semibold mb-1 text-left ml-16">{isUrdu ? "عنوان:" : "Title:"}</label>
              <input
                className="w-3/4 px-4 py-2 border-2 border-gray-300 bg-transparent rounded-lg text-black focus:ring-2 focus:ring-blue-400 focus:outline-none hover:shadow-md hover:shadow-blue-300 hover:-translate-y-1 transition"
                name="title"
                type="text"
                value={productData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-1 text-left ml-16">{isUrdu ? "قیمت:" : "Price:"}</label>
              <input
                className="w-3/4 px-4 py-2 border-2 border-gray-300 bg-transparent rounded-lg text-black focus:ring-2 focus:ring-blue-400 focus:outline-none hover:shadow-md hover:shadow-blue-300 hover:-translate-y-1 transition"
                name="price"
                type="number"
                value={productData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-1 text-left ml-16">
                {isUrdu ? "زمرہ:" : "Category:"}
              </label>
              {!showCustomCategory ? (
                <select
                  className="w-3/4 px-4 py-2 border-2 border-gray-300 bg-transparent rounded-lg text-black focus:ring-2 focus:ring-red-400 focus:outline-none hover:shadow-md hover:shadow-blue-300 hover:-translate-y-1 transition"
                  name="category"
                  value={productData.category}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                  <option value="custom">+ Add New Category</option>
                </select>
              ) : (
                <div className="w-3/4">
                  <input
                    className="w-full px-4 py-2 border-2 border-gray-300 bg-transparent rounded-lg text-black focus:ring-2 focus:ring-red-400 focus:outline-none hover:shadow-md hover:shadow-blue-300 hover:-translate-y-1 transition"
                    name="category"
                    type="text"
                    value={productData.category}
                    onChange={handleChange}
                    placeholder="Enter new category name"
                    required
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={handleCustomCategorySubmit}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Add Category
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCustomCategory(false);
                        setProductData({ ...productData, category: "" });
                      }}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1 text-left ml-16">{isUrdu ? "تصویر:" : "Image:"}</label>
            <div
              {...getRootProps()}
              className={`w-full h-48 flex flex-col items-center justify-center border-4 border-dashed 
              rounded-lg cursor-pointer transition-all duration-300 text-gray-700
              ${isDragActive
                ? "border-blue-500 bg-blue-100 shadow-lg scale-105"
                : "border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 hover:shadow-xl hover:scale-105"
              }`}
            >
              <input {...getInputProps()} />
              {productData.image ? (
                <img
                  src={URL.createObjectURL(productData.image)}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md shadow-md"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-4xl">📸</span>
                  <p className="mt-2 text-sm font-semibold text-gray-600">
                    {isUrdu ? "یہاں تصویر ڈریگ اور ڈراپ کریں، یا" : "Drag & drop an image here, or"}{" "}
                    <span className="text-blue-500 underline">{isUrdu ? "چننے کے لیے کلک کریں" : "click to select"}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
 {/* Language Toggle Button */}
        <div className="flex justify-end mt-2">
          <button
            className="text-blue-500 text-lg font-semibold"
            onClick={() => setIsUrdu(!isUrdu)}
          >
            {isUrdu ? "Switch to English" : "اردو میں تبدیل کریں"}
          </button>
        </div>
        <div >
          <label className="block text-lg font-semibold mb-1 text-left ml-16">{isUrdu ? "تفصیل:" : "Description:"}</label>
          <textarea
            className="w-full ml-12 px-4 py-3 border-2 bg-transparent rounded-lg border-gray-300 text-black focus:ring-2 focus:ring-red-900 focus:outline-none h-36 hover:shadow-md hover:shadow-blue-300 hover:-translate-y-1 transition"
            name="description"
            rows="3"
            value={productData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Validation Message Display */}
        {validationMessage && (
          <div className="mt-4 p-3 text-center font-semibold rounded-md bg-gray-100 border border-gray-300 text-gray-800 shadow-md">
            {validationMessage}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            className="w-40 md:w-44 bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 active:scale-95 border-2 border-transparent hover:border-white focus:outline-none focus:ring-2 focus:ring-orange-300"
            type="submit"
            disabled={loading}
          >
            {loading ? (isUrdu ? "جانچ رہا ہے..." : "Validating...") : (isUrdu ? "پروڈکٹ شامل کریں" : "Add Product")}
          </button>
        </div>

       
      </form>
    </div>
  );
};

export default PostProductForm;
