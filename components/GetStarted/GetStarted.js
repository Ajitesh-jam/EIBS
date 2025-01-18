import React, { useState, useEffect } from "react";
import "./GetStarted.css";
import Button from "../Button/Button";
import { setUserRole } from "../utils/role";
import InputBox from "../InputBox/InputBox";
import { auth } from "@/app/firebase/config";
import {
  useSignInWithGoogle,
  useSignInWithFacebook,
} from "react-firebase-hooks/auth";
import { getAccounts } from "../utils/web3Final";
import { useLogin } from "@/contexts/loginContext";

const GetStarted = ({ setShowModal }) => {
  const [step, setStep] = useState(1);

  const [signInWithGoogle, user, error, loading] = useSignInWithGoogle(auth);
  const [signInWithFacebook] = useSignInWithFacebook(auth);
  const { isLoggedIn, dispatch } = useLogin();
  console.log("user", user);
  console.log("step", step);
  const nextStep = () => {
    setStep(step + 1);
  };

  const handleMetamask = async () => {
    try {
      // Trigger the login process
      const publicAddress = await getAccounts();
      dispatch({ type: "SET_PUBLIC_ADDRESS", payload: publicAddress[0] });
      // Check if the login was successful
      nextStep(); // Proceed to the next step after successful login
    } catch (error) {
      console.error("Error during MetaMask login:", error);
    }
  };

  return (
    <div className="get-started-container">
      {step === 1 && (
        <>
          <h1 className="title">Log in as</h1>
          <div className="role-selection">
            <Button
              btnText="Artist"
              onClickFunction={() => {
                setUserRole("Artist");
                nextStep();
              }}
            />
            <Button
              btnText="Fan <3"
              onClickFunction={() => {
                setUserRole("Fan");
                nextStep();
              }}
            />
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <h1 className="title">Sign In</h1>
          {error && <p className="error">{error}</p>}
          {loading && <p className="loading">Loading...</p>}
          <div className="google-sign-in  my-3 ">
            {/* <InputBox placeholder="Enter Phone Number" width="100%" setInput={setPhoneNumber} /> */}
            <Button
              btnText="Login With Google "
              onClickFunction={() => {
                signInWithGoogle()
                  .then(() => {
                    nextStep();
                  })
                  .catch((error) => {
                    console.error("Google sign-in error:", error);
                  });
              }}
            />
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h1 className="title " style={{ fontSize: 30 }}>
            {user.user.displayName}, let's connect your wallet
          </h1>
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
      {step === 4 && (
        <>
          <h1 className="title " style={{ fontSize: 30 }}>
            Wallet connected successfully !!
          </h1>
          <Button btnText="Continue" onClickFunction={() => setShowModal(false)} />
        </>
      )}
    </div>
  );
};

export default GetStarted;
