import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Toast.css';

const Toast = () => {
  const { showToast, toastMessage } = useCart();

  if (!showToast) return null;

  return (
    <div className="toast">
      <div className="toast-content">
        <p>{toastMessage}</p>
      </div>
    </div>
  );
};

export default Toast;