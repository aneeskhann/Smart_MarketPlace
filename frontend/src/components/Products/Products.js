import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


const Products = ({ products }) => {

  const location = useLocation();
  const [filterProducts,setFilterProducts]=useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const filter= products.filter((product)=> product.category !== 'electronics')
    setFilterProducts(filter);
  }, [location, products]);

  return (
    
    <section className="text-gray-600 body-font">
      
      <div className="container px-5 py-24 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filterProducts.map((product) => {
            console.log(product, "product");
            const { id, title, price, description, category, image } = product;
            return (
              <Link
                to={`../products/${id}`}
                key={id}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:border-red-500 transition duration-300"
              >
                <img
                  alt={title}
                  className="object-contain object-center w-full h-48"
                  src={image}
                />
                <div className="p-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">
                    {category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {title}
                  </h2>

                  <p className="mt-1 text-md text-semibold text-xl">${price}</p>
                  
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
