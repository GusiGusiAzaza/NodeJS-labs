const Answer = require('./answer-model');

const findOne = async (id) => Answer.findOne({where: {answer_id: id}})
    .then((answer) => {
      if (!answer) return null;
      return answer;
    })
    .catch((err) => {
      console.log(err);
      return {error: err};
    });

const findAll = async () =>
  Answer.findAll({raw: true})
      .then((users) => users)
      .catch((err) => {
        console.log(err);
        return {error: err};
      });

const create = async (answerObj) => Answer.create(answerObj)
    .then((res) => res.dataValues)
    .catch((err) => {
      console.error(`ERROR: ${err}`);
      return {error: err.message};
    });

const updateOne = async (id, answerObj) => Answer.update(answerObj, {
  where: {answer_id: id},
}).then((res) => {
  if (JSON.stringify(res) === '[0]') return null;
  return answerObj;
}).catch((err) => {
  console.error(`ERROR: ${err}`);
  return {error: err};
});

const deleteOne = async ( id ) => Answer.destroy({
  where: {answer_id: id},
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
