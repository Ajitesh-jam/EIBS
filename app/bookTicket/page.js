'use client';
import React, { useState, useEffect } from 'react';
import './bookTicket.css';
import Navbar from '@/components/Navbar/Navbar';
import Button from '@/components/Button/Button';
import { useLogin } from '@/contexts/loginContext';
import useEvents from '@/components/hooks/event.zustand';
import { getAccounts, buyMultipleTickets,checkTicketOwnership } from '@/components/utils/web3';

const Homepage = () => {
  const [addresses, setAddresses] = useState(''); // To store input addresses
  const [costPerTicket, setCostPerTicket] = useState(BigInt(0)); // Store ticket price as BigInt
  const currEvent = useEvents((state) => state.selectedEvent);
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    console.log("Event in bookTicket page:", currEvent);
    if (currEvent) {
      // Ensure ticketPrice is BigInt
      setCostPerTicket(currEvent.ticketPrice || 0);
    }
  }, [currEvent]);

  useEffect(() => {
    // Fetch accounts when the component mounts
    const fetchAccounts = async () => {
      try {
        const accounts = await getAccounts();
        console.log('Fetched accounts:', accounts);
        // Add the first account to buyers
        setBuyers([accounts[0]]);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  const handleRegisterConcertBtnClick = () => {
    console.log('Register Concert Button Clicked');
  };

  const handleBuyTickets = async () => {
    try {
      console.log("Ticket Price (in wei):", costPerTicket.toString());

      // Split and clean addresses entered by the user
      const buyersFriend = addresses.split(',').map((addr) => addr.trim());

      // Combine fetched account with input addresses
      const allBuyers = [...buyers, ...buyersFriend];
      console.log("All Buyers:", allBuyers);

        let hasTicket=false;
      // Check if the user has a ticket by looping in all buyers and calling checkTickeOwnership(eventId,userAddress)
        for (let i = 0; i < allBuyers.length; i++) {
            const buyer = allBuyers[i];
            hasTicket = await checkTicketOwnership(currEvent.index, buyer);
            if (hasTicket) {
                console.log(`${buyer} has a ticket for the event ${currEvent.index}`);
                break;
            }
            
        }

        if(!hasTicket) {

            // Calculate total cost using BigInt
            const totalCost =(BigInt(allBuyers.length) * costPerTicket)/currEvent.ticketsLeft;
            console.log("Total Cost (in wei):", totalCost.toString());

            const eventId = currEvent.index; // Replace with the actual eventId (e.g., currEvent.id)
            console.log("Event ID:", eventId);

            // Call the smart contract function
            const response = await buyMultipleTickets(allBuyers, eventId, totalCost.toString());
            console.log('Tickets bought successfully:', response);
        }
        else{
            console.log("One of the buyers already has a ticket for the event");
        }
    } catch (error) {
      console.error('Error buying tickets:', error.message);
    }
  };

  return (
    <div className='Homepage-container'>
      <Navbar />
      <div className='Hero-container'>
        <div className='Hero-left'></div>
        <div className='Hero-right'>
          <div className='Heading'>
            <p>Tickets Tailored <br />to Real Fans.</p>
          </div>
          <div className='Sub-Heading'>
            <p>Powered by Avalanche</p>
          </div>
        </div>
      </div>
      <div className='Events-container'>
        <div className='Event-Heading'>
          <p>Upcoming Events</p>
        </div>
        <div className='Card-container'></div>
      </div>
      <div className='TicketPurchase-container'>
        <h3>Buy Tickets</h3>
        <input
          type='text'
          placeholder='Enter addresses separated by commas'
          value={addresses}
          onChange={(e) => setAddresses(e.target.value)}
        />
        <Button btnText='Buy Tickets' onClickFunction={handleBuyTickets} />
      </div>
      <div className='RegisterConcert-container'>
        <div className='RegisterConcert-Heading'>
          <p>Got your own concert?</p>
        </div>
        <div className='RegisterConcertSection'>
          <div className='left'>
            <p>Register your concert and start selling tickets in a few easy steps!</p>
          </div>
          <div className='right'>
            <Button
              btnText='Register Concert'
              onClickFunction={handleRegisterConcertBtnClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

