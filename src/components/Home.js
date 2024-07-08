import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; 


function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to Our Website</h1>
          <p>Your purchase log book</p>
          <Link to="/items" className="cta-button">Browse Items</Link>
        </div>
      </div>
      <div className="intro-section">
        <h2>Introduction</h2>
        <p>Welcome to our website where you can log your purchases easily and effectively.</p>
      </div>
      <div className="features-section">
        <h2>Our Features</h2>
        <div className="features">
          <div className="feature">
            <i className="fas fa-headset"></i>
            <h3>24/7 Support</h3>
            <p>Our customer support team is here to help you anytime...</p>
          </div>
          <div className="feature">
            <i className="fas fa-shield-alt"></i>
            <h3>Secure</h3>
            <p>We ensure your data is safe with us...</p>
          </div>
          <div className="feature">
            <i className="fas fa-sync-alt"></i>
            <h3>Easy to Use</h3>
            <p>Our platform is user-friendly and intuitive...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
