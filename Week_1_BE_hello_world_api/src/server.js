// This loads the built-in http module, (http module is used to create the server)
const http = require('http');

// Define the server
const server = http.createServer((req, res) => {
  // Set response header to JSON
  res.setHeader('Content-Type', 'application/json');

  // Routes
  if (req.url === '/hello' && req.method === 'GET') {
    res.writeHead(200); // status code 200 OK
    res.end(JSON.stringify({ message: 'Hello World' }));
  } else if (req.url === '/time' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ time: new Date().toISOString() }));
  } else {
    // 404 for other routes
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
