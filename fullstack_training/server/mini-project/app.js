import http from 'http';

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Hello World!' }));
  } else if (req.url === '/api/greetings') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Hello from the API!' }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Mini-project server running at http://localhost:${PORT}/`);
});
