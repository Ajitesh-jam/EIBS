import React from "react";
import "./Button.css";

const Button = ({ btnText, onClickFunction }) => {
  return (
    <div className="button-container">
      <button className="button" onClick={onClickFunction}>
        {btnText}
      </button>
    </div>
  );
};

export default Button;
