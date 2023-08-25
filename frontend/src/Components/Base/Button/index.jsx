import React from "react";
import "./style.css";

const Button = ({ text, color, textColor, onClick, enabled = true }) => {
  const clickHandler = () => {
    if (enabled) {
      onClick();
    }
  };

  return (
    <button
      className={`roundedMedium baseButton pointer ${color} ${textColor}`}
      onClick={() => clickHandler()}
    >
      {text}
    </button>
  );
};

export default Button;
