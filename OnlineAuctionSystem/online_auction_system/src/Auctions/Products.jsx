import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './products.css'; // Import custom CSS for styling
import CustomerDashboard from '../NavBar/CustomerDashboard';
import { Link } from 'react-router-dom';

const Products = ({ username }) => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch items from backend API
        axios.get('http://localhost:8080/getitems')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }, []);

    // Function to determine if bidding time is over
    const isBiddingTimeOver = (endTime) => {
        const bidEndTime = new Date(endTime);
        const currentTime = new Date();
        return currentTime > bidEndTime;
    };

    // Function to format the bid end time
    const formatBidEndTime = (endTime) => {
        const bidEndTime = new Date(endTime);
        const currentTime = new Date();
        if (isBiddingTimeOver(endTime)) {
            return 'Bidding Time Over';
        } else {
            const timeDifference = bidEndTime - currentTime;
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            return `${hours}h ${minutes}m ${seconds}s`;
        }
    };

    return (
        <div className="auction-container">
            <CustomerDashboard />
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search items by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => handleSearch()}>Search</button>
            </div>
            <div className="items-container">
                {items.map(item => (
                    <div className="item-card" key={item.itemid}>
                        <div className="item-image">
                            <img src={`data:image/jpeg;base64,${item.imageData}`} alt={item.itemname} />
                        </div>
                        <div className="item-details">
                            <h3>{item.itemname}</h3>
                            <div className="price-info">
                                <p>Starting Price: ${item.startingPrice.toFixed(2)}</p>
                                <p>Current Bid: ${item.currentBid.toFixed(2)}</p>
                            </div>
                            <p className="bid-end-time">Bid End Time: {formatBidEndTime(item.bidEndTime)}</p>
                            <Link to={`/${item.itemid}`} key={item.itemid} className='view'>View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
