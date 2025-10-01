import http from 'http';

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin

  if (req.url === '/hello') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Hello, World!' }));
  } else if (req.url === '/time') {
    res.writeHead(200);
    res.end(JSON.stringify({ time: new Date().toLocaleTimeString() }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
