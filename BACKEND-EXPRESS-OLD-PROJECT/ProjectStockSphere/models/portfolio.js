module.exports = (sequelize, DataTypes) => {
    const Portfolio = sequelize.define('Portfolio', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      stock_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      symbol: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      total_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_investment: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    }, {
      timestamps: false,  // No timestamps needed for views
      tableName: 'user_portfolios',  // This corresponds to the view in the database
      freezeTableName: true,  // Prevents Sequelize from pluralizing the table name
      underscored: true,  // Converts camelCase to snake_case (optional, depending on preference)
    });
  
    return Portfolio;
  };
  