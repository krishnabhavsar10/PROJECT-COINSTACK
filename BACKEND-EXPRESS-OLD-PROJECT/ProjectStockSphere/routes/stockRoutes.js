const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Route to fetch all stocks
router.get('/', stockController.getAllStocks);

// Route to fetch a specific stock's details by symbol
router.get('/:symbol', stockController.getStockBySymbol);

// Route to add a new stock to the database
router.post('/', stockController.addStock);

// Route to get the current stock price
router.get('/:symbol/price', stockController.getStockPrice);

module.exports = router;
