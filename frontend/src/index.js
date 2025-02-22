import React from "react";
import ReactDOM from "react-dom/client";
import "tailwindcss/tailwind.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./clerkConfig"; // Ensure this correctly provides authentication context


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <React.StrictMode>
      <AuthWrapper>
      <BrowserRouter>
      <App />
      </BrowserRouter>
      </AuthWrapper>
    </React.StrictMode>
  
);





