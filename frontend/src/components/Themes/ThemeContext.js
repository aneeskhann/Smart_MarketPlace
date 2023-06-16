import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClass = isDarkMode ? "dark" : "";

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`app ${themeClass}`} >
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
