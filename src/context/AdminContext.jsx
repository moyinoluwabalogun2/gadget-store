import React, { createContext, useContext, useEffect, useState } from 'react';
import { productStorage } from '../utils/localStorageHelpers';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);

  // Load products on initial render
  useEffect(() => {
    const savedProducts = productStorage.getProducts();
    if (savedProducts && savedProducts.length > 0) {
      setProducts(savedProducts);
    } else {
      // Initialize with default products if none exist
      const defaultProducts = [
        {
          id: 1,
          name: 'iPhone 13 Pro',
          price: 999,
          description: 'The latest iPhone with Pro camera system',
          category: 'phones',
          images: [
            'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-family-hero?wid=940&hei=1112&fmt=png-alpha&.v=1631220221000',
            'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-silver-select?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1631652956000'
          ]
        },
        {
          id: 2,
          name: 'Samsung Galaxy S21',
          price: 799,
          description: 'Powerful Android smartphone with amazing display',
          category: 'phones',
          images: [
            'https://images.samsung.com/us/smartphones/galaxy-s21-5g/models/images/galaxy-s21-5g-models_phantom-gray_s.jpg',
            'https://images.samsung.com/us/smartphones/galaxy-s21-5g/models/images/galaxy-s21-5g-models_phantom-violet_s.jpg'
          ]
        }
      ];
      setProducts(defaultProducts);
      productStorage.saveProducts(defaultProducts);
    }
  }, []);

  // Save products when they change
  useEffect(() => {
    if (products.length > 0) {
      productStorage.saveProducts(products);
    }
  }, [products]);

  const login = (password) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  // Modify just the addProduct function (keep everything else the same)
const addProduct = (product) => {
  const newProduct = {
    ...product,
    id: product.id || Date.now(),
    images: Array.isArray(product.images) ? product.images : [product.images].filter(Boolean)
  };
  setProducts([...products, newProduct]);
};

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <AdminContext.Provider 
      value={{ 
        isAdmin, 
        login, 
        logout,
        products,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);