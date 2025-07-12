import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminProductForm from './AdminProductForm';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { currentUser, userData, logout, loading } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!currentUser || userData?.role !== 'admin')) {
      navigate('/admin');
    }
  }, [loading, currentUser, userData, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [showForm]);

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        setProducts(prev => prev.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleSaveProduct = () => {
    handleFormClose();
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <h2>Admin Dashboard</h2>
          <button onClick={logout} className="btn btn-outline">Logout</button>
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
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>#{product.price.toFixed(2)}</td>
                    <td>{product.category}</td>
                    <td className="actions">
                      <button onClick={() => handleEdit(product)} className="btn btn-outline">Edit</button>
                      <button onClick={() => handleDelete(product.id)} className="btn btn-danger">Delete</button>
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