// Updateitem.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../NavBar/AdminNavbar.jsx';
import './updateitem.css';

const Updateitem = () => {
  const { itemid } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    itemid: itemid,
    itemname: '',
    description: '',
    startingPrice: '',
    bidEndTime: '',
    imageData: '',
  });

  const getItemDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/items/${itemid}`);
      const itemDetails = response.data;
      console.log('item id :', itemid);
      setValues({
        ...values,
        itemname: itemDetails.itemname || '',
        description: itemDetails.description || '',
        startingPrice: itemDetails.startingPrice || '',
        bidEndTime: itemDetails.bidEndTime || '',
        imageData: itemDetails.imageData || '',
      });
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  useEffect(() => {
    getItemDetails();
  }, [itemid]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //update items function
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put(`http://localhost:8080/updateitems/${itemid}`, values);
        alert('Item details updated successfully:', response.data);
        navigate('/AdminDashboard');
    } catch (error) {
      console.error('Error updating item details:', error);
    }
  };

   // Function to handle cancel button click
   const onCancel = () => {
    navigate('/AdminDashboard');
  }; 


  return (
    <div>
      <AdminNavbar />
      <div className="updateform">
        <div className="form-container">
          <form onSubmit={onSubmit} className="bid-form">
            <h2 className="formname">Update Item Details Form</h2>

            {/* Display image */}
            {values.imageData && (
              <div className="mb-3">
                <img src={`data:image/jpeg;base64,${values.imageData}`} alt={values.itemname} className="thumbnail" />
              </div>
            )}
            

            <div className="mb-3">
              <label htmlFor="itemid" className="form-label">
                ItemId
              </label>
              <input
                type="number"
                className="form-control"
                name="itemid"
                value={values.itemid}
                onChange={onInputChange}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="itemname" className="form-label">
                ItemName
              </label>
              <input
                type="text"
                className="form-control"
                name="itemname"
                value={values.itemname}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={values.description}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startingPrice" className="form-label">
                StartingPrice
              </label>
              <input
                type="number"
                className="form-control"
                name="startingPrice"
                value={values.startingPrice}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bidEndTime" className="form-label">
                BidEndTime
              </label>
              <input
                type="datetime-local"
                className="form-control"
                name="bidEndTime"
                value={values.bidEndTime}
                onChange={onInputChange}
              />
            </div>
            <div>
              <button type="submit" className="update-btn">
                Update
              </button>
              <button type="button" onClick={onCancel} className="cancel-btn">
                Cancel
              </button>
                
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Updateitem;
