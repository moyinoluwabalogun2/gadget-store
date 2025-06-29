import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import '../styles/ProductList.css';

const ProductList = () => {
  const { products } = useAdmin();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    let result = products;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, products]);

  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];

  return (
    <section className="product-list" id="products">
      <div className="container">
        <h2 className="section-title">Our Products</h2>
        
        <div className="filters">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <div className="category-filter">
            <label htmlFor="category">Filter by Category:</label>
            <select 
              id="category" 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="no-products">No products found matching your criteria.</p>
        )}
      </div>
    </section>
  );
};

export default ProductList;