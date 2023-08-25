import React from "react";
import "./style.css";

const Input = ({ onChange, label, placeholder, type = "text" }) => {
  return (
    <div className="flex column baseInput">
      <label>{label}</label>
      <input
        className="roundedSmall"
        type={type}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
