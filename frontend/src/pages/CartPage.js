import React from 'react';
import { useCart } from '../context/CartContext';
import '../pages/CartPage.css';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

  const total = cart.reduce((sum, book) => sum + (book.price * book.quantity), 0);

  return (
    <div className="cart-background" style={{
      backgroundImage: `url(https://images.unsplash.com/photo-1660083343890-747a6b310328?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI2fHxib29rcyUyMG9uJTIwYSUyMHNob3BwaW5nJTIwY2FydHxlbnwwfHwwfHx8MA%3D%3D)`
    }}>
      <div className="cart-box">
        <h2>🛒 Your Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map(book => (
              <div key={book._id} className="cart-item">
                <h3>{book.title}</h3>
                <p>Price per item: Rs. {book.price}</p>
                <div>
                  <button onClick={() => decrementQuantity(book._id)} disabled={book.quantity <= 1}>–</button>
                  <span style={{ margin: '0 10px' }}>Qty: {book.quantity}</span>
                  <button onClick={() => incrementQuantity(book._id)}>+</button>
                </div>
                <p>Total for this item: Rs. {book.price * book.quantity}</p>
                <button
                  onClick={() => removeFromCart(book._id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <h3>Grand Total: Rs. {total}</h3>
            <Link to="/checkout">
              <button style={{
                padding: '12px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px'
              }}>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
