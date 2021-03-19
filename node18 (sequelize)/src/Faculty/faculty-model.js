const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')(Sequelize);

const Faculty = sequelize.define('FACULTY', {
  FACULTY: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  FACULTY_NAME: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = Faculty;
