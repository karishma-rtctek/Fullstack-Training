const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const noteRoutes = require('./routes/notes');
const blogRoutes = require('./routes/blog');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(require('./middleware/requestLogger'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/blog', blogRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  console.log('🟢 GET: Home endpoint accessed');
  res.json({ message: 'Welcome to the Fullstack App API' });
  res.json({ message: 'Welcome to the Fullstack App API' });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log('🟢 GET: Test endpoint accessed');
  res.json({ 
    status: 'success',
    message: 'Backend is running correctly!',
    timestamp: new Date()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
