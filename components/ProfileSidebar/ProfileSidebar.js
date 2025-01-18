'use client'
import React, { useEffect, useState } from 'react';
import './ProfileSidebar.css';
import Button from '../Button/Button';
import QRCodeGenerator from './QRcodegenerator';
import { checkMetaMaskLogin, getAccounts } from '../utils/web3';
import CopyNotification from '../CopyClipboard/CopyClipboard';
import ConnectSpotify from '../ConnectSpotify/ConnectSpotify';
import { useLogin } from '@/contexts/loginContext';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';

const ProfileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCopyNotification, setShowCopyNotification] = useState(false);
    const {isLoggedIn, publicAddress, role, isSpotifyAuthenticated, dispatch} = useLogin();
    const [user, loading, error] = useAuthState(auth);
    const Router = useRouter();
    console.log("public address in context :" , publicAddress);
    
    console.log("isloggedIn",isLoggedIn);

    const copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.value = publicAddress;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        // Show notification
        setShowCopyNotification(true);

        // Hide notification after 2 seconds
        setTimeout(() => {
            setShowCopyNotification(false);
        }, 2000);

    }

    // const fetchAddress = async () => {
    //     const address = await getAccounts();
    //     setpAddress(address);
    // }
    // useEffect(() => {
    //     fetchAddress();
    // }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
    };

    const showTickets = () => {
        if(role === "Fan"){
            
        } 
        else {

        }
    }
    const logout =()=>{
        signOut(auth);
    }

     const handleMetamask = async () => {
        try {
          // Trigger the login process
                  const publicAddress = await getAccounts();
                  const checkLogin = await checkMetaMaskLogin();
                  console.log("checkLogin",checkLogin);

                  dispatch({ type: 'SET_LOGGED_IN', payload: checkLogin });
                  dispatch({ type: 'SET_PUBLIC_ADDRESS', payload: publicAddress });
                 
                  
                  //refresh the page 
                Router.replace('/');
          // Check if the login was successful 
        } catch (error) {
          console.error("Error during MetaMask login:", error);
        }
      };
    
    return (
        <>
            <Button btnText="Profile" onClickFunction={toggleSidebar} />
            <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>

            <div className={`sidebar ${isOpen ? 'active' : ''}`}>
                <div className="sidebar-content">
                    <div className='Greeting'>
                        <h1>Hello there! {user.displayName}</h1>
                        <div onClick={toggleSidebar}><span>X</span></div>
                    </div>
                   {isLoggedIn && 
                   <>
                    <div><h3>Here's your Public Address</h3></div>
                    <div className='PublicAddress'>
                        <div className='Address'>{publicAddress}</div>
                        <div className='CopyClipboard' title='Copy to clipboard' onClick={copyToClipboard}>
                            <img src="./Images/copy.png" />
                        </div>
                    </div>


                    <div className='OR'><div className='Line' />OR<div className='Line' /></div>
                    <div className='QRSection'>
                        <div className='ScanQRtext'><h3>Scan the QR to get your public Address</h3></div>
                        <div className='QRCodeContainer'>
                            <QRCodeGenerator publicAddress={String(publicAddress)} />
                        </div>
                    </div>
                   </>
                    }
                    {!isLoggedIn &&
                    <>
                    <h1 className="title " style={{ fontSize: 30 }}>
                {user.displayName}, let's connect your wallet
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
                    </>}
                    <ConnectSpotify />
                    <div className='mytickets' onClick={showTickets}>
                        My {role==="Fan"? "Tickets" : "Events"}
                    </div>
                    <div className=' logout' onClick={logout}>
                        Logout
                    </div>
                </div>
            </div>
            <CopyNotification isVisible={showCopyNotification} />
        </>
    );
};

export default ProfileSidebar;
