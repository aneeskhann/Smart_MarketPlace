import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products = [] }) => {
  return (
    <section className="text-gray-600 body-font bg-gray-600"> 
      <div className="container px-4 sm:px-6 py-16 md:py-24 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => {
            const id = product._id || product.id;
            return (
              <Link
                to={`/product/${id}`}
                key={id}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain object-center w-full h-full p-4 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">
                    {product.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-base sm:text-lg font-medium mb-2 line-clamp-2">
                    {product.title}
                  </h2>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-red-600">${product.price}</p>
                    <span className="text-sm text-gray-500 group-hover:text-red-500 transition-colors duration-300">
                      View Details →
                    </span>
                  </div>
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
