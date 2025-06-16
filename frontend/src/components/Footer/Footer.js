import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-600 bg-gray-50 border-t border-gray-200">
      <div className="container px-4 sm:px-6 py-12 md:py-16 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <a className="inline-flex items-center text-gray-900">
              <span className="text-xl font-bold text-red-600">Smart MarketPlace</span>
            </a>
            <p className="mt-4 text-sm text-gray-500 max-w-xs mx-auto md:mx-0">
              Shop now for your necessary essentials online. Quality products, fast delivery, and excellent customer service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h2>
            <nav className="space-y-3">
              <a href="/products" className="text-gray-500 hover:text-red-600 transition-colors duration-300 block">
                Products
              </a>
              <a href="/about" className="text-gray-500 hover:text-red-600 transition-colors duration-300 block">
                About Us
              </a>
              <a href="/contact" className="text-gray-500 hover:text-red-600 transition-colors duration-300 block">
                Contact
              </a>
            </nav>
          </div>

          {/* Policies */}
          <div className="text-center md:text-left">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Policies
            </h2>
            <nav className="space-y-3">
              <p className="text-gray-500 flex items-center justify-center md:justify-start">
                <span className="text-red-500 mr-2">✓</span>
                Returns within 30 days
              </p>
              <p className="text-gray-500 flex items-center justify-center md:justify-start">
                <span className="text-red-500 mr-2">✓</span>
                Pre-shipment cancellations
              </p>
              <p className="text-gray-500 flex items-center justify-center md:justify-start">
                <span className="text-red-500 mr-2">✓</span>
                Secure payments
              </p>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact Us
            </h2>
            <nav className="space-y-3">
              <p className="text-gray-500 flex items-center justify-center md:justify-start">
                <span className="text-red-500 mr-2">📞</span>
                <span>03468883034</span>
              </p>
              <p className="text-gray-500 flex items-center justify-center md:justify-start">
                <span className="text-red-500 mr-2">📧</span>
                <span>aneeskhann666@gmail.com</span>
              </p>
              <p className="text-gray-500 flex items-center justify-center md:justify-start">
                <span className="text-red-500 mr-2">📷</span>
                <span>@aneeskahn</span>
              </p>
            </nav>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} SmartMarketPlace. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-6">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
