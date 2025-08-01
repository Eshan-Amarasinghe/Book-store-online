import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/CheckoutPage.css';

const CheckoutPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paymentMethod: 'cash',
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardHolder: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (cart.length === 0) {
      alert('Cart is empty.');
      return;
    }
  
    const storedUser = JSON.parse(localStorage.getItem('user'));
  
    const order = {
      customer: { 
        userId: storedUser?._id,  // send user ID
        name: formData.name,
        email: formData.email,
        paymentMethod: formData.paymentMethod  // send payment method
      },
      items: cart,
      total: cart.reduce((sum, b) => sum + b.price * b.quantity, 0)
    };
  
    try {
      const res = await axios.post('http://localhost:5000/api/orders', order);  
      alert('Order placed successfully! Invoice: ' + res.data.file);
      navigate('/');
    } catch (err) {
      alert('Failed to place order. Please try again.');
      console.error(err);
    }
  };
  

  return (
    <div
      className="checkout-background"
      style={{
        backgroundImage: `url(https://img.freepik.com/free-photo/checkout-purchase-online-shopping-concept_53876-132182.jpg?semt=ais_hybrid&w=740)`
      }}
    >
      <div className="checkout-box">
        <h2>Checkout 🧾</h2>
        <form onSubmit={handleSubmit} className="checkout-form">
          <input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Your Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>
            Payment Method:
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="cash">Cash on Delivery</option>
              <option value="card">Credit Card</option>
            </select>
          </label>

          {formData.paymentMethod === 'card' && (
            <>
              <input
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
              <input
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleChange}
                required
              />
              <input
                name="cvc"
                placeholder="CVC"
                value={formData.cvc}
                onChange={handleChange}
                required
              />
              <input
                name="cardHolder"
                placeholder="Cardholder Name"
                value={formData.cardHolder}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
