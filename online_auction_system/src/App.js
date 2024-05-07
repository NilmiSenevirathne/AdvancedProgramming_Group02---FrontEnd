import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './HomePage/Home';
import ReactDOM from 'react-dom/client';
import Auction  from './Auctions/Auction';
import Signup from './SignUp/Signup';
import Login from "./Login/Login";
import ItemAddForm from './Auctions/ItemAdd/ItemAddForm';
function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auctions" element={<Auction/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/ItemAdd" element={<ItemAddForm/>} />

      </Routes>
   
  );
}

// Define your Home and About components here


export default App;