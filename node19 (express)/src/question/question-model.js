const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Test = require('../test/test-model');

const Question = sequelize.define('Questions_For_Tests', {
  Question_Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Test_Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Question_Number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Question: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

Test.hasMany(Question, {as: 'question_test_fk', foreignKey: 'Test_Id', sourceKey: 'Test_Id'});

module.exports = Question;
