

'use client';
import React, { useState } from 'react';
import './registerConcert.css';
import InputBox from '@/components/InputBox/InputBox'; // Assuming this is your InputField component
import { createEvent } from '@/components/utils/web3';
import Button from '@/components/Button/Button';

const Page = () => {
  const [location, setLocation] = useState('');
  const [artistName, setArtistName] = useState('');
  const [date, setDate] = useState('');
  const [startingTicketPrice, setStartingTicketPrice] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleRegisterConcert = async () => {
    try {
      // Convert startingTicketPrice and numberOfTickets to BigInt before using them
      const startingTicketPriceBigInt = BigInt(startingTicketPrice);
      const numberOfTicketsBigInt = BigInt(numberOfTickets);

      await createEvent(
        artistName,
        location,
        date,
        startingTicketPriceBigInt,
        numberOfTicketsBigInt,
        imgUrl
      );

      console.log('Concert registered successfully!');
    } catch (error) {
      console.error('Error registering concert:', error);
    }
  };

  return (
    <div className="RC-Container">
      <div className="RC-Heading">
        <h1>Register Concert</h1>
      </div>

      <div className="RC-details">
        <div className="RC-field">
          <label>Artist Name:</label>
          <InputBox
            setInput={setArtistName}
            placeholder="Enter artist name"
            width="300px"
          />
        </div>

        <div className="RC-field">
          <label>Image URL:</label>
          <InputBox
            setInput={setImgUrl}
            placeholder="Enter Image URL"
            width="300px"
          />
        </div>

        <div className="RC-field">
          <label>Location:</label>
          <InputBox
            setInput={setLocation}
            placeholder="Enter location"
            width="300px"
          />
        </div>

        <div className="RC-field">
          <label>Date (DDMMYYYY):</label>
          <InputBox
            setInput={setDate}
            placeholder="Enter date in DDMMYYYY format"
            width="300px"
          />
        </div>

        <div className="RC-field">
          <label>Starting Ticket Price:</label>
          <InputBox
            setInput={setStartingTicketPrice}
            placeholder="Enter starting ticket price"
            width="300px"
          />
        </div>

        <div className="RC-field">
          <label>Number of Tickets:</label>
          <InputBox
            setInput={setNumberOfTickets}
            placeholder="Enter number of tickets"
            width="300px"
          />
        </div>

        <br />
        <Button btnText="Register Concert" onClickFunction={handleRegisterConcert} />
      </div>
    </div>
  );
};

export default Page;

