import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loaders/Loading";
import axios from "axios";

const localApiUrl = "http://localhost:8000";

const ProductCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${localApiUrl}/api/products/${id}`);
        console.log("Product fetched from local DB:", response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCart = (product, redirect) => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductExist = cart.find((item) => item.id === product.id || item._id === product._id);

    if (isProductExist) {
      const updatedCart = cart.map((item) =>
        (item.id === product.id || item._id === product._id) 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      localStorage.setItem("cart", JSON.stringify([...cart, { ...product, quantity: 1 }])); 
    }

    alert("Product Added To Cart!");

    if (redirect) navigate("/cart");
  };

  if (!product) return <Loading />;

  return (
    <section className="text-gray-600 body-font overflow-hidden bg-white shadow-xl rounded-lg">
      <div className="container px-8 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap border-b-2 border-gray-200 pb-12 mb-12">
          {/* Product Image */}
          <div className="lg:w-1/2 w-full lg:h-auto max-h-[600px] h-64 object-center object-cover rounded-xl">
            <img
              alt={product.title || "Product Image"}
              className="w-full h-full object-contain rounded-lg shadow-md"
              src={product.image}
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 w-full lg:pl-16 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
              {product.category || "No category"}
            </h2>
            <h1 className="text-gray-900 text-4xl title-font font-semibold mb-4">
              {product.title || "Product Title"}
            </h1>
            <p className="leading-relaxed text-lg text-gray-700 mb-6">
              {product.description || "No description available."}
            </p>

            {/* Price and Actions */}
            <div className="flex items-center mb-8">
              <span className="title-font font-bold text-3xl text-gray-900 mr-6">
                ${product.price || "N/A"}
              </span>
              <button
                className="flex ml-auto text-white bg-red-400 border-0 py-3 px-6 focus:outline-none hover:bg-red-600 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => handleCart(product, true)}
              >
                Buy Now
              </button>
              <button
                className="flex ml-6 text-white bg-blue-500 border-0 py-3 px-6 focus:outline-none hover:bg-blue-600 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => handleCart(product)}
              >
                Add to Cart
              </button>
            </div>

            {/* Optional Reviews or Ratings */}
            <div className="flex items-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-yellow-500 mr-3" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 17.3l6.4 3.7-1.6-7 5.2-4.5-6.8-.6L12 2 9.8 9.6l-6.8 .6 5.2 4.5-1.6 7z"/>
              </svg>
              <span className="text-gray-600 text-lg">
                {product.rating ? `${product.rating} Stars` : "No Ratings Yet"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
