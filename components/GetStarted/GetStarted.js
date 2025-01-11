import React, {useEffect} from "react";
import "./GetStarted.css";
import Button from "../Button/Button";


const GetStarted = ({handleLogin}) => {
  return (
    <div className="get-started-container">
      <h1 className="title">Get Started</h1>

      <div className="login-option-metamask" onClick={handleLogin}>
        <p>Log in with MetaMask</p>
        <div className="MetaMask-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"></img>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
