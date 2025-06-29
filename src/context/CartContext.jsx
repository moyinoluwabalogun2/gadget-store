import React, { createContext, useContext, useEffect, useState } from 'react';
import { cartStorage, localStorageHelper } from '../utils/localStorageHelpers';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load cart from storage on initial render
  useEffect(() => {
    const savedCart = cartStorage.getCart();
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // Save cart when it changes
  useEffect(() => {
    if (cart.length > 0 || localStorageHelper.get('cart') !== null) {
      cartStorage.saveCart(cart);
    }
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    showToastMessage(`${product.name} added to cart`);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    showToastMessage('Item removed from cart');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    cartStorage.clearCart();
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        cartTotal,
        cartCount,
        showToast,
        toastMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);