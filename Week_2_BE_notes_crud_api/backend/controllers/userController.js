// Handles the logic for user-related routes

const User = require('../models/userModel');

// Create a new user
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  User.create({ name, email }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User created successfully', userId: result.insertId });
  });
};

// Get all users
exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get single user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};
