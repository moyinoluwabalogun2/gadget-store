import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Receipt.css';

const Receipt = () => {
  const navigate = useNavigate();
  
  // Generate a random order number
  const orderNumber = `ORDER-${Math.floor(Math.random() * 1000000)}`;
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="receipt">
      <div className="container">
        <div className="receipt-card">
          <div className="receipt-header">
            <h2>Thank you for your order!</h2>
            <p>Your order has been placed successfully.</p>
          </div>
          
          <div className="receipt-details">
            <div className="detail-row">
              <span>Order Number:</span>
              <span>{orderNumber}</span>
            </div>
            
            <div className="detail-row">
              <span>Date:</span>
              <span>{orderDate}</span>
            </div>
            
            <div className="detail-row">
              <span>Payment Method:</span>
              <span>Credit Card</span>
            </div>
            
            <div className="detail-row total">
              <span>Total Paid:</span>
              <span>$0.00 (Demo Only)</span>
            </div>
          </div>
          
          <div className="receipt-actions">
            <button 
              onClick={() => navigate('/')} 
              className="btn btn-primary"
            >
              Back to Home
            </button>
            
            <button 
              onClick={() => navigate('/')} 
              className="btn btn-outline"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Receipt;