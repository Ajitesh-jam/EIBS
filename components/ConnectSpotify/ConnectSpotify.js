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
    <div onClick={handleLogin} className="spotifyBtnContainer">
      <button onClick={handleLogin} className='spotbtn'>
      </button>
      Link your
      <div className='SpotLogoContainer'>
            <img src='./Images/SpotifyLogo.png' alt='Spotify'/>
        </div>
    </div>
  );
};

export default ConnectSpotify;
