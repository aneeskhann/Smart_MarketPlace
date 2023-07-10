import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productApi";

const Store_Context= createContext()

const Store_Provider= ({children}) => {
  const navigate = useNavigate();
  const carts = JSON.parse(localStorage.getItem("cart")) || [];
  const inputRef = useRef(null); 

  const [products, setProducts] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      const data= await getProducts()
      
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (carts.length === 0) {
      setTotalBill(0);
      return;
    }

    let total = 0;
    carts.forEach((cartItem) => {
      total += cartItem.price * cartItem.quantity;
    });

    
    total = Number(total.toFixed(2));

    setTotalBill(total);
  }, [carts]);

 

  const handleInc = (id) => {
    const updatedCart = carts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const handleDec = (id) => {
    const updatedCart = carts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  // const updateQuantity= (id) => {
  //   const updateCart= carts.map((item) => {
  //     if(item.id === id) {
  //       return {
  //         ...item,
  //         quantity: parseInt(inputRef.current.value),
  //       }
  //     }
  //     return item;
  //   })
  //   localStorage.setItem("cart", JSON.stringify(updateCart))
  //   navigate("/cart")
  // }
  


  const store= {
    handleInc,
    handleDec,
    products,
    totalBill,
    carts,
    currentUser,
    setCurrentUser
    
  };
  return(
    <Store_Context.Provider value={store}>{children}</Store_Context.Provider>
  )
}

export {Store_Provider, Store_Context };