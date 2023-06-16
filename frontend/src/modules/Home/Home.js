import React, { useContext } from "react";
import Products from "../../components/Products/Products";
import StatsCard from "../../components/StatsCard/StatsCard";
import Categories from "../../components/Categories/Categories";
import { Spinner } from "react-bootstrap";
import Slider from "../../components/Carousel/Slider";
import { Store_Context } from "../../Context/Context";

const Home = () => {
  const {products}= useContext(Store_Context);

  return (
    <div>
      <Slider/>
      <Categories/>
      
      <div className="flex flex-col text-center w-full mt-20  ">
        <h2 className="text-xs text-red-500 tracking-widest font-medium title-font mb-1">
          PRODUCTS
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          All Products
        </h1>
      </div>
      {products.length > 0 ? (
        <Products products={products} />
      ) : (
        <Spinner animation="border"/> 
         
      )}
      <StatsCard />
    </div>
  );
};

export default Home;
