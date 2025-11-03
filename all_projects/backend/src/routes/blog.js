const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/blogController');
const auth = require('../middleware/auth');

// Get all posts (public)
router.get('/', getPosts);

// Get single post (public)
router.get('/:id', getPost);

// Protect other routes
router.use(auth);

// Create new post
router.post('/', createPost);

// Update and delete specific post
router.route('/:id')
  .put(updatePost)
  .delete(deletePost);

module.exports = router;
