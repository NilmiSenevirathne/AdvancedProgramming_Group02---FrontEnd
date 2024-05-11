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
          <li><Link to="/">Home</Link></li>
         
          <li><Link to="/Login">Login</Link></li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
