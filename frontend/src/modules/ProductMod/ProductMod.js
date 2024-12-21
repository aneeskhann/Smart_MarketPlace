import React, { useContext } from "react";
import Products from "../../components/Products/Products";
import Categories from "../../components/Categories/Categories";
import Loading from "../../components/Loaders/Loading";
import Hero from "../../components/Hero/Hero";
import { StoreContext } from "../../Context/Context";

const ProductMod = () => {
  
  const {products}= useContext(StoreContext);

  return (
    <div>
      <Hero/>
      <Categories/>
      
      {
        products.length > 0 ?
        <Products products={products}/>
        :
        <div><Loading/></div>
      }
      
    </div>
  );
};

export default ProductMod;
