// This file defines the SQL queries for user table operations

const mysql_db_conection = require('../config/db');

// Create table if not exists (users)
mysql_db_conection.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
  )
`);

const User = {
  // Create a new user
  create: (data, callback) => {
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    mysql_db_conection.query(sql, [data.name, data.email], callback);
  },

  // Get all users
  getAll: (callback) => {
    mysql_db_conection.query('SELECT * FROM users', callback);
  },

  // Get a single user by ID
  getById: (id, callback) => {
    mysql_db_conection.query('SELECT * FROM users WHERE id = ?', [id], callback);
  }
};

module.exports = User;
