import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const AdminProductForm = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'phones',
    images: [],
    brand: '',
    model: '',
    color: ''
  });

  const [newImage, setNewImage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price?.toString() || '',
        description: product.description || '',
        category: product.category || 'phones',
        images: Array.isArray(product.images) ? product.images : [],
        brand: product.brand || '',
        model: product.model || '',
        color: product.color || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddImage = () => {
    if (newImage.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage('');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Validate price and required fields
    const parsedPrice = parseFloat(formData.price);
    if (!formData.name || isNaN(parsedPrice) || !formData.description) {
      alert("Please fill out all required fields with valid values.");
      setSaving(false);
      return;
    }

    const productData = {
      name: formData.name,
      price: parsedPrice,
      description: formData.description,
      category: formData.category,
      images: Array.isArray(formData.images) ? formData.images.filter(Boolean) : [],
      brand: formData.brand || '',
      model: formData.model || '',
      color: formData.color || ''
    };

    try {
      if (product?.id) {
        const productRef = doc(db, 'products', product.id);
        await updateDoc(productRef, productData);
        alert('✅ Product updated successfully!');
      } else {
        await addDoc(collection(db, 'products'), productData);
        alert('✅ Product added successfully!');
      }
      onClose();
    } catch (error) {
      console.error('❌ Error saving product:', error);
      alert('❌ Failed to save product. Check Firestore rules and console.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-form-overlay">
      <div className="admin-form">
        <div className="form-header">
          <h3>{product ? 'Edit Product' : 'Add New Product'}</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Product Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label htmlFor="price">Price*</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="phones">Phones</option>
              <option value="laptops">Laptops</option>
              <option value="consoles">Consoles</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          {/* Optional Fields */}
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="color">Color</label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Image URLs */}
          <div className="form-group">
            <label>Images*</label>
            <div className="image-input-group">
              <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="Enter image URL"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="btn btn-outline"
              >
                Add Image
              </button>
            </div>

            <div className="image-preview">
              {formData.images.map((img, index) => (
                <div key={index} className="image-preview-item">
                  <img src={img} alt={`Preview ${index}`} />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="remove-image-btn"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
