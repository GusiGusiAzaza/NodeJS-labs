const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');

const Theme = sequelize.define('Themes_For_Tests', {
  Theme_Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Theme_Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = Theme;
