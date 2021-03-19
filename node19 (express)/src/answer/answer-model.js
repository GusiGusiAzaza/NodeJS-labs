const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Question = require('../question/question-model');

const Answer = sequelize.define('Answers_For_Tests', {
  Answer_Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Answer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Is_Right: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Question_Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

Question.hasMany(Answer, {as: 'answer_question_fk', foreignKey: 'Question_Id', sourceKey: 'Question_Id'});

module.exports = Answer;
