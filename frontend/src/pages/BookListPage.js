import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filterUnder1000, setFilterUnder1000] = useState(false);
  const [filterInStock, setFilterInStock] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const categories = ['All', 'Novels', 'Science Fiction', 'Children', 'Sports'];

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(res => {
        const remainingBooks = res.data.slice(20); 
        console.log('📚 Fetched books:', remainingBooks);
        setBooks(remainingBooks);
        setFilteredBooks(remainingBooks);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    let result = [...books];

    const regex = new RegExp(`\\b${searchTerm.toLowerCase()}`);

    if (selectedCategory !== 'All') {
      result = result.filter(book => book.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    

    if (searchTerm) {
      result = result.filter(book =>
        regex.test(book.title.toLowerCase()) ||
        regex.test(book.author.toLowerCase())
      );
    }

    if (filterUnder1000) {
      result = result.filter(book => book.price < 1000);
    }

    if (filterInStock) {
      result = result.filter(book => book.stock > 0);
    }

    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === 'price') {
      result.sort((a, b) => a.price - b.price);
    }

    setFilteredBooks(result);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, sortBy, filterUnder1000, filterInStock, selectedCategory]);

  return (
    <div>
      {/* CATEGORY BUTTONS */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
  {['All', 'Fiction', 'Science Fiction', 'Novel', 'Sports', 'Children'].map(category => (
    <button
      key={category}
      onClick={() => setSelectedCategory(category)}
      style={{
        padding: '10px 15px',
        margin: '0 5px',
        backgroundColor: selectedCategory === category ? '#007bff' : '#f8f9fa',
        color: selectedCategory === category ? 'white' : '#333',
        border: '1px solid #ccc',
        borderRadius: '20px',
        cursor: 'pointer'
      }}
    >
      {category}
    </button>
  ))}
</div>


      {/* SEARCH BAR */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onSearch={handleSearch}
      />

      {/* FILTER CHECKBOXES */}
      <div style={{ textAlign: 'center', margin: '10px 0' }}>
        <label style={{ marginRight: '20px' }}>
          <input
            type="checkbox"
            checked={filterUnder1000}
            onChange={() => setFilterUnder1000(prev => !prev)}
          />
          {' '}Under Rs.1000
        </label>
        <label>
          <input
            type="checkbox"
            checked={filterInStock}
            onChange={() => setFilterInStock(prev => !prev)}
          />
          {' '}In Stock Only
        </label>
      </div>

      {/* BOOK LIST */}
      <div style={{
        padding: '30px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {loading ? (
          <p>Loading books...</p>
        ) : (
          filteredBooks.map(book => (
            <Link key={book._id} to={`/books/${book._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  backgroundColor: '#fff',
                  transition: 'transform 0.2s',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img
                  src={book.thumbnail || 'https://via.placeholder.com/150x200?text=No+Image'}
                  alt={book.title}
                  style={{
                    width: '100%',
                    height: '270px',
                    objectFit: 'cover',
                    borderRadius: '6px'
                  }}
                />
                <h3 style={{ fontSize: '16px', marginTop: '10px' }}>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Category:</strong> {book.category}</p>
                <p><strong>Price:</strong> Rs. {book.price}</p>
                <p><strong>Stock:</strong> {book.stock}</p>
                <button onClick={(e) => {
                e.preventDefault();
                  addToCart({ ...book, quantity: 1 });  // 👈 force default quantity
                }}>Add to Cart</button>

              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default BookListPage;
