import React, { useState } from 'react';
import axios from 'axios';
import '../pages/RegisterPage.css'

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-background" style={{
      minHeight: '100vh',
      backgroundImage: 'url(https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1740&q=80)',
     
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} style={styles.input} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} required />
          <button type="submit" style={styles.button}>Register</button>
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

export default RegisterPage;
