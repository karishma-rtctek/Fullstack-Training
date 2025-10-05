// This file defines SQL queries for notes table operations

const mysql_db_conection = require('../config/db');

// Create table if not exists (notes)
mysql_db_conection.query(`
  CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id)
  )
`);

const Note = {
  // Create a new note
  create: (data, callback) => {
    const sql = 'INSERT INTO notes (title, content, userId) VALUES (?, ?, ?)';
    mysql_db_conection.query(sql, [data.title, data.content, data.userId], callback);
  },

  // Get all notes
  getAll: (callback) => {
    mysql_db_conection.query('SELECT * FROM notes', callback);
  },

  // Get a note by ID
  getById: (id, callback) => {
    mysql_db_conection.query('SELECT * FROM notes WHERE id = ?', [id], callback);
  },

  // Update a note
  update: (id, data, callback) => {
    const sql = 'UPDATE notes SET title = ?, content = ? WHERE id = ?';
    mysql_db_conection.query(sql, [data.title, data.content, id], callback);
  },

  // Delete a note
  delete: (id, callback) => {
    mysql_db_conection.query('DELETE FROM notes WHERE id = ?', [id], callback);
  }
};

module.exports = Note;
