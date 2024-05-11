import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../NavBar/AdminNavbar.jsx';
import { Link } from 'react-router-dom';
import './admindash.css';

const AdminDashboard = () => {
  const [itemdetails, setItemDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/items')
      .then(response => {
        console.log(response.data);
        setItemDetails(response.data);
      })
      .catch(error => {
        console.error("Error fetching item details:", error);
      });
  }, []);

  const handleDelete = (itemId) => {
    axios.delete(`http://localhost:8080/items/${itemId}`)
      .then(response => {
        console.log(response.data);
        setItemDetails(itemdetails.filter(item => item.id !== itemId));
      })
      .catch(error => {
        console.error("Error deleting item:", error);
        alert("An error occurred while deleting the item. Please try again later.");
      });
  };

  return (
    <div>
      <AdminNavbar />
      <div className='itemdetails'>
        <h2>Item Details</h2>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Image</th>
              <th>Description</th>
              <th>Starting Price</th>
              <th>Bid End Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {itemdetails.map(item => (
              <tr key={item.id}>
                <td>{item.itemname}</td>
                <td><img src={`data:image/jpeg;base64,${item.imageData}`} alt={item.itemname} className="thumbnail" /></td>
                <td>{item.description}</td>
                <td>{item.startingPrice}</td>
                <td>{item.bidEndTime}</td>
                <td>
                  <Link to={`/updateitem/${item.id}`}><button className='btnupdate'>Update</button></Link>
                  <button onClick={() => handleDelete(item.id)} className='btndelete'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
