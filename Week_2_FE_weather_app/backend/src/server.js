// backend/src/server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route (dynamic city via query param)
app.get('/', (req, res) => {
  const city = req.query.city || 'delhi'; // default city = delhi
  res.send(`Server is running. Weather API endpoint: http://localhost:${process.env.PORT || 8000}/api/weather?city=${city}`);
});

// Import weather route (correct path)
const weatherRoutes = require('../routes/weatherRoutes');
app.use('/api/weather', weatherRoutes);

// Placeholder for future features
// const todoRoutes = require('./routes/todo.routes');
// app.use('/api/todos', todoRoutes);

// Port
const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
