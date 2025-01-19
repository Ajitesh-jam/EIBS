'use client';
import React, { useState, useEffect } from 'react';
import './BookTicket.css';
import Navbar from '../Navbar/Navbar';
import GetStarted from '../GetStarted/GetStarted';
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
    const [buyers, setBuyers] = useState([publicAddress]); // Initialize with publicAddress
    const [transactionStatus, setTransactionStatus] = useState(null);
    const [showTransactionAlert, setShowTransactionAlert] = useState(false);
    const searchParams = useSearchParams();
    const eventData = searchParams.get('event');
    const event = eventData ? JSON.parse(eventData) : null;
    const [bill, setBill] = useState(0);

    // Calculate bill whenever ticket count changes
    useEffect(() => {
        if (event && event.ticketPrice) {
            const totalBill = ticketCount * event.ticketPrice;
            setBill(totalBill);
        }
    }, [ticketCount, event]);

    // Update buyers array when ticket count changes
    useEffect(() => {
        if (ticketCount > buyers.length) {
            // Add new empty addresses while preserving existing ones
            setBuyers(currentBuyers => [
                ...currentBuyers,
                ...Array(ticketCount - currentBuyers.length).fill('')
            ]);
        } else if (ticketCount < buyers.length) {
            // Remove excess addresses while preserving the first one
            setBuyers(currentBuyers => currentBuyers.slice(0, ticketCount));
        }
    }, [ticketCount]);

    // Update initial buyer with publicAddress when it changes
    useEffect(() => {
        if (publicAddress) {
            setBuyers(currentBuyers => [
                publicAddress,
                ...currentBuyers.slice(1)
            ]);
        }
    }, [publicAddress]);

    if (!event) {
        return <p>Loading...</p>;
    }

    const bookTickets = async () => {
        try {
            setTransactionStatus('pending');
            setShowTransactionAlert(true);

            let hasTicket = 0;
            for (let i = 0; i < buyers.length; i++) {
                const buyer = buyers[i];
                hasTicket = await checkTicketOwnership(event.id, buyer);
                
                if (hasTicket == 1) {
                    console.log(`${buyer} has a ticket for the event ${event.id}`);
                    break;
                }
                console.log(`${hasTicket} has a ticket for the event ${event.id}`);
                
            }

            if (hasTicket==0 || hasTicket==2) {
                console.log(`Buying tickets for ${buyers.length} buyers...`);
                setTransactionStatus('success');
            } 
           
            else {
                setTransactionStatus('AlreadyOwnsTicket');
                console.log("One of the buyers already has a ticket for the event");
            }
        } catch (error) {
            setTransactionStatus('refused');
            console.error('Error buying tickets:', error.message);
        }
    };

    const handleAddressChange = (index, value) => {
        setBuyers(currentBuyers => {
            const newBuyers = [...currentBuyers];
            newBuyers[index] = value;
            return newBuyers;
        });
    };

    return (
        <div className="BT-Container">
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
                                placeholder={index === 0 ? publicAddress : `Public Address ${index + 1}`}
                                value={address}
                                disabled={index === 0}
                            />
                        ))}
                    </div>
                    <div className="TotalCost">
                        <span>Total:</span>
                        <span>{bill} WEI</span>
                    </div>
                    <div className="bookingbtn">
                        <Button btnText="Confirm Booking" onClickFunction={bookTickets} />
                    </div>
                </div>
                <div className="InfoSection">
                    <div className="EventImg">
                        <div className="event-image">
                            {event.image ? (
                                <img
                                    src={event.image}
                                    alt="Event"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            ) : (
                                "Image Placeholder"
                            )}
                        </div>
                    </div>
                    <p className="EventName">{event.artistName}</p>
                    <div className="EventDetails">
                        <p className="EventDate">Date</p>
                        <p>: {event.date}</p>
                    </div>
                    <div className="EventDetails">
                        <p className="EventTime">Timing</p>
                        <p>: 6 PM Onwards</p>
                    </div>
                    <div className="EventDetails">
                        <p className="EventVenue">Venue</p>
                        <p>: <a href={event.location}>Location</a></p>
                    </div>
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
                artist={event.artistName}
                buyers={buyers}
                eventId={event.id}
                totalBill={bill}
            />
        </div>
    );
};

export default BookTicket;