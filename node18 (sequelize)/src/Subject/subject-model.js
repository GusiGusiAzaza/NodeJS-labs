const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')(Sequelize);
const Pulpit = require('../Pulpit/pulpit-model');

const Subject = sequelize.define('SUBJECT', {
  SUBJECT: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  SUBJECT_NAME: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

Pulpit.hasMany(Subject, { as: 'subject_pulpit', foreignKey: 'PULPIT', sourceKey: 'PULPIT' });

module.exports = Subject;
