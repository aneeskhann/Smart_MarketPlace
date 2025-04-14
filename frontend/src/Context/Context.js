import React, { createContext, useState, useEffect } from "react";
import { getProducts } from "../api/productApi";

// Create context
const StoreContext = createContext();

// Provider Component
const StoreProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [totalBill, setTotalBill] = useState(0);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Update localStorage + state
  const syncCart = (updatedCart) => {
    setCarts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Cart operations
  const handleInc = (id) => {
    const updatedCart = carts.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    syncCart(updatedCart);
  };

  const handleDec = (id) => {
    const updatedCart = carts
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      );
    syncCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = carts.filter((item) => item.id !== id);
    syncCart(updatedCart);
  };

  const clearCart = () => {
    syncCart([]);
  };

  // Auto calculate total
  useEffect(() => {
    const total = carts.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalBill(Number(total.toFixed(2)));
  }, [carts]);

  // Global store object
  const store = {
    currentUser,
    setCurrentUser,
    products,
    carts,
    totalBill,
    handleInc,
    handleDec,
    removeFromCart,
    clearCart,
  };

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
