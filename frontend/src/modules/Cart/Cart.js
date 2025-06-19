import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/Context";

const Cart = () => {
   
  
  const inputRef = useRef(null);
  const { handleInc, handleDec, carts, totalBill,clearCart,syncCart } = useContext(StoreContext);

  

  if (carts.length === 0) {
    return <>
    <div className="text-center text-5xl font-sans capitalize mt-14">your cart</div>
    <div className="text-center text-sm font-sans  capitalize mt-9">your cart is empty</div>
    <div className="text-center text-sm font-sans capitalize mt-2">continue shopping</div>
    </>;
  }

  const removeProduct = (id) => {
    const updatedCart = carts.filter((item) => item.id !== id);
    syncCart(updatedCart);
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

  return (
    <div className="container mx-auto mt-10 ">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{carts?.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Quantity
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Price
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Total
            </h3>
          </div>
          {carts?.map((cartItems) => {
            return (
              <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img
                      className="h-24"
                      src={cartItems?.image}
                      alt={cartItems?.title}
                    />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">
                      {cartItems?.title}
                    </span>
                    <span className="text-red-500 mt-6 text-s capitalize">
                      {cartItems?.category}
                    </span>
                    <div
                      className="font-semibold hover:text-red-500 hover:text-sm text-gray-500 text-xs cursor-pointer"
                      onClick={() => removeProduct(cartItems?.id)}
                    >
                      Remove
                    </div>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <span
                    className="inline-flex items-center bg-red-200 border-0 py-2 px-4 focus:outline-none hover:bg-red-400 rounded text-base mt-4 md:mt-0"
                    onClick={() => handleDec(cartItems.id)}
                  >
                    <svg
                      className="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </span>

                  <input
                    className="mx-2 border text-center w-8"
                    type="text"
                    value={cartItems?.quantity}
                    ref={inputRef}
                  />

                  <span
                    className="inline-flex items-center bg-red-200 border-0 py-2 px-4 focus:outline-none hover:bg-red-400 rounded text-base mt-4 md:mt-0"
                    onClick={() => handleInc(cartItems.id)}
                  >
                    <svg
                      className="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </span>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${cartItems?.price}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${(cartItems?.price * cartItems?.quantity).toFixed(2)}
                </span>
              </div>
            );
          })}

<Link
  to="/products"
  className="flex font-semibold text-indigo-600 text-sm mt-10"
>
  <svg
    className="fill-current mr-2 text-indigo-600 w-4"
    viewBox="0 0 448 512"
  >
    <path d="..." />
  </svg>
  Continue Shopping
</Link>

<button
  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm font-semibold"
  onClick={clearCart}
>
  Clear Cart
</button>

        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {carts?.length}
            </span>
            <span className="font-semibold text-sm">${totalBill}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
         
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${totalBill + 10}</span>
            </div>
            <button className="bg-green-900 font-semibold hover:bg-green-800 py-3 text-sm text-white uppercase w-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
