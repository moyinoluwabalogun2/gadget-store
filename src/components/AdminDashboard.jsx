import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import AdminProductForm from './AdminProductForm';
import '../styles/AdminDashboard.css';



const AdminDashboard = () => {
  const { isAdmin, logout, products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    handleFormClose();
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <h2>Admin Dashboard</h2>
          <button onClick={logout} className="btn btn-outline">
            Logout
          </button>
        </div>
      </div>
      
      <div className="admin-content">
        <div className="container">
          <div className="admin-actions">
            <button 
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              className="btn btn-primary"
            >
              Add New Product
            </button>
            
            <div className="stats">
              <div className="stat-card">
                <h3>{products.length}</h3>
                <p>Total Products</p>
              </div>
            </div>
          </div>
          
          {showForm && (
            <AdminProductForm 
              product={editingProduct} 
              onClose={handleFormClose}
              onSave={handleSaveProduct} 
            />
          )}
          
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>#{product.price.toFixed(2)}</td>
                    <td>{product.category}</td>
                    <td className="actions">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="btn btn-outline"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;