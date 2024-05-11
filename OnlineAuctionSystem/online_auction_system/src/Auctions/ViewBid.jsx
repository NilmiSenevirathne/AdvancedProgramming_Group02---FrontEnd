import React, { useState, useEffect } from 'react';
import AdminNavbar from '../NavBar/AdminNavbar.jsx';
import axios from 'axios';

const ViewBid = ({ userId }) => {
  const [bidsWithItemDetails, setBidsWithItemDetails] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/allbids`)
      .then(response => {
        console.log(response.data); 
        setBidsWithItemDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching bid details:', error);
      });
  }, []);

  return (
    <div>
      <AdminNavbar/>
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
            {bidsWithItemDetails.map((bid, index) => (
              <tr key={index}>
                <td>{bid.item && bid.item.itemname}</td>
                <td>
                  {bid.item && bid.item.imageData ? (
                    <img src={`data:image/jpeg;base64,${bid.item.imageData}`} alt={bid.item && bid.item.itemname} className="thumbnail" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{bid.bidAmount}</td>
                <td>{bid.bidTime}</td>
                <td>{bid.item && bid.item.bidEndTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewBid;
