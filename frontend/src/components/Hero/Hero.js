import React from 'react'
import { Link } from 'react-router-dom'
import frontPage from '../../Assets/frontPage.jpg'


const Hero = () => {
  return (
    <section className="text-gray-600 body-font ">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">New arrival of quality products.
        <h3 className="text-red-500 text-xl capitalize">Your satifaction is out priority</h3> 
      </h1>
      <p className="mb-8 leading-relaxed">We provide a curated selection of high-quality, stylish apparel, catering to various styles and preferences. Our collection includes tops, bottoms, dresses, outerwear, activewear, and accessories from top-notch brands. We prioritize inclusivity by offering a diverse range of sizes. Our user-friendly website allows easy browsing, filtering, and secure online shopping. </p>
      <div className="flex justify-center">
        <Link to={'/signin'} className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">Sign In</Link>
        <Link to= {'/cart'} className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">Go To Cart</Link>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img className="object-cover object-center rounded" alt="Ecommerce store" src={frontPage}/>
    </div>
  </div>
</section>
  )
}

export default Hero
