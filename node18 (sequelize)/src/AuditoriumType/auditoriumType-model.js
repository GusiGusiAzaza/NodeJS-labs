const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')(Sequelize);

const AuditoriumType = sequelize.define('AUDITORIUM_TYPE', {
  AUDITORIUM_TYPE: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  AUDITORIUM_TYPENAME: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = AuditoriumType;
