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
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-around">
            {/* First Section */}
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={aneess}
                />
                <p className="leading-relaxed">
                  Building interactive and responsive user interfaces.
                  Continuously learning and staying updated with the latest
                  trends and best practices in React development, Anees is
                  eager to contribute to projects and deliver high-quality
                  React-based solutions.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-red-500 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  Muhammad Anees
                </h2>
                <p className="text-gray-500">UI Developer</p>
              </div>
            </div>

            {/* Second Section */}
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
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
                <p className="text-gray-500">Frontend Developer</p>
              </div>
            </div>

            {/* Third Section */}
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={uzair}
                />
                <p className="leading-relaxed">
                  Passionate about designing seamless user experiences. uzair
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
