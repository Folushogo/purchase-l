// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
    const handleGoBack = () => {
  window.history.back();
};
  return (
    <nav>
       
      <ul>
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
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
