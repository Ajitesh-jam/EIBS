'use client'
import React from "react";
import "./Card.css";

import { useEffect } from "react";
import useEvents from '../hooks/event.zustand.js'
import { useRouter } from "next/navigation"; // Import the router hook
const Card = (event) => {
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    console.log(event);
  }
  , [event]);
  const setEvent = useEvents((state) => state.setNewEvent);

  const handleCardClick = () => {
    setEvent(event.event); // Set the selected event in the Zustand store
    router.push("/bookTicket"); // Navigate to the BookTicket page
  };
 
  return (
   
    <div
      className="card-container"
      onClick={handleCardClick} // Attach the click handler
      style={{ cursor: "pointer" }} // Change cursor to pointer for better UX
    >
     

      <div className="card-image">
        {event.event.image ? (
          <img src={event.event.image} alt="Event" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          "Image Placeholder"
        )}
      </div>

      <div className="card-content">
        <p className="card-date">{event.event.name}</p>
        <p className="card-price">{event.event.ticketPrice} WEI</p>
        <a  className="card-price" href={event.event.location} >Location</a>
      </div>

    

    
    </div>

   
  );
};

export default Card;
