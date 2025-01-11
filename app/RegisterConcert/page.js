'use client';
import React, { useState } from 'react';
import './registerConcert.css';
import InputBox from '@/components/InputBox/InputBox';  // Assuming this is your InputField component

const Page = () => {
  const [location, setLocation] = useState('');
  const [artistName, setArtistName] = useState('');
  const [date, setDate] = useState('');
  const [startingTicketPrice, setStartingTicketPrice] = useState('');

  return (
    <div className='RC-Container'>
      <div className='RC-Heading'>
        <h1>Register Concert</h1>
      </div>
      <div className='RC-details'>
        <div className='RC-field'>
          <label>Location:</label>
          <InputBox
            setInput={setLocation}
            placeholder="Enter location"
            width="300px"
          />
        </div>
        <div className='RC-field'>
          <label>Artist Name:</label>
          <InputBox
            setInput={setArtistName}
            placeholder="Enter artist name"
            width="300px"
          />
        </div>
        <div className='RC-field'>
          <label>Date (DDMMYYYY):</label>
          <InputBox
            setInput={setDate}
            placeholder="Enter date in DDMMYYYY format"
            width="300px"
          />
        </div>
        <div className='RC-field'>
          <label>Starting Ticket Price:</label>
          <InputBox
            setInput={setStartingTicketPrice}
            placeholder="Enter starting ticket price"
            width="300px"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
