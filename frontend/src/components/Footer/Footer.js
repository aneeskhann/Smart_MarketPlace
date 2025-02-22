import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-600 bg-gray-300 border-t-2">
      <div className="container px-5 py-16 mx-auto flex flex-wrap justify-between">
        
        {/* Brand Section */}
        <div className="w-full md:w-1/3 text-center md:text-left mb-8 md:mb-0">
          <a className="flex title-font font-medium items-center justify-center md:justify-start text-gray-900">
            <span className="ml-3 text-xl font-semibold">Smart MarketPlace</span>
          </a>
          <p className="mt-2 text-sm text-gray-500">
            Shop now for your necessary essentials online.
          </p>
        </div>

        {/* Links Section */}
        <div className="w-full md:w-2/3 flex flex-wrap justify-evenly">
          
          {/* Policies */}
          <div className="w-full sm:w-1/3 text-center md:text-left mb-6 sm:mb-0">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Policies
            </h2>
            <nav className="list-none space-y-2">
              <li>
                <p className="text-gray-600">✔ We accept returns within 30 days of the delivery date.</p>
              </li>
              <li>
                <p className="text-gray-600">✔ Order cancellations are possible before the item is shipped.</p>
              </li>
            </nav>
          </div>

          {/* About Us */}
          <div className="w-full sm:w-1/3 text-center md:text-left">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              About Us
            </h2>
            <nav className="list-none space-y-2">
              <li>
                <p className="text-gray-600">📞 Contact: <span className="text-gray-800">03468883034</span></p>
              </li>
              <li>
                <p className="text-gray-600">📧 Email: <span className="text-gray-800">aneeskhann666@gmail.com</span></p>
              </li>
              <li>
                <p className="text-gray-600">📷 Instagram: <span className="text-gray-800">aneeskahn</span></p>
              </li>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-red-500 mt-10">
        <div className="container mx-auto py-4 px-5 flex flex-col sm:flex-row justify-between items-center">
          
          {/* Copyright */}
          <p className="text-white text-sm text-center sm:text-left">
            © 2023 SmartMarketPlace — 
            <a
              href="https://twitter.com/knyttneve"
              rel="noopener noreferrer"
              className="text-white font-semibold ml-1 hover:underline"
              target="_blank"
            >
            </a>
          </p>

          {/* Social Icons */}
          <div className="flex mt-4 sm:mt-0">
            <a href="#" aria-label="Facebook" className="text-white hover:text-gray-300 mx-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="text-white hover:text-gray-300 mx-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-white hover:text-gray-300 mx-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="text-white hover:text-gray-300 mx-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
