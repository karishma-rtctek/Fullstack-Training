const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote
} = require('../controllers/noteController');
const auth = require('../middleware/auth');

// Protect all routes
router.use(auth);

// Get all notes & Create new note
router.route('/')
  .get(getNotes)
  .post(createNote);

// Get, update and delete specific note
router.route('/:id')
  .get(getNote)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;
