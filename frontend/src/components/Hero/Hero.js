import React from "react";
import heroImage from "../../Assets/frontPage.jpg"; // Change this to your hero image path
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-white to-orange-100">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 py-16 md:py-32">
        
        {/* Left: Text Content */}
        <div className="flex flex-col space-y-4 md:space-y-6 md:w-1/2 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-red-700 leading-tight">
            Welcome to <br className="hidden sm:block" /> Smart Marketplace
          </h1>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-2xl mx-auto md:mx-0">
            Discover, Buy, and Sell amazing products with trust and speed. 
            Experience shopping like never before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
            <Link
              to="/products"
              className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-all duration-300 text-center"
            >
              Explore Products
            </Link>
            <Link
              to="/add"
              className="px-6 py-3 border-2 border-red-600 text-red-600 rounded-full font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 text-center"
            >
              List Your Product
            </Link>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="md:w-1/2 mb-8 md:mb-0 px-4 sm:px-0">
          <img
            src={heroImage}
            alt="Smart Marketplace Hero"
            className="w-full h-auto rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            loading="eager"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
