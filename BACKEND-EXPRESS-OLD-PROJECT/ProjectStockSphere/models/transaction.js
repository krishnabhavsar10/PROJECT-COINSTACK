module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',  // References the 'users' table
          key: 'id',       // The 'id' field in the 'users' table
        },
      },
      stock_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'stocks',  // References the 'stocks' table
          key: 'id',        // The 'id' field in the 'stocks' table
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Quantity is mandatory
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),  // Price per stock share
        allowNull: false,  // Price is mandatory
      },
      type: {
        type: DataTypes.ENUM('buy', 'sell'),  // Transaction type (buy or sell)
        allowNull: false,  // Type is mandatory
      },
      transaction_date: {
        type: DataTypes.DATEONLY,  // Use DATEONLY to store only the date part
        allowNull: false,          // Ensure the field is not nullable
        defaultValue: DataTypes.NOW,  // Automatically set to current date
      },
    }, {
      timestamps: false,  // Enable default Sequelize timestamps
      tableName: 'transactions',  // Explicitly define table name
    });
  
    return Transaction;
  };
  