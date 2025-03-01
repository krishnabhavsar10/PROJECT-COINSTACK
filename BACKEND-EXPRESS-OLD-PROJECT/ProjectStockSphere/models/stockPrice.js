module.exports = (sequelize, DataTypes) => {
    const StockPrice = sequelize.define('StockPrice', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      stock_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'stocks',  // References the 'stocks' table
          key: 'id',        // The 'id' field in the 'stocks' table
        },
      },
      date: {
        type: DataTypes.DATEONLY,  // Stores date without time
        allowNull: false,
      },
      open: {
        type: DataTypes.DECIMAL(10, 2),  // Represents opening price
        allowNull: true,
      },
      high: {
        type: DataTypes.DECIMAL(10, 2),  // Represents highest price of the day
        allowNull: true,
      },
      low: {
        type: DataTypes.DECIMAL(10, 2),  // Represents lowest price of the day
        allowNull: true,
      },
      close: {
        type: DataTypes.DECIMAL(10, 2),  // Represents closing price
        allowNull: true,
      },
      volume: {
        type: DataTypes.BIGINT,  // Represents trading volume
        allowNull: true,
      },
    }, {
      timestamps: false,  // No need for automatic timestamps
      tableName: 'stock_prices',  // Explicitly define table name
      indexes: [
        {
          unique: true,
          fields: ['stock_id', 'date'],  // Ensure each stock has only one record per date
        },
      ],
    });
  
    return StockPrice;
  };
  