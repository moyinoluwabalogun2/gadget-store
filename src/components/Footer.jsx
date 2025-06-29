import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>Gadget Store</h3>
            <p>Your one-stop shop for the latest tech gadgets and accessories.</p>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li>Email: favigirl256@gmail.com</li>
              <li>Phone: +2347069619602 </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Gadget Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;