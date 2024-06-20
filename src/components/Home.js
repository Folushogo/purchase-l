import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; 
import "./Global.css"; // Import Global CSS


function Home() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/items">Items</Link>
          </li>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
      </nav>
      <div className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to Our Website</h1>
          <p>Your purchase log book</p>
          <Link to="/items" className="cta-button">Browse Items</Link>
        </div>
      </div>
      <div className="intro-section">
        <h2>About Us</h2>
        <p>
          Our diverse team is comprised of experts in network architecture, cloud computing, cybersecurity, data management, and more. Read more on about us page......</p>
        
      </div>
      <div className="features-section">
        <h2>Our Features</h2>
          <div className="features">
          <div className="feature">
            <i className="fas fa-headset"></i>
            <h3>24/7 Support</h3>
            <p>Our customer support fasteam is here to help you anytime.</p>
          </div>
        </div>
      </div>
      </div>
      
  );
}

export default Home;
