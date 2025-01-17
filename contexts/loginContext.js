'use client'

import React, { createContext, useState, useContext, useEffect } from "react";
import { getAccounts } from "@/components/utils/web3";

// Create the context
const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default login state is false
  const [publicAddress, setPublicAddress] = useState('');
  const [role,setRole] = useState('');
  // Spotify auth states
  const [isSpotifyAuthenticated, setIsSpotifyAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if the user is logged in
    const checkLoginStatus = async () => {
      try {
        const accounts = await getAccounts();
        if (accounts.length > 0) {
          setIsLoggedIn(true);
          setPublicAddress(accounts[0]);
        } else {
          setIsLoggedIn(false);
          setPublicAddress('');
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
      const checkSpotifyAuthStatus = async () => {
          try {
              const response = await fetch('/api/spotify/auth-status');
              const data = await response.json();
              setIsSpotifyAuthenticated(data.isSpotyAuthenticated);
          } catch (error) {
              console.error('Error checking Spotify auth status:', error);
          }
      };
      checkSpotifyAuthStatus();
  },[]);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole);
    }
  },[]);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setPublicAddress,
        publicAddress,
        role,
        isSpotifyAuthenticated,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook for consuming the context
export const useLogin = () => useContext(LoginContext);
