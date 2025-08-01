const express = require('express');
const router = express.Router();
const axios = require('axios');

let cachedBooks = null;

const roundPrice = (price) => {
  const rounded = Math.round(price / 25) * 25;
  return Math.max(rounded, 500); // minimum Rs. 500
};

// Fetch once and cache
const fetchBooksFromGoogle = async () => {
  const categories = ['fiction', 'science fiction', 'novel', 'sports', 'children'];
  let allBooks = [];

  for (const category of categories) {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${category}&maxResults=20`);
    const books = response.data.items.map((item) => ({
      _id: item.id,
      title: item.volumeInfo.title || 'No Title',
      author: item.volumeInfo.authors?.[0] || 'Unknown',
      price: roundPrice(Math.random() * 2000),
      stock: Math.floor(Math.random() * 20 + 1),
      description: item.volumeInfo.description || 'No description available.',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
      category :item.volumeInfo.categories?.[0] || category
    }));
    allBooks.push(...books);
  }

  cachedBooks = allBooks.slice(0, 60); // store only 60 books
};

router.get('/', async (req, res) => {
  try {
    if (!cachedBooks) {
      await fetchBooksFromGoogle();
    }
    res.json(cachedBooks);
  } catch (error) {
    console.error('Book fetch error:', error.message);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

module.exports = router;
