'use client';
import React, { useState } from 'react';
import axios from 'axios';
import './registerConcert.css';
import InputBox from '@/components/InputBox/InputBox';
import Button from '@/components/Button/Button';
import { createEvent,totalEvents } from '@/components/utils/web3Final';
import 'json-bigint';

const Page = () => {
  const [artistName, setArtistName] = useState('');
  const [date, setDate] = useState();
  const [ticketLiveDate, setTicketLiveDate] = useState('');
  const [description, setDescription] = useState('');

  const [ticketPrice, setTicketPrice] = useState();
  const [location, setLocation] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState();
  const [artistPublicAddress, setArtistPublicAddress] = useState('');
  const [image, setImageUrl] = useState('');

  // const handleRegisterConcert = async () => {
  //   const eventId = await totalEvents();

  //   try {
  //     const eventPayload = {
  //       artistName,
  //       publicAddress: artistPublicAddress,
  //       date,
  //       description,
  //       isEventLive:false,
  //       startingTicketPrice:ticketPrice,
  //       location,
  //       numberOfTickets: numberOfTickets,
  //       publicAddress: artistPublicAddress,
  //       imgUrl: image,
  //       eventId: eventId
       
  //     };

      
  //     const response = await axios.post(`http://localhost:8000/createEvent/${eventId}`, eventPayload);
  //     console.log('Concert registered successfully:', response.data);

  //     //web3 create event
  //     //convert ticket price and number of tickets to BigInt
  //     let ticketPrice1 = BigInt(ticketPrice);
  //     let numberOfTickets1 = BigInt(numberOfTickets);
  //     const event = await createEvent(artistPublicAddress , artistName , ticketPrice1 , numberOfTickets1);
  //     console.log("event created: ",event);
  //     alert("Event created successfully");

  //   } catch (error) {
  //     console.error('Error registering concert:', error.response?.data || error.message);
  //   }
  // };

  const handleRegisterConcert = async () => {
    const eventId = await totalEvents();
  
    try {
      const ticketPriceBigInt = BigInt(ticketPrice); // Convert to BigInt
      const numberOfTicketsBigInt = BigInt(numberOfTickets); // Convert to BigInt
  
      // Prepare payload for API (as string to avoid serialization issues)
      const eventPayload = {
        artistName,
        publicAddress: artistPublicAddress,
        date,
        description,
        isEventLive: false,
        startingTicketPrice: ticketPriceBigInt.toString(), // Convert to string
        location,
        numberOfTickets: numberOfTicketsBigInt.toString(), // Convert to string
        imgUrl: image,
        eventId,
        ticketLiveDate,
      };
  
      // Send data to backend
      const response = await axios.post(
        `http://localhost:8000/createEvent/${eventId}`,
        eventPayload
      );
      console.log('Concert registered successfully:', response.data);
  
      // Call web3 contract function with BigInt values
      const event = await createEvent(
        artistPublicAddress,
        artistName,
        ticketPriceBigInt,
        numberOfTicketsBigInt
      );
      console.log('Event created on blockchain:', event);
  
      alert('Event created successfully');
    } catch (error) {
      console.error('Error registering concert:', error.response?.data || error.message);
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
          <label>Artist Public Address:</label>
          <InputBox
            setInput={setArtistPublicAddress}
            placeholder="Enter artist public address"
            width="300px"
          />
        </div>

        <div className="RC-field">
          <label>Image URL:</label>
          <InputBox
            setInput={setImageUrl}
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
          <label>Tickets Live From:</label>
          <InputBox
            setInput={setTicketLiveDate}
            placeholder="Set Ticket Live Date "
            width="300px"
          />
        </div>

        <div className="RC-field">
          <label>Starting Ticket Price:</label>
          <InputBox
            setInput={setTicketPrice}
            placeholder="Enter ticket price"
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

        <div className="RC-field">
          <label>Description:</label>
          <InputBox
            setInput={setDescription}
            placeholder="Write description"
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
