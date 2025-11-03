const express = require('express');
const router = express.Router();
const { 
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const auth = require('../middleware/auth');

// Protect all routes
router.use(auth);

// Get all tasks & Create new task
router.route('/')
  .get(getTasks)
  .post(createTask);

// Get, update and delete specific task
router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
