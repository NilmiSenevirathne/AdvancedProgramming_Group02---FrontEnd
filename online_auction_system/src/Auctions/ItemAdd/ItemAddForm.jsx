import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../../NavBar/Navbar';

export default function ItemAddForm() {
    const navigate = useNavigate();


const [item, setItem] = useState({
    itemid: "",
    itemname: "",
    description: "",
    startingPrice: "",
    currentBid: "",
    bidEndTime: "",
    imageData:""

  });

//   const onInputChange = (e) => {
//     if (e.target.name === 'imageData') {
//       // For file inputs, use e.target.files to get the selected file
//       setItem({ ...item, [e.target.name]: e.target.files[0] });
//     } else {
//       // For other inputs, set the value directly
//       setItem({ ...item, [e.target.name]: e.target.value });
//     }
//   };
  

const {itemid,itemname,description,startingPrice,currentBid,bidEndTime,imageData} =item;

 // Function to handle input changes
 const onInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //item form validation- all fields should filled
    if (!itemid || !itemname || !description || !startingPrice || !currentBid || !bidEndTime||!imageData) {
      alert("Please fill in all fields.");
      return;
    }
    
    await axios.post("http://localhost:8080/additem", item);
    navigate("/Auctions");
  };


  return (
    <div className='container-fluid'>
         <Navbar />
         <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '90vh' }}>
            <div className='col-md-5 border rounded p-4 mt-1 shadow' style={{ maxHeight: '110vh', maxWidth: '500px' }}>
            <h2 className='text-center m-4'>Add New Item</h2>

                <form onSubmit={(e) => onSubmit(e)}>
                <div className='col'>
                <label htmlFor="itemname" className="form-label">Item Name</label>
                <input type="text" className='form-control'
                        placeholder='Enter itemname'
                        name="itemname"
                        value={itemname}
                        onChange={(e) => onInputChange(e)}
                />
                </div>
                <div className='col'>
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className='form-control'
                        placeholder='Enter description'
                        name="description"
                        value={description}
                        onChange={(e) => onInputChange(e)}
                />
                </div>
                <div className='col'>
                <label htmlFor="startingPrice" className="form-label">Starting Price</label>
                <input type="text" className='form-control'
                        placeholder='Enter startingPrice'
                        name="startingPrice"
                        value={startingPrice}
                        onChange={(e) => onInputChange(e)}
                />
                </div>
                <div className='col'>
                <label htmlFor="currentBid" className="form-label">Current Bid</label>
                <input type="text" className='form-control'
                        placeholder='Enter currentBid'
                        name="currentBid"
                        value={currentBid}
                        onChange={(e) => onInputChange(e)}
                />
                </div>
                <div className='col'>
                <label htmlFor="bidEndTime" className="form-label">BidEnd Time</label>
                <input type="time" className='form-control'
                        placeholder='Enter bidEndTime'
                        name="bidEndTime"
                        value={bidEndTime}
                        onChange={(e) => onInputChange(e)}
                />
                </div>
                <div className='col'>
                <label htmlFor="imageData" className="form-label">Image Data</label>
                <input type="file" className='form-control-file'
                        name="imageData"
                        onChange={(e) => onInputChange(e)}
                />
                </div>
                <button type="submit" className='btn btn-outline-primary'>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}
