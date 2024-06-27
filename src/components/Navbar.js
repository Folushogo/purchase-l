import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import "./Navbar.css"; 

const Navbar = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <nav>
      <div className="go-back-icon" onClick={handleGoBack}>
        <FaArrowLeft />
      </div>
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
        <li>
          <Link to="/Categories">Categories</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
