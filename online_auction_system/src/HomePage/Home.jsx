import React, { useState, useEffect } from 'react';
import './home.css'; // Importing CSS file for styling
import { Link } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';
import sunglass from "../Images/sunglass.webp";
import smartwatch from "../Images/watch.jpeg";
import bag from "../Images/bag.jpg";
import fashionGirl from "../Images/fashiongirl.avif";
import earings from "../Images/Fashion_Earrings.webp";
import bags from "../Images/bags.jpeg";

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [fashionGirl, earings, bags]; 

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change slide every 3 seconds
    
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-container">
            <header>
                <Navbar />
                <h1 className="bidzone">BidZone</h1>
                
                <div className="search-bar">
                    <input type="text" placeholder="Search for items, brands, and more" />
                    <button>Search</button>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/fashion">Fashion</Link></li>
                        <li><Link to="/electronics">Electronics</Link></li>
                        <li><Link to="/home-garden">Home & Garden</Link></li>
                        {/* Add more categories */}
                    </ul>
                </nav>

                <div className="slideshow-container">
                    {images.map((imageUrl, index) => (
                        <div
                            key={index}
                            className={index === currentIndex ? "slide active" : "slide"}
                            style={{ backgroundImage: `url(${imageUrl})` }}
                        ></div>
                    ))}
                </div>
            </header>
            <main>
                <section className="featured-items">
                    <h2>Featured Items</h2>
                    <div className="item">
                        <img src={sunglass} alt="Featured Item 1" />
                        <h3>Stylish Sunglasses</h3>
                        <p>$20</p>
                    </div>
                    <div className="item">
                        <img src={smartwatch} alt="Featured Item 2" />
                        <h3>Smartwatch</h3>
                        <p>$150</p>
                    </div>
                    <div className="item">
                        <img src={bag} alt="Featured Item 3" />
                        <h3>Fashionable Handbag</h3>
                        <p>$50</p>
                    </div>
                    {/* Add more featured items */}
                </section>
            </main>
            <footer>
            <div className="about-us-container">
      <div className="about-us">
        <h2>About Us</h2>
        <p>
          Welcome to BidZone - your premier destination for online auctions! At BidZone, we're more than just a marketplace; we're a vibrant community of buyers and sellers brought together by our passion for great deals and unique finds.
        </p>
        <h3>Our Mission</h3>
        <p>
          At BidZone, our mission is simple: to provide a seamless and enjoyable bidding experience for everyone. Whether you're a seasoned bidder or a first-time user, we strive to make your journey with us smooth, secure, and rewarding.
        </p>
        </div>
     </div>
                <p>&copy; 2024 BidZone</p>
            </footer>
        </div>
    );
};

export default Home;
