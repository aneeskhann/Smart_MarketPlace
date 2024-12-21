import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../Context/Context"; // Import StoreContext correctly
import image1 from "../../Assets/image1.jpg";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser, setUserRole } = useContext(StoreContext); // Access setUserRole function from the context

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post("http://localhost:8000/api/login", {
        username,
        password,
      });
  
      setCurrentUser(data); // Save user data in context
      setUserRole(data.role); // Save user role in context (use 'role' instead of 'userRole')
  
      console.log("Login Successful", data);
      console.log("Login Response Data: ", data);
      console.log("User Role: ", data.role);
  
      // Navigate based on user role
      if (data.role === "admin") {
        navigate("/adminPanel");
      } else if (data.role === "client") {
        navigate("/"); // Default navigation
      } else if (data.role === "seller") {
        navigate("/add");
      }
    } catch (error) {
      console.error("Error: ", error.response?.data);
      if (error.response?.status === 401) {
        setErrorMessage("Invalid username or password.");
      } else {
        setErrorMessage("Unexpected server error.");
        console.log("server error", error.message);
      }
    }
  };
  
  return (
    <section
      className="text-white body-font bg-cover bg-center"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-8xl text-white">WishAttire</h1>
          <p className="leading-relaxed mt-4 text-2xl">
            Sign up and get your desired product now
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
          {errorMessage && <p className="text-red-500 mb-3">{errorMessage}</p>}
          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <label htmlFor="username" className="leading-7 text-sm text-gray-900">
                Username or Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <p className="text-black mb-3 cursor-pointer">Forgot Password?</p>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg mr-4"
              >
                Login
              </button>
              <Link
                to="/signup"
                className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
              >
                Register
              </Link>
            </div>
          </form>

          <p className="text-xs text-gray-500 mt-3">
            Literally you probably haven't heard of them jean shorts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signin;
