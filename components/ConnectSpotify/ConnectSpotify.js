import React from 'react';
import './ConnectSpotify.css';
import { signIn, useSession } from "next-auth/react";
// import SpotifyLogo from './Images/SpotifyLogo.png'; // Save the logo as 'spotify-logo.svg' in the same folder.

const ConnectSpotify = () => {
    // const { data: session } = useSession();
    const handleLogin = () => {
        // Trigger Spotify sign-in via NextAuth
        signIn("spotify");
      };

  return (
    <div onClick={handleLogin} className="spotify-button">
      <img src="./Images/SpotifyLogo.png" alt="Spotify Logo" className="spotify-logo" />
      Link Your Spotify
    </div>
  );
};

export default ConnectSpotify;
