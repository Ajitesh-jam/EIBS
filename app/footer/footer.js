import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/Images/logo.png" alt="Logo" className="logo-image" />
        </div>
        <div className="footer-contact">
          <p>ABC Company, 1234 St, The Road, St. Louis 9002</p>
          <p>Phone: 123-456-7890 | Fax: 123-456-7891</p>
        </div>
        <div className="footer-social">
          <p>Social Media:</p>
          <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/Images/facebook.png" alt="Facebook" className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/Images/twitter.png" alt="Twitter" className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="/Images/instagram.png" alt="Instagram" className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <nav className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
          <a href="#">Help</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Disclaimer</a>
        </nav>
        <p>Copyright © 2025 ABC Company</p>
      </div>
    </footer>
  );
};

export default Footer;