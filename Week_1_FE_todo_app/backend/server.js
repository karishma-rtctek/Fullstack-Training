const express = require('express'); // to create an express application
const cors = require('cors'); // used to allow different origins (like frontend running on different port) to access backend
const todoRoutes = require('./routes/todos'); // import the todo routes (api endpoints)

// server.js = this file is the entry point of the backend application

const app = express(); // create an express application
const PORT = 5000; // port number where the server will listen

// Middleware
// cors() = it allows cross-origin requests (like requests from frontend running on different port)
// express.json() = it parses incoming JSON requests & puts the parsed data in req.body

app.use(cors());
app.use(express.json());

// ======================== not working fix it later ========================
// // Hello endpoints (Day 3 mini-project)
// app.get('/hello', (req, res) => res.json({ message: "Hello from backend!" }));
// app.get('/time', (req, res) => res.json({ time: new Date() }));

// Todo routes
app.use('/todos', todoRoutes);

app.listen(PORT, () => { // start the server & listen on the specified port
  console.log(`Server running on http://localhost:${PORT}`);
});
