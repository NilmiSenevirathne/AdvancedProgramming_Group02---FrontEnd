import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post('http://localhost:8080/login', { username, password });
            const user = response.data;
            console.log(user);
            if (user.role === 'customer') {
                onLogin(user); // Pass user data to the parent component
                navigate('/CustomerDashboard');// Navigate to customer dashboard
            }
            else if (user.role === 'admin') {
                onLogin(user); // Pass user data to the parent component
                navigate('/AdminDashboard'); // Navigate to admin dashboard
            }
           
           
        } catch (error) {
            console.log(error);

            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^[a-zA-Z0-9]*$/.test(value) || value === '') {
                                setPassword(value);
                            }
                        }}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    );
};

export default Login;
