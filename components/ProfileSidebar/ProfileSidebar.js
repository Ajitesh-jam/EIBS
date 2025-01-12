'use client'
import React, { useEffect, useState } from 'react';
import './ProfileSidebar.css';
import Button from '../Button/Button';
import QRCodeGenerator from './QRcodegenerator';
import { getAccounts } from '../utils/web3';

const ProfileSidebar = ({publicAddress}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [paddress, setpAddress] = useState('');

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
                        {/* copy to clipboard btn */}
                        
                    </div>
                    <div className='OR'><div className='Line'/>OR<div className='Line'/></div>
                    <div className='QRCodeContainer'>
                        <QRCodeGenerator publicAddress={String(paddress)} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileSidebar;
