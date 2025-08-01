import React, { useState } from 'react';
import axios from 'axios';
import '../pages/LoginPage.css'; 
import { useNavigate } from 'react-router-dom'; // navigation hook

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Login response:', res.data);

      //Save token
      localStorage.setItem('token', res.data.token);

      // Save entire user object 
      const userObj = {
        _id: res.data._id,
        username: res.data.username,
        email: res.data.email
      };
      localStorage.setItem('user', JSON.stringify(userObj));

      setMessage(`✅ Welcome, ${res.data.username}!`);

      setTimeout(() => {
        navigate('/books');
      }, 1000);

    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      className="login-background"
      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1524995997946-a1c2e315a42f)` }}
    >
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #aaa'
  },
  button: {
    padding: '10px',
    backgroundColor: '#343a40',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    borderRadius: '5px'
  },
  message: {
    marginTop: '15px',
    color: '#28a745',
    fontWeight: 'bold'
  }
};

export default LoginPage;
