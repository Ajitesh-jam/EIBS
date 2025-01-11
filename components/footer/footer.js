// Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We are dedicated to providing the best experience for our users.</p>
        </div>

        {/* <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div> */}

        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: (555) 123-4567</p>
          <p>Address: 123 Main St, City, Country</p>
        </div>

        <div className="footer-section">
          <h3>Social Media</h3>
          <div className="social-links">
          <a href="https://facebook.com" aria-label="Facebook">
                        <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                    </a>
                    <a href="https://twitter.com" aria-label="Twitter">
                        <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                    </a> 
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Harsh Chhattar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;