// Defines all routes related to users

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

module.exports = router;
