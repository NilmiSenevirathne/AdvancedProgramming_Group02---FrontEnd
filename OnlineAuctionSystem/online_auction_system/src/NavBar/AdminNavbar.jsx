import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";
import logo from "../Images/G.png"

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <img src={logo} alt="Logo" className="logo"/>
      
        <ul className="nav-links">

          <li><Link to="/">User</Link></li> 
          <li><Link to="/">Item</Link></li>
          <li><Link to="/">Logout</Link></li>

        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;
