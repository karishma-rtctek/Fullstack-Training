const express = require('express'); // to create router
const router = express.Router(); // create a router object
const todoController = require('../controllers/todoController'); // import the todoController

// todos.js = this file is used to create the endpoints for todo related operations (like get, post, put, delete)

// CRUD routes
router.get('/', todoController.getTodos);
router.post('/', todoController.addTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router; // export the router object so it can be used in other files (like server.js)
