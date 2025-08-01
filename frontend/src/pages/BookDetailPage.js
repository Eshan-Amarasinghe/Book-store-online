import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import '../pages/BookDetailPage.css'; 

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        const foundBook = res.data.find(b => b._id === id);
        setBook(foundBook);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching book:', err);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const increment = () => {
    if (book && quantity < book.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...book, quantity });

  };

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="book-details-background">
      <div className="book-details-box">
        <img src={book.thumbnail} alt={book.title} className="book-details-img" />
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Description:</strong> {book.description}</p>
        <p><strong>Price:</strong> Rs. {book.price}</p>
        <p><strong>Stock:</strong> {book.stock > 0 ? `${book.stock} available` : 'Out of stock'}</p>

        <div style={{ margin: '15px 0' }}>
          <button onClick={decrement} disabled={quantity <= 1}>➖</button>
          <span style={{ margin: '0 12px', fontWeight: 'bold' }}>{quantity}</span>
          <button onClick={increment} disabled={quantity >= book.stock}>➕</button>
        </div>

        <button onClick={handleAddToCart}>Add {quantity} to Cart</button>
      </div>
    </div>
  );
};

export default BookDetailPage;
