// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');  // Middleware to check authentication
const userController = require('../controllers/userController');  // Assuming you have a userController

// Example route for fetching user profile
router.get('/:id', authenticate, userController.getUserProfile);  // Protect the route with authentication

module.exports = router;
