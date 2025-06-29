import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Welcome to Favytech Store</h1>
          <p>Discover the latest tech gadgets and accessories</p>
          <a href="#products" className="btn btn-primary">Shop Now</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;