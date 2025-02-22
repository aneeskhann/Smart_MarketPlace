import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="flex flex-col bg-gray-100 lg:flex-row justify-center items-start w-full min-h-screen px-6 py-16">
      {/* Chatbot Section */}
      <div className="lg:w-1/2 w-full bg-white rounded-lg shadow-lg p-8 transition-transform duration-300 hover:shadow-2xl hover:shadow-red-400 hover:-translate-y-2">
        <h2 className="text-gray-900 text-2xl font-bold mb-4 text-center">
          🤖 Chat with our AI Assistant
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          Have questions? Our AI chatbot is here to assist you!
        </p>

        {/* Chatbot Placeholder */}
        <div className="w-full h-96 bg-gray-100 rounded-lg shadow-md flex items-center justify-center">
          <p className="text-gray-500">Chatbot will be placed here...</p>
        </div>
      </div>

      {/* Spacing between sections */}
      <div className="hidden lg:block w-10"></div>

      {/* Feedback Form Section */}
      <div className="lg:w-1/3 w-full bg-white rounded-lg shadow-lg p-8 transition-transform duration-300 hover:shadow-2xl hover:shadow-red-600 hover:-translate-y-2">
        <h2 className="text-gray-900 text-2xl font-bold mb-3 text-center">
          ✨ Feedback Form
        </h2>
        <p className="text-gray-600 mb-5 text-center">
          We value your feedback! Let us know your thoughts.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              className="w-full bg-transparent border border-gray-300 focus:ring-2 focus:ring-red-400 focus:border-red-400 text-base py-2 px-4 rounded-lg outline-none transition duration-200"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="w-full bg-transparent border border-gray-300 focus:ring-2 focus:ring-red-400 focus:border-red-400 text-base py-2 px-4 rounded-lg outline-none transition duration-200"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Message</label>
            <textarea
              name="message"
              className="w-full bg-transparent border border-gray-300 focus:ring-2 focus:ring-red-400 focus:border-red-400 text-base py-2 px-4 h-32 rounded-lg outline-none transition duration-200 resize-none"
              onChange={handleChange}
              value={formData.message}
              required
            ></textarea>
          </div>

          <button className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition">
            🚀 Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
