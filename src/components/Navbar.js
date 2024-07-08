// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a separate CSS file for Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/items">Items</Link>
      <Link to="/about">About</Link>
      <Link to="/inventory">Inventory</Link>
      <Link to="/categories">Categories</Link>
    </nav>
  );
};

export default Navbar;
