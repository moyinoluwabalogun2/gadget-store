import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.images[0]} alt={product.name} />
        </div>
      </Link>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">#{product.price.toFixed(2)}</p>
        <p className="description">{product.description}</p>
        
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="btn btn-outline">
            View Details
          </Link>
          <button 
            onClick={() => addToCart(product)} 
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;