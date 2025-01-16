import React from 'react';
import './ConnectSpotify.css';

const ConnectSpotify = () => {
    const handleLogin = async () => {
        try {
            // Redirect to the login API route that initiates the Spotify authentication flow
            const response = await fetch('/api/spotify/login');
            const data = await response.json();
            
            // Redirect the user to Spotify's login page
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Spotify login URL not found');
            }
        } catch (error) {
            console.error('Error redirecting to Spotify login:', error);
        }
    };

    return (
        <div onClick={handleLogin} className="spotifyBtnContainer">
            <button onClick={handleLogin} className='spotbtn'>
            </button>
            Link your
            <div className='SpotLogoContainer'>
                <img src='./Images/SpotifyLogo.png' alt='Spotify' />
            </div>
        </div>
    );
};

export default ConnectSpotify;
