import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loaders/Loading";
import axios from "axios";

const localApiUrl = "http://localhost:8000";
const fakeStoreApiUrl = "https://fakestoreapi.com";

const Product = () => {
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
        // Try fetching from local database first
        let response = await axios.get(`${localApiUrl}/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.warn("Product not found locally, trying FakeStore API...");
        try {
          // If not found locally, fetch from FakeStore API
          let response = await axios.get(`${fakeStoreApiUrl}/products/${id}`);
          setProduct(response.data);
        } catch (err) {
          console.error("Error fetching product from FakeStore API:", err);
          setProduct(null);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleCart = (product, redirect) => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductExist = cart.find((item) => item.id === product.id);

    if (isProductExist) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
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
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={product.title || "Product Image"}
            className="lg:w-1/2 w-full lg:h-auto max-h-[600px] h-64 object-center object-contain rounded"
            src={product.image || "/placeholder-image.jpg"}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.category || "Uncategorized"}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.title || "Product Title"}
            </h1>
            <p className="leading-relaxed">{product.description || "No description available."}</p>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900 mr-5">
                ${product.price || "N/A"}
              </span>
              <button
                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                onClick={() => handleCart(product, true)}
              >
                Buy Now
              </button>
              <button
                className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                onClick={() => handleCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
