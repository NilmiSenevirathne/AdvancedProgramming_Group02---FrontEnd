import React, { useState } from 'react';
import AdminNavbar from '../NavBar/AdminNavbar.jsx';
import './updateitem.css';

const Updateitem = () => {
  // Define state variables for form input values
  const [values, setValues] = useState({
    itemid: '',
    itemname: '',
    description: '',
    startingPrice: '',
    bidEndTime: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8080/items/${id}')
      .then(response => {
        console.log(response.data);
        setItemDetails(response.data);
      })
      .catch(error => {
        console.error("error fetching item details:", error);
      });
  }, []);

  // Function to handle form input changes
  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
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
          <div className="image-container">
            
          </div>
          <form onSubmit={onSubmit} className="bid-form">
            <div className="mb-3">
              <label htmlFor="itemid" className="form-label">
                ItemId
              </label>
              <input
                type="number"
                className="form-control"
                name="itemid"
                value={values.itemid}
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
              <label htmlFor="currentBid" className="form-label">
                CurrentBid
              </label>
              <input
                type="number"
                className="form-control"
                name="currentBid"
                value={values.currentBid}
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
                readOnly
              />
            </div>
            <div>
              <button type="submit" className="update-btn">
                Update
              </button>
              <button type="submit" className="cancel-btn">
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
