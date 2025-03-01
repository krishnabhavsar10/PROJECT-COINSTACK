require('dotenv').config();  // Load environment variables from .env file

const config = {
  // Database Configuration
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },

  // Server Configuration
  server: {
    port: process.env.PORT || 3000,  // Default to 3000 if PORT is not set
    host: process.env.SERVER_HOST || 'localhost',  // Default to 'localhost' if not set
  },

  // Authentication Configuration
  jwtSecret: process.env.JWT_SECRET,

  // Alpha Vantage API Key for fetching stock data
  alphaVantageApiKey: process.env.ALPHA_VANTAGE_API_KEY,
};

module.exports = config;
