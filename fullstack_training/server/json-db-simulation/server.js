import http from 'http';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'server', 'json-db-simulation', 'db.json');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Get all users
  if (req.url === '/users' && req.method === 'GET') {
    fs.readFile(DB_PATH, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to read database' }));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  } 
  // Add a new user
  else if (req.url === '/users' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      fs.readFile(DB_PATH, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Failed to read database' }));
          return;
        }
        const db = JSON.parse(data);
        const newUser = JSON.parse(body);
        newUser.id = db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1;
        db.users.push(newUser);

        fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), err => {
          if (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Failed to write to database' }));
            return;
          }
          res.writeHead(201);
          res.end(JSON.stringify(newUser));
        });
      });
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`JSON DB simulation server running at http://localhost:${PORT}/`);
});
