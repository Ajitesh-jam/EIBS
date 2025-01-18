'use client'

import { getAccounts } from "@/components/utils/web3Final";
import React, { createContext, useState, useContext, useEffect, useReducer } from "react";
// import { getAccounts } from "@/components/utils/web3";

// Create the context
const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
  const initialState = {
    isLoggedIn: false,
    publicAddress: '',
    role: '',
    isSpotifyAuthenticated: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_LOGGED_IN':
        return { ...state, isLoggedIn: action.payload };
      case 'SET_PUBLIC_ADDRESS':
        return { ...state, publicAddress: action.payload };
      case 'SET_ROLE':
        return { ...state, role: action.payload };
      case 'SET_SPOTIFY_AUTH':
        return { ...state, isSpotifyAuthenticated: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const accounts = await getAccounts();
        if (accounts.length > 0) {
          dispatch({ type: 'SET_LOGGED_IN', payload: true });
          dispatch({ type: 'SET_PUBLIC_ADDRESS', payload: accounts[0] });
        } else {
          dispatch({ type: 'SET_LOGGED_IN', payload: false });
          dispatch({ type: 'SET_PUBLIC_ADDRESS', payload: '' });
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
        dispatch({ type: 'SET_SPOTIFY_AUTH', payload: data.isSpotyAuthenticated });
      } catch (error) {
        console.error('Error checking Spotify auth status:', error);
      }
    };
    checkSpotifyAuthStatus();
  }, []);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      dispatch({ type: 'SET_ROLE', payload: storedRole });
    }
  }, []);

  return (
    <LoginContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook for consuming the context
export const useLogin = () => useContext(LoginContext);
