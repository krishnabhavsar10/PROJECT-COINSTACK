const axios = require('axios');

// Alpha Vantage API Key from environment variables
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

// Utility function to fetch daily stock prices
const getStockPrice = async (symbol) => {
  try {
    // Construct the API URL with required parameters
    const url = `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${API_KEY}`;

    // Make the API request
    const response = await axios.get(url);

    if (response.data['Time Series (Daily)']) {
      return response.data['Time Series (Daily)'];  // Return the 'Time Series' data (stock prices)
    } else {
      throw new Error('Invalid response from Alpha Vantage');
    }
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
    throw new Error('Failed to fetch stock data');
  }
};

// Utility function to get stock metadata (symbol, name, etc.)
const getStockMetadata = async (symbol) => {
  try {
    // Construct the API URL to fetch stock metadata
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

    // Make the API request
    const response = await axios.get(url);

    if (response.data['Global Quote']) {
      return response.data['Global Quote'];  // Return stock metadata
    } else {
      throw new Error('Invalid response from Alpha Vantage');
    }
  } catch (error) {
    console.error('Error fetching stock metadata:', error.message);
    throw new Error('Failed to fetch stock metadata');
  }
};

module.exports = { getStockPrice, getStockMetadata };
