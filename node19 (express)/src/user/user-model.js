const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');

const User = sequelize.define('Users', {
  User_Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Password_Hash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = User;
