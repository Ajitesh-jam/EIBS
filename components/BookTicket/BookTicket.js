
'use client';
import React, { useState, useEffect } from 'react';
import './BookTicket.css';
import Navbar from '../Navbar/Navbar';
import GetStarted from '../GetStarted/GetStarted';
//import { getAccounts, checkMetaMaskLogin, buyMultipleTickets, checkTicketOwnership } from '../utils/web3';
import { getAccounts, checkMetaMaskLogin, addBuyersToQueue, checkTicketOwnership } from '../utils/web3Final';
import { useLogin } from '@/contexts/loginContext';
import Button from '../Button/Button';
import InputBox from '../InputBox/InputBox';
import { useSearchParams } from 'next/navigation';
import TransactionStatus from '../TransactionStatus/TransactionStatus';

import { calculateFanScore } from '../utils/fanScore';
const BookTicket = () => {
    const [showModal, setShowModal] = useState(false);

    const { isLoggedIn, publicAddress, role, isSpotifyAuthenticated, dispatch } = useLogin();
    const [ticketCount, setTicketCount] = useState(1);
    const [buyers, setBuyers] = useState(['']);
    const [transactionStatus, setTransactionStatus] = useState(null);
    const [showTransactionAlert, setShowTransactionAlert] = useState(false);
    const searchParams = useSearchParams();
    const eventData = searchParams.get('event');
    const event = eventData ? JSON.parse(eventData) : null;

    const [costPerTicket, setCostPerTicket] = useState(BigInt(0)); // Store ticket price as BigInt


    if (!event) {
        return <p>Loading...</p>;
    }

    const bookTickets = async () => {
        try {
            // Show pending transaction message
            setTransactionStatus('pending');
            setShowTransactionAlert(true);

            let hasTicket = false;
            // Check ticket ownership
            for (let i = 0; i < buyers.length; i++) {
                const buyer = buyers[i];
                hasTicket = await checkTicketOwnership(event.index, buyer);
                if (hasTicket) {
                    console.log(`${buyer} has a ticket for the event ${event.index}`);
                    break;
                }
            }

            if (!hasTicket) {
                const totalCost = Math.floor(costPerTicket);
                const eventId = event.index;

                // Call the smart contract function
                //const response = await buyMultipleTickets(buyers, eventId, totalCost.toString());
                const fanScore = await

                // Show success message
                setTransactionStatus('success');
                console.log('Tickets bought successfully:', response);
            } else {
                setTransactionStatus('AlreadyOwnsTicket');
                console.log("One of the buyers already has a ticket for the event");
            }
        } catch (error) {
            // Show refused message if transaction fails or is cancelled
            setTransactionStatus('refused');
            console.error('Error buying tickets:', error.message);
        }
    };

    // useEffect(() => {
    //     const checkLogin = async () => {
    //         const loggedIn = await checkMetaMaskLogin();
    //         dispatch({ type: 'SET_LOGGED_IN', payload: loggedIn });
    //         const accounts = await getAccounts();
    //         if (loggedIn && accounts.length > 0) {
    //             setBuyers((prev) => [accounts[0], ...prev.slice(1)]);
    //         }
    //         setCostPerTicket(event.ticketPrice / event.ticketsLeft);
    //     };

    //     checkLogin();

    // }, []);

    // const handleLogin = async () => {
    //     const accounts = await getAccounts();
    //     setPublicAddress(accounts[0]);
    //     setIsLoggedIn(true);
    //     setBuyers((prev) => [accounts[0], ...prev.slice(1)]);
    //     setShowModal(false);
    // };

    // const toggleGetStartedModal = () => {
    //     setShowModal(!showModal);
    // };

    // Update the buyers array when ticket count changes
    useEffect(() => {
        setBuyers((prev) => {
            const filledBuyers = [...prev];
            while (filledBuyers.length < ticketCount) {
                filledBuyers.push('');
            }
            return filledBuyers.slice(0, ticketCount);
        });

        setCostPerTicket(ticketCount * event.ticketPrice / event.ticketsLeft);
    }, [ticketCount]);

    const handleAddressChange = (index, value) => {
        const updatedBuyers = [...buyers];
        updatedBuyers[index] = value;
        setBuyers(updatedBuyers);

    };

    function formatDate(dateInt) {
        // Convert the integer to a string for easier manipulation
        const dateStr = dateInt.toString();

        // Extract day, month, and year
        const day = parseInt(dateStr.slice(0, -6), 10); // First 1-2 digits
        const month = parseInt(dateStr.slice(-6, -4), 10); // Next 2 digits
        const year = parseInt(dateStr.slice(-4), 10); // Last 4 digits

        // Convert month number to month name
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        return `${day} ${monthNames[month - 1]} ${year}`;
    }

    return (
        <div className="BT-Container" >
            <div className="BT-Heading">
                <h1>Book your tickets</h1>
            </div>
            <div className="BT-Content">
                <div className="BillSection">
                    <div className="TicketCount">
                        <p>Enter number of tickets:</p>
                        <InputBox
                            setInput={(value) => setTicketCount(Math.max(Number(value), 1))}
                            placeholder={String(ticketCount)}
                        />
                    </div>
                    <div className="PublicAddresses">
                        <p>Enter Public Addresses:</p>
                        {buyers.map((address, index) => (
                            <InputBox
                                key={index}
                                setInput={(value) => handleAddressChange(index, value)}
                                placeholder={
                                    index === 0 ? buyers[0] : `Public Address ${index + 1}`
                                }
                                value={address}
                                disabled={index === 0} // Make the fetched address immutable
                            />
                        ))}
                    </div>
                    <div className="TotalCost">
                        <span>Total:</span>
                        <span>   {costPerTicket} WEI</span>
                    </div>
                    <div className="bookingbtn">
                        <Button btnText="Confirm Booking" onClickFunction={bookTickets} />
                    </div>
                </div>
                <div className="InfoSection">
                    <div className="EventImg">
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
                    <p className="EventName">{event.name}</p>
                    <div className="EventDetails">
                        <p className="EventDate">Date</p>
                        <p>:   {formatDate(event.date)}</p>
                    </div>
                    <div className="EventDetails"> <p className="EventTime">Timing</p>:   6 PM Onwards </div>

                    <div className="EventDetails">  <p className="EventVenue">Venue</p>:     <a href={event.location}>Location</a>   </div>
                    <div className="MapLocation">

                        {event.location ? (
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29526.789503745054!2d87.3037824!3d22.3215616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d447486474c37%3A0xe555d6d0f6a223a7!2sBombay%20Cineplex!5e0!3m2!1sen!2sin!4v1736593573156!5m2!1sen!2sin"
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
            <TransactionStatus
                isOpen={showTransactionAlert}
                status={transactionStatus}
                onClose={() => setShowTransactionAlert(false)}
            />
        </div>
    );
};

export default BookTicket;
