import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ background: '#343a40', color: '#fff', padding: '40px 20px', marginTop: '30px' }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-around' }}>
      {/* Contact */}
      <div>
        <h4>Contact Us</h4>
        <p>📍 217 Olcott Mawatha, Colombo 01100, Sri Lanka</p>
        <p>📞 +94 11 2323 981</p>
        <p>📧 onlinebookstore@gmail.com</p>
        <p>🕒 Mon - Sat / 8:00 AM - 5:00 PM</p>
      </div>

      {/* Quick Links */}
      <div>
        <h4>Quick Links</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/" style={{ color: '#fff' }}>Home</Link></li>
          <li><Link to="/books" style={{ color: '#fff' }}>Books</Link></li>
          <li><Link to="/cart" style={{ color: '#fff' }}>Cart</Link></li>
          <li><Link to="/checkout" style={{ color: '#fff' }}>Checkout</Link></li>
          <li><Link to="/login" style={{ color: '#fff' }}>Login</Link></li>
          <li><Link to="/register" style={{ color: '#fff' }}>Register</Link></li>
        </ul>
      </div>

      {/* My Account */}
      <div>
        <h4>My Account</h4>
        <Link to="/profile" style={{ color: '#fff' }}>My Profile</Link>
      </div>

      {/* Google Map */}
      <div>
        <h4>Our Location</h4>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126754.82018970605!2d79.8082267!3d6.9331669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2592f8c5e12d7%3A0x128c3b2f730540d6!2sPettah%2C%20Colombo!5e0!3m2!1sen!2slk!4v1714576981199!5m2!1sen!2slk"
          width="250"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>
    </div>
    <div style={{ background: '#222', textAlign: 'center', padding: '10px', marginTop: '20px' }}>
      © 2025 Online Book Store. All Rights Reserved
    </div>
  </footer>
);

export default Footer;
