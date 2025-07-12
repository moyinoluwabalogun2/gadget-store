import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="container">Loading product...</p>;
  }

  if (!product) {
    return (
      <div className="container">
        <p>Product not found.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <section className="product-details-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back to Products
        </button>

        <div className="product-details-container">
          <div className="product-gallery">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
            >
              {product.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="product-image-container">
                    <img
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="product-main-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image';
                        e.target.className = 'product-main-image error';
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>

            <div className="price-section">
              <span className="current-price">#{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="original-price">#{product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <div className="product-meta">
              <span className="category-badge">{product.category}</span>
              <span className="availability">In Stock</span>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-actions">
              <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                Add to Cart
              </button>
              <Link to="/contact" state={{ product: product.name }} className="contact-btn">
                Contact About This Product
              </Link>
            </div>

            <div className="product-specs">
              <h3>Specifications</h3>
              <ul className="specs-list">
                <li><strong>Brand:</strong> {product.brand || 'Generic'}</li>
                <li><strong>Model:</strong> {product.model || 'N/A'}</li>
                <li><strong>Color:</strong> {product.color || 'Various'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;