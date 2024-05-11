import React, { useState } from 'react';
import axios from 'axios';
import  "./bidform.css"

const BidForm = ({ item, userId, onClose }) => {
    const [bidAmount, setBidAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleBidSubmit = (e) => {
        e.preventDefault();

        if (!bidAmount) {
            setMessage('Please enter a bid amount.');
            return;
        }

        if (!userId) {
            setMessage('User ID is not available.');
            return;
        }

        if (parseFloat(bidAmount) <= item.currentBid) {
            setMessage('Bid amount must be greater than the current bid.');
            return;
        }

        axios.post(`http://localhost:8080/placeBid`, {
            item: { itemid: item.itemid },
            user: { userid: userId },
            bidAmount: bidAmount
        })
        
        .then(response => {
            setMessage(response.data);
            setBidAmount('');
            window.location.reload(); // Reload the page after successful bid 
            
        })
        
        .catch(error => {
            console.error('Error placing bid:', error);
            setMessage('Error placing bid. Please try again later.');
        });
    };

    return (
        <div className='bid-form-container'>
            <h3>Place Bid for {item.itemname}</h3>
            <form onSubmit={handleBidSubmit}>
                <div>
                    <label htmlFor="bidAmount">Bid Amount:</label>
                    <input 
                        type="number" 
                        id="bidAmount"
                        value={bidAmount} 
                        onChange={(e) => setBidAmount(e.target.value)} 
                    />
                </div>
                <button type="submit">Place Bid</button>
                <button onClick={onClose}>Cancel</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default BidForm;
