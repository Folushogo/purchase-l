import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBoxOpen, faInfoCircle, faWarehouse } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Determine the current page based on the route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/items':
        return { title: 'Items', icon: faBoxOpen };
      case '/about':
        return { title: 'About', icon: faInfoCircle };
      case '/inventory':
        return { title: 'Inventory', icon: faWarehouse };
      default:
        return { title: 'Home', icon: faHome };
    }
  };

  const { title, icon } = getPageTitle();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <button className="menu-icon" onClick={toggleNavbar}>
        &#9776;
      </button>
      <div className="navbar-header">
        <FontAwesomeIcon icon={icon} className="header-icon" />
        <span className="navbar-title">{title}</span>
      </div>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faHome} className="mobile-icon" />
          Home
        </Link>
        <Link to="/items" onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faBoxOpen} className="mobile-icon" />
          Items
        </Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faInfoCircle} className="mobile-icon" />
          About
        </Link>
        <Link to="/inventory" onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faWarehouse} className="mobile-icon" />
          Inventory
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
