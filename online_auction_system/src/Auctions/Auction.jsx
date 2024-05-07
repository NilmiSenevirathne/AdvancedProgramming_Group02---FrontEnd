import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './auction.css'; // Import custom CSS for styling
import Navbar from '../NavBar/Navbar';
import Login from "../Login/Login";
import { Link } from 'react-router-dom';
const Auction = () => {
    const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
 
    
  
  
  useEffect(() => {
        <div>ffhjfhsj</div>
        // Fetch items from backend API
        axios.get('http://localhost:8080/getitems')

            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }, []);

    const handleSearch = () => {
        // Filter items based on search term
        const filteredItems = items.filter(item =>
            item.itemname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setItems(filteredItems);
    };

    const resetFilters = () => {
        // Reset search term
        setSearchTerm('');
        // Refetch all items from backend
        axios.get('http://localhost:8080/getitems')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    };

    return (

        <div className="auction-container">
            <Navbar/>
          
           <h2 className="auction-title">Auction Items</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search items by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={resetFilters}>Reset</button>
            </div>
    
            <div className="items-container">
                {items.map(item => (

            
                    <div className="item-card" key={item.itemid}>
                        <div className="item-image">
                            <img src={`data:image/jpeg;base64,${item.imageData}`} alt={item.itemname} />
                        </div>
                        <div className="item-details">
                            <h3>{item.itemname}</h3>
                            <p className="item-description">{item.description}</p>
                            <div className="price-info">
                                <p>Starting Price: ${item.startingPrice.toFixed(2)}</p>
                                <p>Current Bid: ${item.currentBid.toFixed(2)}</p>
                            </div>
                            <p className="bid-end-time">Bid End Time: {item.bidEndTime}</p>
                            <Link className="bid-button"  to="/Login" >Place Bid</Link>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Auction;
