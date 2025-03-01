module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define('Stock', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      symbol: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,  // Ensures symbol is unique
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true,  // Name is optional
      },
    }, {
      timestamps: false,  
      tableName: 'stocks',
    });
  
    return Stock;
  };
  