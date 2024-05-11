import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './HomePage/Home';

import React, { useState, useEffect } from 'react';
import Signup from './SignUp/Signup';
import Login from "./Login/Login";
import Profile from './Profile/Profile';
import Products from './Auctions/Products';
import CustomerDashboard from './NavBar/CustomerDashboard';
import Bidding from './Auctions/Bidding';
import ItemDetails from './Auctions/ItemDetails';
import BidForm from './Auctions/BidForm';
import AdminDashboard from './NavBar/AdminDashboard';
import Updateitem from './Auctions/Updateitem';
const App= ({ userId }) => {

  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
  
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/Products" element={<Products  userId={userId}/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Login" element={<Login onLogin={handleLogin}/>} />
        <Route path="/Profile" element={<Profile userId={user ? user.userid : null}/>} />
        <Route path="BidForm" element={<BidForm/>}/>
        <Route path="/Bidding" element={<Bidding userId={user ? user.userid : null} />} />
        <Route path="/:itemId" element={<ItemDetails userId={user ? user.userid : null} />} />
        {user && <Route path="/AdminDashboard" element={<AdminDashboard userId={user.userid} userName={user.username} />} />}
        {user && <Route path="/CustomerDashboard" element={<CustomerDashboard userId={user.userid} userName={user.username} />} />}
        <Route path="/itemUpdateform/:itemId" element={<Updateitem/>} />

      </Routes>
   
  );
}

// Define your Home and About components here


export default App;