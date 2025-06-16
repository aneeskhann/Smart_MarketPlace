import React from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ cards = [] }) => {
  return (
    <section className="text-gray-600 body-font bg-slate-100">
      <div className="container px-5 py-15 mx-auto">
        <h1 className="sm:text-3xl text-3xl font-bold title-font text-gray-800 text-center mb-10 mt-10">
          Categories
        </h1>
        <div className="flex flex-wrap -m-4 justify-center">
          {cards.map((card) => (
            <Link
              to={`/categories/${card.slug}`}
              key={card._id}
              className="p-4 sm:w-1/3 md:w-1/2 lg:w-1/4 cursor-pointer capitalize"
            >
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {card.name}
                  </h2>
                  <p className="leading-relaxed mb-3 text-sm text-gray-500">
                    {card.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCard;
