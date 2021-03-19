const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')(Sequelize);
const AuditoriumType = require('../AuditoriumType/auditoriumType-model');

const Auditorium = sequelize.define('AUDITORIUM', {
  AUDITORIUM: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  AUDITORIUM_NAME: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  AUDITORIUM_CAPACITY: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

AuditoriumType.hasMany(Auditorium, { as: 'audit_auditType', foreignKey: 'AUDITORIUM_TYPE', sourceKey: 'AUDITORIUM_TYPE' });

module.exports = Auditorium;
