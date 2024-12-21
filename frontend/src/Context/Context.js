import React, { createContext, useState, useEffect } from "react";
import {getUserDetails} from  "../api/userApi";
import { getProducts } from "../api/productApi";

// Create the context
const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [userRole, setUserRole] = useState(null);




  // Function to log in a user
  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  // Function to log out a user
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  // Load user data from localStorage if available
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
     if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      fetchUserRole(parsedUser.id);
     }
  }, []);

  const fetchUserRole = async (userId) => {
    try {
      // Fetch user details from the API
      const userDetails = await getUserDetails(userId); // Use the imported API function to get user details
      setUserRole(userDetails.role); // Assuming the API response contains a `role` field
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };
  

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
    login,
    logout,
    products,
    totalBill,
    carts,
    handleInc,
    handleDec,
    userRole,
    fetchUserRole,
    setUserRole
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export { StoreProvider, StoreContext };
