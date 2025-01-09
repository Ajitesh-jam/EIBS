import React from "react";
import "./Card.css";

const Card = ({ dateText, priceText, imageSrc }) => {
  return (
    <div className="card-container">
      {/* Image Section */}
      <div className="card-image">
        {imageSrc ? (
          <img src={imageSrc} alt="Event" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          "Image Placeholder"
        )}
      </div>

      {/* Text Section */}
      <div className="card-content">
        <p className="card-date">{dateText}</p>
        <p className="card-price">{priceText}</p>
      </div>
    </div>
  );
};

export default Card;
