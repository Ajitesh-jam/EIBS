'use client'

import React, { createContext, useState, useContext, useEffect } from "react";
import { getAccounts } from "@/components/utils/web3";

// Create the context
const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default login state is false
  const [publicAddress, setPublicAddress] = useState('');
  
  // Spotify auth states
  const [isSpotifyAuthenticated, setIsSpotifyAuthenticated] = useState(false);
  const [spotifyProfile, setSpotifyProfile] = useState(null);
  

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setPublicAddress,
        publicAddress,
        isSpotifyAuthenticated,
        spotifyProfile,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook for consuming the context
export const useLogin = () => useContext(LoginContext);
