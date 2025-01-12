// CopyNotification.jsx
import React from 'react';
import './CopyClipboard.css';

const CopyNotification = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="copy-notification">
      Text copied to clipboard!
    </div>
  );
};

export default CopyNotification;