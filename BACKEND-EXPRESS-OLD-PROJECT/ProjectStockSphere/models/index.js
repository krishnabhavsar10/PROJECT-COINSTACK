const Sequelize = require('sequelize');
const config = require('../config/config');
const sequelize = new Sequelize(
  config.db.database,    // Database name
  config.db.user,        // Database user
  config.db.password,    // Database password
  {
    host: config.db.host,  // Database host
    dialect: 'mysql',      // Dialect (MySQL in this case)
    port: config.db.port,  // Database port (default MySQL port is 3306)
    logging: false,        // Disable Sequelize logging, you can enable it if needed
  }
);

// Import models
const User = require('./user')(sequelize, Sequelize.DataTypes);
const Stock = require('./stock')(sequelize, Sequelize.DataTypes);
const StockPrice = require('./stockPrice')(sequelize, Sequelize.DataTypes);
const Transaction = require('./transaction')(sequelize, Sequelize.DataTypes);
const Portfolio = require('./portfolio')(sequelize, Sequelize.DataTypes);

// Define associations (relationships)
User.hasMany(Transaction, { foreignKey: 'user_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

Stock.hasMany(Transaction, { foreignKey: 'stock_id' });
Transaction.belongsTo(Stock, { foreignKey: 'stock_id' });

Stock.hasMany(StockPrice, { foreignKey: 'stock_id' });
StockPrice.belongsTo(Stock, { foreignKey: 'stock_id' });

User.hasMany(Portfolio, { foreignKey: 'user_id' });
Portfolio.belongsTo(User, { foreignKey: 'user_id' });

Stock.hasMany(Portfolio, { foreignKey: 'stock_id' });
Portfolio.belongsTo(Stock, { foreignKey: 'stock_id' });

// Sync all models with the database (creates tables if they don't exist)
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced!');
}).catch((err) => {
  console.error('Error syncing database:', err);
});

module.exports = { sequelize, User, Stock, StockPrice, Transaction, Portfolio };
