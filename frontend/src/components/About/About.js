import React from "react";
import { Link } from "react-router-dom";
import faizan from "../../Assets/faizan.jpg";
import Content from "./Content";

const About = () => {
  return (
    <>
    <Link to={"/about"} class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4 justify-around">
          <div class="lg:w-1/3 lg:mb-0 mb-6 p-4">
            <div class="h-full text-center">
              <img
                alt="testimonial"
                class="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                src={faizan}
              />
              <p class="leading-relaxed">
                building interactive and responsive user interfaces.
                Continuously learning and staying updated with the latest trends
                and best practices in React development, Faizan is eager to
                contribute to projects and deliver high-quality React-based
                solutions.
              </p>
              <span class="inline-block h-1 w-10 rounded bg-red-500 mt-6 mb-4"></span>
              <h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">
                Faizan
              </h2>
              <p class="text-gray-500">UI Develeoper</p>
            </div>
          </div>
          <div class="lg:w-1/3 lg:mb-0 p-4">
            <div class="h-full text-center">
              <img
                alt="testimonial"
                class="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                src="https://dummyimage.com/305x305"
              />
              <p class="leading-relaxed">
                Building Logics and bringing the website to life. Fawad is a Backend Developer that has urge to learn more about building projects on react.
              </p>
              <span class="inline-block h-1 w-10 rounded bg-red-500 mt-6 mb-4"></span>
              <h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">
                Fawad Iqbal
              </h2>
              <p class="text-gray-500">Backend Developer</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
    <Content/>
    </>
  );
};

export default About;
