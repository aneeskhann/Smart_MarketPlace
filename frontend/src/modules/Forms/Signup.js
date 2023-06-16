import React from "react";
import axios from "axios";
import signup from "../../Assets/signup.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        { username, email, password }
      );
      console.log(username, email, password);
      if (response.data.message === "User registered successfully") {
        // Registration successful
        console.log("User registered successfully");
        alert("user registered successfully.");
        // Reset the form fields
        setEmail("");
        setUsername("");
        setPassword("");
        // Navigate to the signin page
      } else {
        // Registration failed
        console.log("Registration error:", response.data.message);
        if (response.data.message === "User already exists") {
          alert("User already registered. Please login instead.");
        } else {
          // Handle other errors
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <section
      className="text-white body-font bg-cover bg-center"
      style={{ backgroundImage: `url(${signup})` }}
    >
      <div className="container px-5 py-24 mx-auto flex justify-center">
        <div className="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Sign Up
          </h2>
          <form onSubmit={handleRegister}>
            <div className="relative mb-4">
              <label
                htmlFor="username"
                className="leading-7 text-sm text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setUsername(e.currentTarget.value)}
                value={username}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setEmail(e.currentTarget.value)}
                value={email}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setPassword(e.currentTarget.value)}
                value={password}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="confirm-password"
                className="leading-7 text-sm text-gray-900"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              type="submit"
              className="flex flex-wrap justify-center text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
            >
              {/* <Link to= "/signin" className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"> */}
              Register
              {/* </Link> */}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
