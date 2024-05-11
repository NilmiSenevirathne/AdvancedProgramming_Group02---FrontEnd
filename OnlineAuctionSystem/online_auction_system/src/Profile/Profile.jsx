import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.css';
import CustomerDashboard from '../NavBar/CustomerDashboard';

const Profile = ({ userId }) => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Fetch user data
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${userId}`);
                setUserData(response.data);
                setError('');
                setUsername(response.data.username);
                setEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUserData(null);
                setError('User not found');
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/user/${userId}`, { username, email });
            
            setError('');
        } catch (error) {
            console.error('Error updating user data:', error);
            setError('Failed to update user details');
        }
    };

    return (
        <div className="profile-container">
         
            <h1>User Profile</h1>
            {error && <p className="error-message">Error: {error}</p>}
            {userData && (
                <div className="user-details">
                    <h2>User Details:</h2>
                    <form onSubmit={handleSubmit}>
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
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Update Profile</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Profile;
