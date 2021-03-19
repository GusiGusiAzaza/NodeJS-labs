const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const User = require('../user/user-model');

const Admin = sequelize.define('Admins', {
  Admin_Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  User_Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

User.hasMany(Admin, {as: 'admin_user', foreignKey: 'User_Id', sourceKey: 'User_Id'});

module.exports = Admin;
