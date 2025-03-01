const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to fetch the authenticated user's profile
router.get('/profile', userController.getUserProfile);

// Route to fetch the authenticated user's portfolio
router.get('/portfolio', userController.getUserPortfolio);

// Route to add a transaction to the user's portfolio (buy/sell stock)
router.post('/portfolio/transaction', userController.addTransaction);

module.exports = router;
