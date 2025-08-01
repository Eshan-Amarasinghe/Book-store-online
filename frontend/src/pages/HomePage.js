import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(res => setBooks(res.data.slice(0, 50))) // Load top 50
      .catch(err => console.error('Error loading books:', err));
  }, []);

  const styles = {
    container: {
      padding: '40px',
      textAlign: 'center',
      maxWidth: '600px',
      margin: 'auto'
    },
    text: {
      fontSize: '20px',
      color: '#333',
      marginTop: '10px'
    }
  };

  return (
    <div>
      <div style={{
        background: 'linear-gradient(to right, rgb(143, 218, 228), rgb(248, 102, 241))',
        padding: '10px',
      }}>
        <div className="homepage-welcome">
  <h1>📚 Welcome to the <span>Online Bookstore</span></h1>
  <p>Browse your favorite books, add them to your cart, and download your invoice at checkout.</p>
  <p>Register or Login to begin your reading journey! 📖</p>
</div>

      </div>

      <div className="homepage">
        {/* 📸 Auto-Scrolling Banner */}
        <div className="banner-strip">
          <div className="banner-scroll">
            {books.slice(0, 10).map(book => (
              <img
                key={book._id}
                src={book.thumbnail}
                alt={book.title}
                className="banner-book"
              />
            ))}
            {/* duplicate the 10 books for seamless loop */}
            {books.slice(0, 10).map(book => (
              <img
                key={book._id + '_dup'} // unique key
                src={book.thumbnail}
                alt={book.title}
                className="banner-book"
              />
            ))}
          </div>
        </div>

        {/* Featured Books Scroll Row */}
        <h2 className="section-title">📚 Featured Books</h2>
        <div className="featured-scroll">
          {books.slice(0, 30).map(book => (
            <Link key={book._id} to={`/books/${book._id}`} className="featured-card">
              <img src={book.thumbnail} alt={book.title} className="featured-img" />
              <p className="featured-title">{book.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
