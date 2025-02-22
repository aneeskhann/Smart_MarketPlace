import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loaders/Loading";
import axios from "axios";
  
  
const url = "http://localhost:8000";
const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${url}/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleCart = (product, redirect) => {
    console.log("Product being added:", product); // Check product details
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Existing cart:", cart); // Log current cart
    const isProductExist = cart.find((item) => item.id === product.id);
    if (isProductExist) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      console.log("Updated cart:", updatedCart); // Log updated cart
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      console.log("New cart:", newCart); // Log new cart
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    alert("Product Added To Cart !!");

      navigate("/cart");
    
  };
  

  if (!Object.keys(product).length) return <Loading />;

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={product?.title || "Product Image"}
            className="lg:w-1/2 w-full lg:h-auto max-h-[600px] h-64 object-center object-contain rounded"
            src={product?.image ? `${url}/${product.image}` : "/placeholder-image.jpg"}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product?.category || "Uncategorized"}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product?.title || "Product Title"}
            </h1>
            <p className="leading-relaxed">{product?.description || "No description available."}</p>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900 mr-5">
                ${product?.price || "N/A"}
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
