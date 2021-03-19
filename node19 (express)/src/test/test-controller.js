const Test = require('./test-model');

const findOne = async (id) => Test.findOne({where: {test_id: id}})
    .then((test) => {
      if (!test) return null;
      return test;
    })
    .catch((err) => {
      console.log(err);
      return {error: err};
    });

const findAll = async () =>
  Test.findAll({raw: true})
      .then((tests) => tests)
      .catch((err) => {
        console.log(err);
        return {error: err};
      });

const create = async (testObj) => Test.create(testObj)
    .then((res) => res.dataValues)
    .catch((err) => {
      console.error(`ERROR: ${err}`);
      return {error: err.message};
    });

const updateOne = async (id, testObj) => Test.update(testObj, {
  where: {test_id: id},
}).then((res) => {
  if (JSON.stringify(res) === '[0]') return null;
  return testObj;
}).catch((err) => {
  console.error(`ERROR: ${err}`);
  return {error: err};
});

const deleteOne = async ( id ) => Test.destroy({
  where: {test_id: id},
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
