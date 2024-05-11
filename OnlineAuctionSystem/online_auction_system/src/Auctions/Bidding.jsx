import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerDashboard from '../NavBar/CustomerDashboard';
import './bidding.css'; // Import the CSS file

const Bidding = ({ userId }) => {
  const [bidsWithItemDetails, setBidsWithItemDetails] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/bids/${userId}`)
      .then(response => {
        console.log(response.data); 
        setBidsWithItemDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching bid details:', error);
      });
  }, [userId]);

  return (
    <div>
      <CustomerDashboard />
      <h2>Bid Details</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Image</th>
              <th>Bid Amount</th>
              <th>Bid Time</th>
              <th>Bid End Time</th>
            </tr>
          </thead>
          <tbody>
            {bidsWithItemDetails.map(([bid, item]) => (
              <tr key={bid.bidId}>
                <td>{item.itemname}</td>
                <td><img src={`data:image/jpeg;base64,${item.imageData}`} alt={item.itemname} className="thumbnail" /></td>
                <td>{bid.bidAmount}</td>
                <td>{bid.bidTime}</td>
                <td>{item.bidEndTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bidding;
