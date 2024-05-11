import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BidForm from './BidForm';
import "./itemdetails.css"
import CustomerDashboard from '../NavBar/CustomerDashboard';
const ItemDetails = ({ userId }) => {
    const [item, setItem] = useState(null);
    const [showBidForm, setShowBidForm] = useState(false); // State to manage the visibility of BidForm
    const { itemId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/${itemId}`)
            .then(response => {
                setItem(response.data);
            })
            .catch(error => {
                console.error('Error fetching item details:', error);
            });
    }, [itemId]);

    const handlePlaceBid = () => {
        setShowBidForm(true); // Show the BidForm when "Place Bid" button is clicked
    };

    const handleCloseBidForm = () => {
        setShowBidForm(false); // Hide the BidForm when closed
    };

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div className="item-details-container">
            
            <h2>{item.itemname}</h2>
            <div className="item-img">
                <img src={`data:image/jpeg;base64,${item.imageData}`} alt={item.itemname} />
            </div>
            <p className="item-description">{item.description}</p>
            <div className="price-info">
                <p>Starting Price: ${item.startingPrice.toFixed(2)}</p>
                <p>Current Bid: ${item.currentBid.toFixed(2)}</p>
            </div>
            <p className="bid-end-time">Bid End Time: {item.bidEndTime}</p>
     
           
                <BidForm item={item} userId={userId} onClose={handleCloseBidForm} />
          

            
        </div>
    );
};

export default ItemDetails;
