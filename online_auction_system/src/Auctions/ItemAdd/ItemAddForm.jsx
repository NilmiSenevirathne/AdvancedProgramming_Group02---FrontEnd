import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap. css';
export default function ItemAddForm() {


const [item, setItem] = useState({
    itemid: "",
    itemname: "",
    description: "",
    startingPrice: "",
    currentBid: "",
    bidEndTime: "",
    imageData:""

  });

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
    // navigate("/manageitem");
  };


  return (
    <div className='container-fluid'>
        <div className=' justify-content-center'>
            <div className='col-md-12 border rounded p-4 mt-2 shadow' style={{ maxHeight: '80vh', overflowY: 'auto', maxWidth: '1000px' }}>
                <form onSubmit={(e) => onSubmit(e)}>
                <div className='col'>
                <label htmlFor="itemname" className="form-label">itemname</label>
                <input type="text" className='form-control'
                        placeholder='Enter itemname'
                        name="itemname"
                        value={itemname}
                        onChange={(e) => onInputChange(e)}
                />
                </div>
                <div className='col'>
                <label htmlFor="description" className="form-label">description</label>
                <input type="text" className='form-control'
                        placeholder='Enter description'
                        name="description"
                        value={description}
                        onChange={(e) => onInputChange(e)}
                />
                </div>
                <div className='col'>
                <label htmlFor="startingPrice" className="form-label">startingPrice</label>
                <input type="text" className='form-control'
                        placeholder='Enter startingPrice'
                        name="startingPrice"
                        value={startingPrice}
                        onChange={(e) => onInputChange(e)}
                />
                </div>
                <div className='col'>
                <label htmlFor="currentBid" className="form-label">currentBid</label>
                <input type="text" className='form-control'
                        placeholder='Enter currentBid'
                        name="currentBid"
                        value={currentBid}
                        onChange={(e) => onInputChange(e)}
                />
                </div>
                <div className='col'>
                <label htmlFor="bidEndTime" className="form-label">bidEndTime</label>
                <input type="text" className='form-control'
                        placeholder='Enter bidEndTime'
                        name="bidEndTime"
                        value={bidEndTime}
                        onChange={(e) => onInputChange(e)}
                />
                </div>
                <div className='col'>
                <label htmlFor="imageData" className="form-label">imageData</label>
                <input type="text" className='form-control'
                        placeholder='Enter imageData'
                        name="imageData"
                        value={imageData}
                        onChange={(e) => onInputChange(e)}
                />
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}
