import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css'; // Import Signup styles
import axios from 'axios'; // Import axios for making HTTP requests

const Signup = () => {
    // State variables to store form data, error message, and success message
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make an HTTP POST request to your backend API
            const response = await axios.post('http://localhost:8080/signup', {
                username,
                email,
                password,
                role
            });
            console.log('Signup successful:', response.data);
            setSuccessMessage('Signup successful!'); // Set success message
                 // Clear the form fields
        setUsername('');
        setEmail('');
        setPassword('');

        } catch (error) {
            console.error('Error signing up:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <label htmlFor="role">Role:</label>
                    <input
                        type="text"
                        id="role"
                        placeholder="Enter your role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                <button type="submit">Sign Up</button>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
            </form>
            <p>Already have an account? <Link to="/Login">Login here</Link></p>
        </div>
    );
};

export default Signup;
