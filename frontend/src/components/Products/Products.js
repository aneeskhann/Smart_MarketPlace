import React from "react";
import { Link } from "react-router-dom";


const Products = ({ products }) => {

  


  return (
    
    <section className="text-gray-600 body-font">
      
      <div className="container px-5 py-24 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => {
            console.log(product, "product");
            const { _id, title, price, description, category, image } = product;
            return (
              <Link
                to={`../products/${_id}`}
                key={_id}
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
