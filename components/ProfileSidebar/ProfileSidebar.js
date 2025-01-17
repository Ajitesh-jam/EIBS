'use client'
import React, { useEffect, useState } from 'react';
import './ProfileSidebar.css';
import Button from '../Button/Button';
import QRCodeGenerator from './QRcodegenerator';
import { getAccounts } from '../utils/web3';
import CopyNotification from '../CopyClipboard/CopyClipboard';
import ConnectSpotify from '../ConnectSpotify/ConnectSpotify';
import { useLogin } from '@/contexts/loginContext';

const ProfileSidebar = ({ publicAddress }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [paddress, setpAddress] = useState('');
    const [showCopyNotification, setShowCopyNotification] = useState(false);
    const {role} = useLogin();
    const copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.value = paddress;
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

    useEffect(() => {
        const fetchAddress = async () => {
            const address = await getAccounts();
            setpAddress(address);
        }
        fetchAddress();
    }, []);

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

    return (
        <>
            <Button btnText="Profile" onClickFunction={toggleSidebar} />
            <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>

            <div className={`sidebar ${isOpen ? 'active' : ''}`}>
                <div className="sidebar-content">
                    <div className='Greeting'>
                        <h1>Hello there!</h1>
                        <div onClick={toggleSidebar}><span>X</span></div>
                    </div>
                    <div><h3>Here's your Public Address</h3></div>
                    <div className='PublicAddress'>
                        <div className='Address'>{paddress}</div>
                        <div className='CopyClipboard' title='Copy to clipboard' onClick={copyToClipboard}>
                            <img src="./Images/copy.png" />
                        </div>


                    </div>
                    <div className='OR'><div className='Line' />OR<div className='Line' /></div>
                    <div className='QRSection'>
                        <div className='ScanQRtext'><h3>Scan the QR to get your public Address</h3></div>
                        <div className='QRCodeContainer'>
                            <QRCodeGenerator publicAddress={String(paddress)} />
                        </div>
                    </div>
                    <ConnectSpotify />
                    <div className='mytickets' onClick={showTickets}>
                        My {role==="Fan"? "Tickets" : "Events"}
                    </div>
                </div>
            </div>
            <CopyNotification isVisible={showCopyNotification} />
        </>
    );
};

export default ProfileSidebar;
