import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";
import logo from "../Images/G.png"
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
      <img src={logo} alt="Logo" class="logo"/>
      
    
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Auctions">Auctions</Link></li>
          <li><Link to="/selling">Selling</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/Signup">Sign Up</Link></li>
         
        </ul>
      
      </div>
    </nav>
  );
};

export default Navbar;
