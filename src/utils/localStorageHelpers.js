// localStorageHelpers.js - Complete fixed version
export const localStorageHelper = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// Cart-specific operations
export const cartStorage = {
  getCart: () => localStorageHelper.get('cart') || [],
  saveCart: (cart) => localStorageHelper.set('cart', cart),
  clearCart: () => localStorageHelper.remove('cart'),
  getCartCount: () => {
    const cart = localStorageHelper.get('cart') || [];
    return cart.reduce((total, item) => total + item.quantity, 0);
  }
};

// Product-specific operations
export const productStorage = {
  getProducts: () => localStorageHelper.get('products') || [],
  saveProducts: (products) => localStorageHelper.set('products', products),
  getProduct: (id) => {
    const products = localStorageHelper.get('products') || [];
    return products.find(product => product.id === id);
  }
};