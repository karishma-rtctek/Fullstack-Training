const express = require('express');
const router = express.Router();
const { getWeather } = require('../controllers/weatherController');

// Use the controller here
router.get('/', getWeather);

module.exports = router;
