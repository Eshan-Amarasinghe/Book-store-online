import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';  // make sure react-icons installed

const NavBar = () => {
  const navStyle = {
    backgroundColor: '#343a40',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const linksStyle = {
    display: 'flex',
    gap: '15px'
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold'
  };

  return (
    <nav style={navStyle}>
      <div style={linksStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/books" style={linkStyle}>Books</Link>
        <Link to="/cart" style={linkStyle}>Cart</Link>
        <Link to="/checkout" style={linkStyle}>Checkout</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
      </div>

      <div>
        <Link to="/profile" style={{ color: '#fff', fontSize: '1.8rem' }}>
          <FaUserCircle />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
