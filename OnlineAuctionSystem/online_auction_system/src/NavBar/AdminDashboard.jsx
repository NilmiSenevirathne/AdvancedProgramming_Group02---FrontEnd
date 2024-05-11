import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../NavBar/AdminNavbar.jsx';
import { Link } from 'react-router-dom';
import './admindash.css'

const AdminDashboard = () => {
  const [itemdetails, setItemDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/getitems')
      .then(response => {
        console.log(response.data);
        setItemDetails(response.data);
      })
      .catch(error => {
        console.error("error fetching item details:", error);
      });
  }, []);

  // // Function to handle delete button click
  // const handleDelete = (itemId) => {
  //   axios.delete(`http://localhost:8080/deleteitem/${itemId}`)
  //     .then(response => {
  //       console.log(response.data);
  //       // Remove the deleted item from the state
  //       setItemDetails(itemdetails.filter(item => item.itemid !== itemId));
  //     })
  //     .catch(error => {
  //       console.error("error deleting item:", error);
  //     });
  // };

  return (
    <div>
      <AdminNavbar />
      <div className='itemdetails'>
        <h2>Item Details</h2>
        <table>
          <thead>
            <tr>
              <th>Item Id</th>
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
              <tr key={item.itemid}>
                <td>{item.itemid}</td>
                <td>{item.itemname}</td>
                <td><img src={`data:image/jpeg;base64,${item.imageData}`} alt={item.itemname} className="thumbnail" /></td>
                <td>{item.description}</td>
                <td>{item.startingPrice}</td>
                <td>{item.bidEndTime}</td>
                <td>
                  {/* handleUpdate and handleDelete functions */}
                  <Link to={`/itemUpdateform/${item.itemid}`}><button className='btnupdate'>Update</button></Link>
                  {/* <button onClick={() => handleDelete(item.itemid)} className='btndelete'>Delete</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
