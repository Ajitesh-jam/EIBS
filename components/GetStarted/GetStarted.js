import React, { useState, useEffect } from "react";
import "./GetStarted.css";
import Button from "../Button/Button";
import { setUserRole } from "../utils/role";
import InputBox from "../InputBox/InputBox";

const GetStarted = ({ handleLogin, setShowModal}) => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleMetamask = async () => {
    try {
      // Trigger the login process
      const loginSuccess = await handleLogin();

      // Check if the login was successful
      if (loginSuccess) {
        nextStep(); // Proceed to the next step after successful login
      } else {
        console.error("MetaMask login failed.");
      }
    } catch (error) {
      console.error("Error during MetaMask login:", error);
    }
  };

  const sendOTP = () => {
    // Send OTP to the phone number
    // Proceed to the next step
    nextStep();
  }

  const verifyOTP = () => {
    //verify the otp
    setShowModal(false);
  }

  return (
    <div className="get-started-container">
      {(step === 1) && (
        <>
          <h1 className="title">Log in as</h1>
          <div className="role-selection">
            <Button btnText="Artist" onClickFunction={() => {
              setUserRole('Artist');
              nextStep();
            }} />
            <Button btnText="Fan <3" onClickFunction={() => {
              setUserRole('Fan');
              nextStep();
            }} />
          </div>
        </>

      )}
      {step === 2 && (
        <>
          <h1 className="title">Connect your wallet</h1>
          <div className="login-option-metamask" onClick={handleMetamask}>
            <p>Connect MetaMask</p>
            <div className="MetaMask-logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                alt="MetaMask Logo"
              />
            </div>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <h1 className="title">Phone Number</h1>
          <div>
            <InputBox placeholder="Enter Phone Number" width="100%" setInput={setPhoneNumber} />
            <Button btnText="Send OTP" onClickFunction={nextStep} />
          </div>
        </>
      )}
      {step === 4 && (
        <>
          <h1 className="title">OTP</h1>
          <div>
            <InputBox placeholder="Enter OTP" width="100%" setInput={setOtp}/>
            <Button btnText="Verify" onClickFunction={verifyOTP} />
          </div>
        </>
      )}
    </div>
  );
};

export default GetStarted;
