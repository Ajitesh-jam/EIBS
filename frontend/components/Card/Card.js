'use client'
import React from "react";
import "./Card.css";

import { useEffect } from "react";
const Card = (event) => {

  useEffect(() => {
    console.log(event);
  }
  , [event]);

 
  return (
    <div className="card-container">
   

      
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
