// todoController.js = it's a bridge between api routes(/todos, /todos/:id, etc.) & the database (simulatedDb here)

// file setup
// fs = used to read & write data in the databse (in our case it's simulatedDb/todos.json file is our db)
const fs = require('fs'); 
const path = require('path');
const filePath = path.join(__dirname, '../simulatedDb/todos.json');

// Helper functions 

// helper function to read data in db (in our case todos.json file is our db)
const readTodos = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// helper function to write data in db (in our case todos.json file is our db)
const writeTodos = (todos) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};




// controller functions = it contains the logic for handling requests & responses for each endpoint

// getTodos = to get all todos texts
// addTodo = to add a new todo texts
// updateTodo = to update an existing todo texts
// deleteTodo = to delete a todo texts

// each function takes req (request) & res (response) as parameters
// req = contains data sent by the client (like request body, params, etc.)
// res = used to send back the response to the client

// Each function reads the current todos from the db, performs the required operation (like add, update, delete), 
// writes the updated todos back to the db, and sends an appropriate response back to the client.
exports.getTodos = (req, res) => {
  const todos = readTodos();
  res.json(todos); 
};

exports.addTodo = (req, res) => {
  const todos = readTodos();
  const newTodo = { id: Date.now(), text: req.body.text, done: false };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
};

exports.updateTodo = (req, res) => {
  const todos = readTodos();
  const index = todos.findIndex(todo => todo.id == req.params.id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...req.body };
    writeTodos(todos);
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

exports.deleteTodo = (req, res) => {
  const todos = readTodos();
  const filtered = todos.filter(todo => todo.id != req.params.id);
  writeTodos(filtered);
  res.json({ message: "Todo deleted" });
};
