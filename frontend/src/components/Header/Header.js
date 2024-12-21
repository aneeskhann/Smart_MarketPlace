import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.jpg";
import { Badge } from '@mui/material';    // New
import { StoreContext } from "../../Context/Context";



const Header = () => {
  // const { isDarkMode, toggleTheme } = useContext(ThemeContext);


  const { carts } = useContext(StoreContext);

  // const handleThemeToggle = () => {
  //   toggleTheme();
  // };

  const navigations = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
    {
      name: "Sell-Item",
      path: "/add",
    },
    {
      name: "Profile",
      path: "/profile",
    }
  ];

  return (
    <header className="text-black-600 body-font shadow-lg bg-white ">
      <div className="bg-red-600 text-end text-white p-1 text-sm overflow-hidden relative">
  <div
    className="whitespace-nowrap animate-scroll font-sans"
    style={{ animation: "scrollText 10s linear infinite" }}
  >
    All online operators are currently affected due to which there might be a delay in your delivery
  </div>
</div>


      <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
      <div className="flex items-center justify-center">
      <img
        src={logo}
        alt="logo"
        className="md:cursor-pointer h-10 ml-2 bg-white"
      />

      <Link
        to="/"
        className="flex cursor-pointer title-font font-medium items-center mb-4 md:mb-0"
      >
        <span className="font-roboto text-2xl text-red-800 tracking-wide">
          Smart Marketplace
        </span>
      </Link>
    </div>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center justify-center text-base cursor-pointer">
      {navigations.map((navigation) => (
        <Link
          to={navigation.path}
          className="mr-5 text-sm font-sans text-red-600 hover:text-black capitalize border border-white rounded-lg overflow-hidden hover:border-red-500 transition duration-300 p-1"
          key={navigation.name}
        >
          {navigation.name}
          
        </Link>
      ))}
    </nav>
        {/* <button
          onClick={handleThemeToggle}
          className="inline-flex items-center text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded-full text-base ml-10 mt-4 md:mt-0 mr-5 transition duration-300"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button> */}
      
        <div className="pr-3">
          <Link
            to="/AdminPanel"
            className="inline-flex items-center text-red-500 border-2 border-red-500 py-1 px-3 focus:outline-none hover:bg-red-500 hover:text-white rounded-full text-base mt-4 md:mt-0 mr-2 transition duration-300"
          >
            Admin
          </Link>
        </div>



         <div>
          <Link
            to="./signin"
            className="inline-flex items-center text-red-500 border-2 border-red-500 py-1 px-3 focus:outline-none hover:bg-red-500 hover:text-white rounded-full text-base mt-4 md:mt-0 mr-2 transition duration-300"
          >
            Sign in
          </Link>
        </div>
  
          <div className="pr-5">
          <Badge
            badgeContent={carts.length}
            color="secondary"
            overlap="rectangular"
          >
            <Link to={"/cart"}>
              <svg
                className="mr-2 ml-5"
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 0 576 512"
              >
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
            </Link>
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default Header;
