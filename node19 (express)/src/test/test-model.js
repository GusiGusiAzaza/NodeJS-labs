const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Admin = require('../admin/admin-model');
const Theme = require('../theme/theme-model');

const Test = sequelize.define('Tests', {
  Test_Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Admin_Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Test_Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Theme_Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Time_Limit_In_Minutes: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Passing_Score: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  Is_Enabled: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

Admin.hasMany(Test, {as: 'test_admin_fk', foreignKey: 'Admin_Id', sourceKey: 'Admin_Id'});
Theme.hasMany(Test, {as: 'test_theme_fk', foreignKey: 'Theme_Id', sourceKey: 'Theme_Id'});

module.exports = Test;
