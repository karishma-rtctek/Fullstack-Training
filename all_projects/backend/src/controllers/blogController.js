const BlogPost = require('../models/BlogPost');

// Get all posts
const getPosts = async (req, res) => {
  console.log('📚 Getting all blog posts');
  try {
    const posts = await BlogPost.find().populate('author', 'username');
    console.log(`📚 Found ${posts.length} posts`);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new post
const createPost = async (req, res) => {
  console.log('📝 Creating new blog post');
  try {
    const { title, content, tags } = req.body;
    console.log('📝 Post details:', { title, contentLength: content.length });
    const post = new BlogPost({
      title,
      content,
      tags,
      author: req.user.userId
    });
    const newPost = await post.save();
    await newPost.populate('author', 'username');
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single post
const getPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update post
const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { _id: req.params.id, author: req.user.userId },
      { $set: req.body },
      { new: true }
    ).populate('author', 'username');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findOneAndDelete({ _id: req.params.id, author: req.user.userId });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost
};
