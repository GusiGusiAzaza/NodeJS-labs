const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')(Sequelize);
const Faculty = require('../Faculty/faculty-model');

const Pulpit = sequelize.define('PULPIT', {
  PULPIT: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  PULPIT_NAME: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

Faculty.hasMany(Pulpit, { as: 'pulpit_faculty', foreignKey: 'FACULTY', sourceKey: 'FACULTY' });

module.exports = Pulpit;
