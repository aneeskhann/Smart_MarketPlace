import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ cards = [1, 2, 3] }) => {

  const[filterCategories, setFilterCategories]= useState()

  useEffect(()=> {
    const filter= cards.filter((card) => card !== 'electronics')
    setFilterCategories(filter)
  },[])
  
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-15 mx-auto">
      <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 text-center mb-10 mt-10 ">
         
          Categories
          
          <br />
        </h1>
        <div className="flex flex-wrap -m-4 justify-center">
          {filterCategories?.map((card) => {
            return (
              <Link
                to={`/categories/${card}`}
                className="p-4 md:w-1/4 cursor-pointer capitalize "
              >
                <div className="flex rounded-lg h-full bg-red-100 p-8 flex-col hover:bg-red-300">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-red-500 text-white flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium">
                      {card || "example cards"}
                    </h2>
                  </div>
                  <div className="flex-grow">
                    
                    <a className="mt-3 text-red-500 inline-flex items-center">
                      Shop Now
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
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

export default FeatureCard;
