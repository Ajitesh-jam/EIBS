'use client'

import React, { createContext, useState, useContext } from "react";
import { getAccounts } from "@/components/utils/web3";


// Create the context
const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default login state is false
  const [publicAddress, setPublicAddress] = useState('');

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, setPublicAddress,publicAddress}}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook for consuming the context
export const useLogin = () => useContext(LoginContext);
