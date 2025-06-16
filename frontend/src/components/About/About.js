import React from "react";
import { Link } from "react-router-dom";
import aneess from "../../Assets/aneess.jpg";
import yaman from "../../Assets/yaman.jpg";
import uzair from "../../Assets/uzair.jpg";
import Content from "./Content";

const About = () => {
  return (
    <>
      <Link to={"/about"} className="text-gray-600 body-font">
        <div className="container px-5 py-14 mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-2 text-gray-900">
            Meet Our Team
          </h2>
          <div className="flex flex-wrap -m-4 justify-center mt-10">
            {/* First Section */}
            <div className="sm:w-full md:w-1/2 lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl rounded-lg p-6 bg-slate-100 shadow-md hover:bg-red-100 hover:shadow-red-200">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-300 bg-gray-100"
                  src={aneess}
                />
                <p className="leading-relaxed">
             Building interactive and responsive user interfaces using the MERN stack. With expertise in integrating cloud services, I continuously learn and stay updated with the latest trends and best practices in React and cloud technologies. Eager to contribute to projects, I aim to deliver high-quality MERN-based solutions and seamless cloud integrations.


                </p>
                <span className="inline-block h-1 w-10 rounded bg-red-500 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  Muhammad Anees
                </h2>
                <p className="text-gray-500">MERN stack Developer</p>
              </div>
            </div>

            {/* Second Section */}
            <div className="sm:w-full md:w-1/2 lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl rounded-lg p-6 bg-slate-100 shadow-md hover:bg-red-100 hover:shadow-red-300">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={yaman}
                />
                <p className="leading-relaxed">
                  Building interactive and responsive user interfaces.
                  Continuously learning and staying updated with the latest
                  trends and best practices in React development, Yaman is
                  eager to contribute to projects and deliver high-quality
                  React-based solutions.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-red-500 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  Yaman Husain
                </h2>
                <p className="text-gray-500">UI Developer</p>
              </div>
            </div>

            {/* Third Section */}
            <div className="sm:w-full md:w-1/2 lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl rounded-lg p-6 bg-slate-100 shadow-md hover:bg-red-100 hover:shadow-red-300">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={uzair}
                />
                <p className="leading-relaxed">
                  Passionate about designing seamless user experiences. Uzair
                  specializes in crafting beautiful UI/UX designs, focusing on
                  creating user-friendly and visually appealing interfaces.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-red-500 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  Uzair Ali
                </h2>
                <p className="text-gray-500">Project Designer</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <Content />
    </>
  );
};

export default About;
