'use client'
import React, { useState, useEffect } from 'react'
import './BookTicket.css'
import Navbar from '../Navbar/Navbar'
import GetStarted from '../GetStarted/GetStarted';
import { getAccounts, checkMetaMaskLogin } from '../utils/web3';
import { useLogin } from '@/contexts/loginContext'
import Button from '../Button/Button';

const BookTicket = () => {
    const [showModal, setShowModal] = useState(false);
    const { setIsLoggedIn, setPublicAddress } = useLogin();

    const booktickets = () => {
        console.log("Book Tickets");
    }

    useEffect(() => {
        const checkLogin = async () => {
            const loggedIn = await checkMetaMaskLogin();
            setIsLoggedIn(loggedIn);
            if (loggedIn) setPublicAddress(await getAccounts);
        };

        checkLogin();
    }, []);

    const openProfile = () => {
        console.log("opening Profile");
    }

    const handleLogin = async () => {
        const publicAddress = await getAccounts();
        setPublicAddress(publicAddress);
        setIsLoggedIn(true);
        setShowModal(!showModal);
    }

    const toggleGetStartedModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className='BT-Container'>
            <Navbar toggleGetStartedModal={toggleGetStartedModal} openProfile={openProfile} />
            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <GetStarted
                            handleLogin={handleLogin} />
                        <button className="close-button" onClick={toggleGetStartedModal}>
                            X
                        </button>
                    </div>
                </div>
            )}
            <div className='BT-Heading'><h1>Book your tickets</h1></div>
            <div className='BT-Content'>
                <div className='BillSection'>
                    <div className='TicketCount'>
                        <p>Enter number of tickets : </p>
                    </div>
                    <div className='PublicAddresses'>
                        <p>Enter Public Addresses :</p>
                    </div>
                    <div className='TotalCost'>
                        <p>Total  : </p>
                    </div>
                    <div className='bookingbtn'>
                    <Button btnText="Confirm Booking"/>
                    </div>
                    

                </div>
                <div className='InfoSection'>
                    <div className='EventImg'>
                        {/* Image of the event  */}
                    </div>
                    <p className='EventName'>Hello this is an event, lessss goooooo</p>
                    <p className='EventDate'>Date</p>
                    <p className='EventTime'>Timing</p>
                    <p className='EventVenue'>Venue</p>
                    <div className='MapLocation'></div>
                </div>
            </div>

        </div>
    )
}

export default BookTicket