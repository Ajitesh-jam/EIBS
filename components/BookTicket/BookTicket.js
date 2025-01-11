'use client'
import React, { useState, useEffect } from 'react';
import './BookTicket.css';
import Navbar from '../Navbar/Navbar';
import GetStarted from '../GetStarted/GetStarted';
import { getAccounts, checkMetaMaskLogin } from '../utils/web3';
import { useLogin } from '@/contexts/loginContext';
import Button from '../Button/Button';
import InputBox from '../InputBox/InputBox';
import { useSearchParams } from 'next/navigation';

const BookTicket = () => {
    const [showModal, setShowModal] = useState(false);
    const { setIsLoggedIn, setPublicAddress, publicAddress } = useLogin();
    const [ticketCount, setTicketCount] = useState(1);
    const [publicAddresses, setPublicAddresses] = useState([]);
    const searchParams = useSearchParams();
    const eventData = searchParams.get('event');
    const event = eventData ? JSON.parse(eventData) : null;

    if (!event) {
        return <p>Loading...</p>;
    }

    const booktickets = () => {
        console.log("Book Tickets", publicAddresses);
    };

    useEffect(() => {
        const checkLogin = async () => {
            const loggedIn = await checkMetaMaskLogin();
            setIsLoggedIn(loggedIn);
            if (loggedIn) setPublicAddress(await getAccounts());
        };

        checkLogin();
    }, []);

    const openProfile = () => {
        console.log("opening Profile");
    };

    const handleLogin = async () => {
        const publicAddress = await getAccounts();
        setPublicAddress(publicAddress);
        setIsLoggedIn(true);
        setShowModal(!showModal);
    };

    const toggleGetStartedModal = () => {
        setShowModal(!showModal);
    };

    // Update the number of public address inputs when ticket count changes
    useEffect(() => {
        setPublicAddresses(Array(ticketCount).fill(''));
    }, [ticketCount]);

    const handleAddressChange = (index, value) => {
        const updatedAddresses = [...publicAddresses];
        updatedAddresses[index] = value;
        setPublicAddresses(updatedAddresses);
    };

    return (
        <div className='BT-Container'>
            <Navbar toggleGetStartedModal={toggleGetStartedModal} openProfile={openProfile} />
            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <GetStarted handleLogin={handleLogin} />
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
                        <p>Enter number of tickets:</p>
                        <InputBox
                            setInput={(value) => setTicketCount(Math.max(Number(value), 1))}
                            placeholder={String(ticketCount)}
                        />
                    </div>
                    <div className='PublicAddresses'>
                        <p>Enter Public Addresses:</p>
                        {publicAddresses.map((address, index) => (
                            <InputBox
                                key={index}
                                setInput={(value) => handleAddressChange(index, value)}
                                placeholder={index === 0 ? publicAddress : `Public Address ${index + 1}`}
                                value={address}
                            />
                        ))}
                    </div>
                    <div className='TotalCost'>
                        <p>Total:</p>
                    </div>
                    <div className='bookingbtn'>
                        <Button btnText="Confirm Booking" onClick={booktickets} />
                    </div>
                </div>
                <div className='InfoSection'>
                    <div className='EventImg'>
                        <div className="event-image">
                            {event.img ? (
                                <img
                                    src={event.img}
                                    alt="Event"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            ) : (
                                "Image Placeholder"
                            )}
                        </div>
                    </div>
                    <p className='EventName'>{event.name}</p>
                    <div className='EventDetails'>
                        <p className='EventDate'>Date</p>
                        <p>{event.date}</p>
                    </div>

                    <p className='EventTime'>Timing</p>
                    <p className='EventVenue'>Venue</p>
                    <div className='MapLocation'>
                        {event.location ? (
                            <iframe
                                src={event.location}
                                width="100%"
                                height="100%"
                                allowFullScreen=""
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        ) : (
                            "Location not available"
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BookTicket;
