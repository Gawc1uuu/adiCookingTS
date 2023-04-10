import React, { useState } from "react";
import dark from "../assets/dark.svg";
import light from "../assets/light.svg";
import { useAuthContext } from "../hooks/useAuthContext";

const DarkModeToggle = () => {
  const { state } = useAuthContext();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const modeToggleHandler = (e: React.MouseEvent) => {
    setIsDarkMode((prevState) => {
      return !prevState;
    });
    document.body.classList.toggle("dark");
  };
  return (
    <button
      onClick={modeToggleHandler}
      id="theme-toggle"
      className={`absolute right-20 top-5 w-8 h-8   hover:bg-pink-500 focus:ring-2 focus:ring-pink-500  hover:dark:bg-pink-500 focus:dark:ring-4 focus:dark:ring-pink-500 p-1 rounded-lg ${
        state.user ? "md:right-32" : "md:right-56"
      } `}
    >
      <img
        className="invert-[100%]"
        src={isDarkMode ? light.toString() : dark.toString()}
        alt="mode toggle"
      />
    </button>
  );
};

export default DarkModeToggle;
