
'use client';
import React, { useState, useEffect } from 'react';
import './BookTicket.css';
import Navbar from '../Navbar/Navbar';
import GetStarted from '../GetStarted/GetStarted';
import { getAccounts, checkMetaMaskLogin, buyMultipleTickets, checkTicketOwnership   } from '../utils/web3';
import { useLogin } from '@/contexts/loginContext';
import Button from '../Button/Button';
import InputBox from '../InputBox/InputBox';
import { useSearchParams } from 'next/navigation';

const BookTicket = () => {
    const [showModal, setShowModal] = useState(false);

    const { setIsLoggedIn, setPublicAddress, publicAddress } = useLogin();
    const [ticketCount, setTicketCount] = useState(1);
    const [buyers, setBuyers] = useState(['']);
    const searchParams = useSearchParams();
    const eventData = searchParams.get('event');
    const event = eventData ? JSON.parse(eventData) : null;

    const [costPerTicket, setCostPerTicket] = useState(BigInt(0)); // Store ticket price as BigInt

    if (!event) {
        return <p>Loading...</p>;
    }

    const bookTickets = async () => {
        // try {
        //     console.log('event', event);
        //     console.log("Booking Tickets for:", buyers);
        //     //await buyMultipleTickets(buyers); // Call the function to handle the ticket purchase
        //     //alert("Tickets booked successfully!");
        // } catch (error) {
        //     console.error("Error booking tickets:", error);
        // }

        try {
            console.log("Ticket Price (in wei):", costPerTicket.toString());
            console.log("Event:", event);
      
              let hasTicket=false;
            // Check if the user has a ticket by looping in all buyers and calling checkTickeOwnership(eventId,userAddress)
              for (let i = 0; i < buyers.length; i++) {
                  const buyer = buyers[i];
                  hasTicket = await checkTicketOwnership(event.index, buyer);
                  if (hasTicket) {
                      console.log(`${buyer} has a ticket for the event ${event.index}`);
                      break;
                  }
                  
              }
      
              if(!hasTicket) {
      
                  // Calculate total cost using BigInt
                 //make total cost equal to currentTicket converted to integer value
                 //convert costPerticket to int costperTciekt is float
                 const totalCost = Math.floor(costPerTicket);



                  console.log("Total Cost (in wei):", totalCost.toString());
      
                  const eventId = event.index; // Replace with the actual eventId (e.g., currEvent.id)
                  console.log("Event ID:", eventId);
      
                  // Call the smart contract function
                  const response = await buyMultipleTickets(buyers, eventId, totalCost.toString());
                  console.log('Tickets bought successfully:', response);
              }
              else{
                  console.log("One of the buyers already has a ticket for the event");
              }
          } catch (error) {
            console.error('Error buying tickets:', error.message);
          }

        
    };

    useEffect(() => {
        const checkLogin = async () => {
            const loggedIn = await checkMetaMaskLogin();
            setIsLoggedIn(loggedIn);
            const accounts = await getAccounts();
            if (loggedIn && accounts.length > 0) {
                setBuyers((prev) => [accounts[0], ...prev.slice(1)]);
            }
            setCostPerTicket(BigInt(event.ticketPrice)/event.ticketsLeft);
        };

        checkLogin();

    }, []);

    const handleLogin = async () => {
        const accounts = await getAccounts();
        setPublicAddress(accounts[0]);
        setIsLoggedIn(true);
        setBuyers((prev) => [accounts[0], ...prev.slice(1)]);
        setShowModal(false);
    };

    const toggleGetStartedModal = () => {
        setShowModal(!showModal);
    };

    // Update the buyers array when ticket count changes
    useEffect(() => {
        setBuyers((prev) => {
            const filledBuyers = [...prev];
            while (filledBuyers.length < ticketCount) {
                filledBuyers.push('');
            }
            return filledBuyers.slice(0, ticketCount);
        });

        setCostPerTicket(ticketCount * event.ticketPrice/event.ticketsLeft);
    }, [ticketCount]);

    const handleAddressChange = (index, value) => {
        const updatedBuyers = [...buyers];
        updatedBuyers[index] = value;
        setBuyers(updatedBuyers);

    };

    return (
        <div className="BT-Container">
            <Navbar toggleGetStartedModal={toggleGetStartedModal} />
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
                        <p>Total: {costPerTicket} WEI</p>
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
                        <p>{event.date}</p>
                    </div>
                    <p className="EventTime">Timing</p>
                    <p className="EventVenue">Venue</p>
                    <div className="MapLocation"></div>
                </div>
            </div>
        </div>
    );
};

export default BookTicket;
