const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/invoices', express.static('invoices'));


const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);





// Basic Test Route
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

