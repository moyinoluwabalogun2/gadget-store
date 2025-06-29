import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    clearCart 
  } = useCart();

  const handleCheckout = () => {
    clearCart();
    navigate('/receipt');
  };

  if (cart.length === 0) {
    return (
      <section className="cart-empty">
        <div className="container">
          <h2>Your cart is empty</h2>
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="cart">
      <div className="container">
        <h2 className="section-title">Your Cart</h2>
        
        <div className="cart-grid">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.images[0]} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="price">#{item.price.toFixed(2)}</p>
                  
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="item-actions">
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                  <p className="item-total">
                    #{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>#{cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>#{cartTotal.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="btn btn-primary checkout-btn"
            >
              Proceed to Checkout
            </button>
            
            <button 
              onClick={() => navigate('/')} 
              className="btn btn-outline continue-btn"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;