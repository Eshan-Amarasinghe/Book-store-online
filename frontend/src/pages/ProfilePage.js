import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css'; // 

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true); // to show loading state

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('No token found → redirect to login?');
      setLoading(false);
      return;
    }

    // Fetch user info using token
    axios.get('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUser(res.data);
      setFormData({ username: res.data.username, email: res.data.email });

      // fetch orders
      return axios.get(`http://localhost:5000/api/orders?userId=${res.data._id}`);
    })
    .then(res => {
      setOrders(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error loading profile:', err);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    // update user state
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    alert('Profile updated (local only)!');
    setEditing(false);
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found. Please log in again.</p>;

  return (
    <div className="profile-background">
      <div className="profile-page">
        <h2>👤 My Profile</h2>
        {editing ? (
          <div className="profile-edit">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <button onClick={handleSave}>Save Changes</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div className="profile-details">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          </div>
        )}

        <h3>📝 Order History</h3>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul className="order-list">
            {orders.map((order, idx) => (
              <li key={idx}>
                <strong>Order #{order._id}</strong><br />
                Date: {order.date} <br />
                Total: Rs. {order.total}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
