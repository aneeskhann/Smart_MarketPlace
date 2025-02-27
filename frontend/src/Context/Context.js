import React, { createContext, useState, useEffect } from "react";
import { getProducts } from "../api/productApi";

// Create the context
const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalBill, setTotalBill] = useState(0);

    // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Calculate total bill from cart
  const carts = JSON.parse(localStorage.getItem("cart")) || [];
  useEffect(() => {
    let total = 0;
    carts.forEach((cartItem) => {
      total += cartItem.price * cartItem.quantity;
    });
    total = Number(total.toFixed(2));
    setTotalBill(total);
  }, [carts]);

  // Functions to handle cart operations
  const handleInc = (id) => {
    const updatedCart = carts.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDec = (id) => {
    const updatedCart = carts.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Store object passed to the context
  const store = {
    currentUser,
    setCurrentUser,
       products,
    totalBill,
    carts,
    handleInc,
    handleDec,
    };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export { StoreProvider, StoreContext };
