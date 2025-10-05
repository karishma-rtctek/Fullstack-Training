// Entry point of the application

require('dotenv').config(); // loads the ".env" variables at the very beginning
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.SERVER_PORT || 5000;


// Allow cross-origin requests 

// without cors limitation =
// This allows any "domain" to make requests to backend, which is dangerous 
// it is fine for dev, but risky for prod
app.use(cors()); 



// with cors limitation =
// This allows only our domain (the main real frontend, e.g- https://myntra.com) 
// can call our backend, it is safe for prod

// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173'
// }));



// cors = used to allow cross-origin requests
// (if not used cors, then it shows CORS error, 
// and it happens because our frontend (React app running on http://localhost:5173) 
// is trying to call our backend (Express app running on http://localhost:5000), 
// but the backend isn’t allowing cross-origin requests by default)


// we don't need cors if both frontend and backend are hosted on the same domain
// in production we generally host both frontend and backend on the same domain, 
// so we don't need cors in production


// if we need to host both frontend and backend on the same port no. in production, 
// then what we have to do ? =

// ans = we have to make the build of the "React app" (our frontend) 
// then we will get static files (html, css, js) in the "dist" or "build" folder
// then later we will use that dist or build folder in our "Express app" (our backend)
// that way our backend will serve our frontend static files on the same port no.
// now in this case we don't need cors in production, 
// bec both frontend and backend are now on the same port no.




// Middleware to parse JSON body
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');

// Use routes
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Notes API 🚀');
});




// Serve frontend build folder
app.use(express.static(path.join(__dirname, 'frontend/build')));


// as now our backend is responsible to server the "api routes + frontend routes",
// as already backend was having it's own apis in "routes" folder, 
// and now it included the frontend "dist" or "build" folder also,
// which contains all the "frontend routes" too

// also when we are hosting both frontend and backend on the same port no. along 
// with the "dist" or "build" folder, we need to add frontend routes in backend also
// why this frontend routes are needed in backend ? =
// ans = 
// Frontend routes (/clothes, /cart, /profile) = handled by React
// Backend routes (/api/products, /api/users) = handled by Express
// now as the backend is having the frontend "dist" or "build" folder so, it becomes
// necessary for backend to use frontend’s "index.html" for including all the frontend routes 

// if we don't add the below route, then when we refresh any frontend route
// (e.g- http://localhost:5000/clothes or http://localhost:5000/profile) 
// then it will give 404 error, because backend is not aware of these frontend routes
// so to make backend aware of these frontend routes, we need to add the below route


// Serve frontend for all other routes (rontend fallback route)
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
// });


// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
