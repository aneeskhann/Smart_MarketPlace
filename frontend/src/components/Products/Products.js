import React from "react";
import { Link } from "react-router-dom";


const Products = ({ products }) => {


  return (
    
    <section className="text-gray-600 body-font">
  <div className="container px-4 py-24 mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => {
        console.log(product, "product");
        console.log(product.image)
        return (
          <Link
            to={`../products/${product._id}`}
            key={product._id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:border-red-500 transition duration-300"
          >
            <img
              alt={product.title}
              className="object-contain object-center w-full h-48"
              src={product.image}
            />
            <div className="p-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">
                {product.category}
              </h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">
                {product.title}
              </h2>
              <p className="mt-1 text-md text-semibold text-xl">${product.price}</p>
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
