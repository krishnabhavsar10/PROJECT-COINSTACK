module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,  // Ensures username is unique
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,  // Password must not be null
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',  // Default role is 'user'
      },
    }, {
      timestamps: false,  
      tableName: 'users',  
    });
  
    return User;
  };
  

//   createdAt: 'created_at',  // Optional: Rename createdAt field
//   updatedAt: false,  // Optional: Disable automatic `updatedAt`