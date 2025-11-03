const Note = require('../models/Note');

// Get all notes
const getNotes = async (req, res) => {
  console.log('📝 Getting notes for user:', req.user.userId);
  try {
    const notes = await Note.find({ userId: req.user.userId });
    console.log(`📋 Found ${notes.length} notes`);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new note
const createNote = async (req, res) => {
  console.log('📝 Creating new note');
  try {
    const { title, content } = req.body;
    console.log('📝 Note details:', { title, contentLength: content.length });
    const note = new Note({
      title,
      content,
      userId: req.user.userId
    });
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single note
const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { $set: req.body },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote
};
