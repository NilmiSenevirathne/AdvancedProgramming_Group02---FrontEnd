import { Routes, Route, Link } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Products from '../Auctions/Products';

import './customerD.css';
import React, { useState, useEffect } from 'react';
import Accessories1 from "../Images/Accessories1.jpeg"
import girl from "../Images/girl2.jpg";
import fashionGirl from "../Images/fashiongirl.avif";
import earings from "../Images/Fashion_Earrings.webp";
import Accessories2 from "../Images/accessories2.jpg";
import Accessories3 from "../Images/A.jpg"
import Bidding from '../Auctions/Bidding';
import Home from '../HomePage/Home';
const CustomerDashboard = ({ userId, userName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [fashionGirl, earings, girl,Accessories1,Accessories2,Accessories3]; 

  // Function to handle moving to the next image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to handle moving to the previous image
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="customer-dashboard">

      <nav className="dashboard-nav">
      <div className="txt">
        Welcome to BidZone
      </div>
        {/* Links to navigate within the dashboard */}
        <ul className="nav-links">
        <li><Link to="/CustomerDashboard">Dashboard</Link></li>
          <li><Link to="/Products">Products</Link></li>
          <li><Link to="/Bidding">My Bids</Link></li>
          <li><Link to="/Profile">Profile</Link></li>
      
          <li><Link to="/">Logout</Link></li>
          {/* Additional links for other dashboard sections */}
        </ul>
        {/* Welcome message */}
        <div className="welcome-message">Welcome, {userName}</div>
      </nav>
      {/* Dashboard content */}
      <div className="dashboard-content">
        <Routes>
          <Route path="/Products" element={<Products />} />
          <Route path="/Bidding" element={<Bidding />} />
          <Route path="/Profile" element={<Profile userId={userId} />} /> {/* Pass userId prop to Profile */}

          {/* Additional routes for other dashboard sections */}
        </Routes>
      </div>

      
      {/* Slideshow */}
      <div className="slideshow-container">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={index === currentIndex ? "slide active" : "slide"}
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        ))}
        {/* Arrow buttons */}
        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <button className="next" onClick={nextSlide}>&#10095;</button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
