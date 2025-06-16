import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.jpg";
import { Badge } from "@mui/material";
import { StoreContext } from "../../Context/Context";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { carts } = useContext(StoreContext);
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isSeller = user?.publicMetadata?.role === 'seller';

  const navigations = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
  ];

  // Add Post Product link only for sellers
  if (isSignedIn && isSeller) {
    navigations.push({ name: "Post Product", path: "/post-product" });
  }

  return (
    <header className="text-black-600 body-font shadow-md bg-white">
      {/* Announcement Bar */}
      <div className="bg-red-600 text-end text-white p-1 text-sm overflow-hidden relative">
        <div
          className="whitespace-nowrap animate-scroll font-sans"
          style={{ animation: "scrollText 10s linear infinite" }}
        >
          All online operators are currently affected due to which there might
          be a delay in your delivery
        </div>
      </div>

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Smart Marketplace Logo" className="h-10 w-auto" />
            <span className="font-roboto text-xl md:text-2xl text-red-800 ml-2 tracking-wide">
              Smart Marketplace
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
            {navigations.map((navigation) => (
              <Link
                key={navigation.name}
                to={navigation.path}
                className="px-3 py-2 rounded-lg text-red-600 transition-all duration-300 
                          hover:bg-red-500 hover:text-white hover:-translate-y-1 
                          hover:shadow-lg hover:scale-105"
              >
                {navigation.name}
              </Link>
            ))}
          </nav>

          {/* Right Side: Sign In & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            {!isSignedIn && (
              <Link
                to="/signin"
                className="px-3 py-2 bg-red-50 rounded-lg text-red-600 font-semibold transition-all duration-300 
                        hover:bg-red-500 hover:text-white hover:-translate-y-1 
                        hover:shadow-lg hover:scale-105"
              >
                Sign In
              </Link>
            )}

            <Link to="/cart" className="relative">
              <Badge badgeContent={carts.length} color="secondary">
                <svg
                  className="w-6 h-6 text-blue-500 transition-transform duration-300 
                            hover:text-red-500 hover:scale-110"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M528.12 301.319l47.273-208C579.973 84.503 565.906 64 545.374 64H144l-9.553-47.276C131.498 7.64 121.938 0 111.042 0H24C10.745 0 0 10.745 0 24s10.745 24 24 24h65.411l61.495 304.31C160.159 366.27 180.313 384 204.032 384h271.936c23.719 0 43.873-17.73 48.125-39.69L544 112H151.07l9.554 47.276c2.405 11.929 13.015 20.724 25.167 20.724h324.207c11.884 0 22.066-7.755 24.124-18.318l24-112c2.304-10.754-5.847-20.682-16.828-20.682H144L134.553 16.724C131.498 7.64 121.938 0 111.042 0H24C10.745 0 0 10.745 0 24s10.745 24 24 24h65.411l61.495 304.31C160.159 366.27 180.313 384 204.032 384h271.936c23.719 0 43.873-17.73 48.125-39.69zM200 464c26.51 0 48-21.49 48-48s-21.49-48-48-48-48 21.49-48 48 21.49 48 48 48zm272-48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48z" />
                </svg>
              </Badge>
            </Link>

            <UserButton />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navigations.map((navigation) => (
              <Link
                key={navigation.name}
                to={navigation.path}
                className="block px-3 py-2 rounded-lg text-red-600 transition-all duration-300 
                          hover:bg-red-500 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {navigation.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pt-2">
              {!isSignedIn && (
                <Link
                  to="/signin"
                  className="px-3 py-2 bg-red-50 rounded-lg text-red-600 font-semibold transition-all duration-300 
                            hover:bg-red-500 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
              <Link to="/cart" className="relative" onClick={() => setIsMenuOpen(false)}>
                <Badge badgeContent={carts.length} color="secondary">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M528.12 301.319l47.273-208C579.973 84.503 565.906 64 545.374 64H144l-9.553-47.276C131.498 7.64 121.938 0 111.042 0H24C10.745 0 0 10.745 0 24s10.745 24 24 24h65.411l61.495 304.31C160.159 366.27 180.313 384 204.032 384h271.936c23.719 0 43.873-17.73 48.125-39.69L544 112H151.07l9.554 47.276c2.405 11.929 13.015 20.724 25.167 20.724h324.207c11.884 0 22.066-7.755 24.124-18.318l24-112c2.304-10.754-5.847-20.682-16.828-20.682H144L134.553 16.724C131.498 7.64 121.938 0 111.042 0H24C10.745 0 0 10.745 0 24s10.745 24 24 24h65.411l61.495 304.31C160.159 366.27 180.313 384 204.032 384h271.936c23.719 0 43.873-17.73 48.125-39.69zM200 464c26.51 0 48-21.49 48-48s-21.49-48-48-48-48 21.49-48 48 21.49 48 48 48zm272-48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48z" />
                  </svg>
                </Badge>
              </Link>
              <UserButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;