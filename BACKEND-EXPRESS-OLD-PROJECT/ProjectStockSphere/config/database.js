const { Sequelize } = require('sequelize');
const config = require('./config');  // Import the config.js file

// Set up a Sequelize instance using the configuration from config.js
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

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
