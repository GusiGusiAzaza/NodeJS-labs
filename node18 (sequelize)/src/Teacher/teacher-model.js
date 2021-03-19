const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')(Sequelize);
const Pulpit = require('../Pulpit/pulpit-model');

const Teacher = sequelize.define('TEACHER', {
  TEACHER: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  TEACHER_NAME: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

Pulpit.hasMany(Teacher, { as: 'teacher_pulpit', foreignKey: 'PULPIT', sourceKey: 'PULPIT' });

module.exports = Teacher;
