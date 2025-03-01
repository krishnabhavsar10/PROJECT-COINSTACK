const { Stock } = require('../models/index');  // Explicitly import Stock from index.js

// const Stock = require('../models/stock');
// const { Stock } = require('../models');  // Assuming `Stock` is exported from `models/index.js`
const StockPrice = require('../models/stockPrice');
const axios = require('axios');
const config = require('../config/config');

// Get all stocks
const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.findAll();
    res.json(stocks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching stocks' });
  }
};

// Get stock details by symbol
const getStockBySymbol = async (req, res) => {
  const { symbol } = req.params;
  
  try {
    const stock = await Stock.findOne({ where: { symbol } });
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.json(stock);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching stock details' });
  }
};

// Add a new stock
const addStock = async (req, res) => {
  const { symbol, name } = req.body;

  try {
    const existingStock = await Stock.findOne({ where: { symbol } });
    if (existingStock) {
      return res.status(400).json({ message: 'Stock already exists' });
    }

    const newStock = await Stock.create({ symbol, name });
    res.status(201).json({ message: 'Stock added successfully', stock: newStock });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while adding stock' });
  }
};

// Get stock price from Alpha Vantage API
const getStockPrice = async (req, res) => {
  const { symbol } = req.params;
  
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: symbol,
        apikey: config.alphaVantageApiKey,
      },
    });

    const priceData = response.data['Time Series (Daily)'];
    if (!priceData) {
      return res.status(404).json({ message: 'Stock price data not found' });
    }

    const latestDate = Object.keys(priceData)[0];
    const latestData = priceData[latestDate];
    
    res.json({
      symbol,
      date: latestDate,
      open: latestData['1. open'],
      high: latestData['2. high'],
      low: latestData['3. low'],
      close: latestData['4. close'],
      volume: latestData['5. volume'],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching stock price' });
  }
};

module.exports = { getAllStocks, getStockBySymbol, addStock, getStockPrice };
