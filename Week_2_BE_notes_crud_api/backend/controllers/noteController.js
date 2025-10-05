// Handles the logic for note-related routes

const Note = require('../models/noteModel');

// Create a new note
exports.createNote = (req, res) => {
  const { title, content, userId } = req.body;
  Note.create({ title, content, userId }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Note created', noteId: result.insertId });
  });
};

// Get all notes
exports.getAllNotes = (req, res) => {
  Note.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get single note by ID
exports.getNoteById = (req, res) => {
  const { id } = req.params;
  Note.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

// Update a note
exports.updateNote = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  Note.update(id, { title, content }, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Note updated successfully' });
  });
};

// Delete a note
exports.deleteNote = (req, res) => {
  const { id } = req.params;
  Note.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Note deleted successfully' });
  });
};
