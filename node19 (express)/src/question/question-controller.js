const Question = require('./question-model');

const findOne = async (id) => Question.findOne({where: {question_id: id}})
    .then((question) => {
      if (!question) return null;
      return question;
    })
    .catch((err) => {
      console.log(err);
      return {error: err};
    });

const findAll = async () =>
  Question.findAll({raw: true})
      .then((questions) => questions)
      .catch((err) => {
        console.log(err);
        return {error: err};
      });

const create = async (questionObj) => Question.create(questionObj)
    .then((res) => res.dataValues)
    .catch((err) => {
      console.error(`ERROR: ${err.original.message}`);
      return {error: err.original.message};
    });

const updateOne = async (id, questionObj) => Question.update(questionObj, {
  where: {question_id: id},
}).then((res) => {
  if (JSON.stringify(res) === '[0]') return null;
  return questionObj;
}).catch((err) => {
  console.error(`ERROR: ${err}`);
  return {error: err};
});

const deleteOne = async ( id ) => Question.destroy({
  where: {question_id: id},
}).then((res) => {
  console.log(res);
  if (!res) return null;
  return {deletedRecord: id};
}).catch((err) => {
  console.log(`ERROR: ${err}`);
  return {error: err};
});

module.exports = {
  findAll, create, findOne, updateOne, deleteOne,
};
