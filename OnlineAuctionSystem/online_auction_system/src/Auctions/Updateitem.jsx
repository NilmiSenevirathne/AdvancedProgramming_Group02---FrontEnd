import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AdminNavbar from '../NavBar/AdminNavbar.jsx';
import './updateitem.css';

const Updateitem = () => {
  const { itemid } = useParams();

  const [values, setValues] = useState({
    itemname: '',
    description: '',
    startingPrice: '',
    bidEndTime: '',
    imageData: '',
  });

  useEffect(() => {
    // Ensure itemid is defined before making the request
    if (itemid) {
      axios.get(`http://localhost:8080/viewitems/${itemid}`)
        .then(response => {
          const { itemname, description, startingPrice, bidEndTime } = response.data;
          setValues({
            ...values,
            itemname: itemname,
            description: description,
            startingPrice: startingPrice,
            bidEndTime: new Date(bidEndTime).toISOString().slice(0, -1)
          });
        })
        .catch(error => {
          console.error("Error fetching item details:", error);
        });
    }
  }, [itemid]);

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    console.log('Form submitted:', values);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="updateform">
        <h2 className="formname">Update Item Details Form </h2>
        <div className="form-container">
          <form onSubmit={onSubmit} className="bid-form">
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
              <button type="reset" className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Updateitem;
