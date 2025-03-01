const { User } = require('../models');  // Ensure the correct import
const { Portfolio } = require('../models');  // Ensure correct import
const { Transaction } = require('../models');  // Ensure correct import

// const User = require('../models/user');
// const Portfolio = require('../models/portfolio');
// const Transaction = require('../models/transaction');

// For debugging
console.log("Transaction Model:", Transaction);
// For debugging
console.log("Portfolio Model:", Portfolio); 


// Get the authenticated user's profile
const getUserProfile = async (req, res) => {
  console.log("Decoded JWT user data:", req.user);  // Debugging line
  
  const userId = req.user.id;  // Extracted from JWT token
  console.log("Extracted User ID from token:", userId);  // Debugging line


  try {
    const user = await User.findByPk(userId);
    if (!user) {
        console.log("User not found in database with ID:", userId);  // Debugging line
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching user profile' });
  }
};

// Get the authenticated user's portfolio
const getUserPortfolio = async (req, res) => {
  const userId = req.user.id;  // Extracted from JWT token
  
  try {
    const portfolio = await Portfolio.findAll({
      where: { user_id: userId },
    });
    res.json(portfolio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching user portfolio' });
  }
};

// Add a transaction to the user's portfolio (buy/sell stock)
const addTransaction = async (req, res) => {
  const { stock_id, quantity, price, type } = req.body;
  const userId = req.user.id;

  try {
    const transaction = await Transaction.create({
      user_id: userId,
      stock_id,
      quantity,
      price,
      type,
    });

    // Optionally, update portfolio here as needed
    res.status(201).json({ message: 'Transaction added successfully', transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while adding transaction' });
  }
};

module.exports = { getUserProfile, getUserPortfolio, addTransaction };
