import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const { isAdmin } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand" onClick={() => setIsOpen(false)}>
          Gadget Store
        </Link>
        
        <button 
          className={`hamburger ${isOpen ? 'open' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" className="nav-link" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/cart" className="nav-link cart-link" onClick={() => setIsOpen(false)}>
            Cart ({cartCount})
          </Link>
          
          {isAdmin && (
            <Link to="/admin/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;