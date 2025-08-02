import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src="src/assets/bird-logo-cute.png" alt="BirdBnB Logo" />
        BirdBnB
      </Link>
      <ul className="navbar-links">
        <li><Link to="/booking">Booking</Link></li>
        <li><Link to="/co-living">Nest-Sharing</Link></li>
        <li><Link to="/build">Build a Nest</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;