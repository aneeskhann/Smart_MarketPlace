import React from "react";
import image1 from "../../Assets/image1.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'


const Signin = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleLogin =async (e) => {
    e.preventDefault();
    console.log(username)
    try{
      const response = await axios.post('https://wish-attire.onrender.com/api/users/login', {
        username: username,
        password: password
      });
      const userData = response.data

      if(userData.valid){
        console.log("Login Successful")

        navigate('/')
        
      }else{
        console.log("Login Denied!!")
        alert("Username or Password incorrect.")
      }
    }catch(error){
      console.error("Login error: ", error)
      alert("An error occurred during login")
    }
    

    setUsername("");
    setPassword("");
  };

  return (
    <section
      className="text-white body-font bg-cover bg-center"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center ">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-8xl text-white">WishAttire</h1>
          <p className="leading-relaxed mt-4 text-2xl">
            sign up and get your desired product now
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Sign In
          </h2>
          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <label for="full-name" className="leading-7 text-sm text-gray-900">
                Username or Email
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                id="full-name"
                name="full-name"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label for="password" className="leading-7 text-sm text-gray-900">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          
          <p className="text-black mb-3 cursor-pointer">Forgot Password?</p>
          <div className="flex flex-wrap justify-center">
            <button
              type= "submit"
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
