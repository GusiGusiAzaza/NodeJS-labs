const User = require('./user-model');

const findOne = async (username) => User.findOne({where: {username: username}})
    .then((user) => {
      if (!user) return null;
      return user;
    })
    .catch((err) => {
      console.log(err);
      return {error: err};
    });

const findAll = async () =>
  User.findAll({raw: true})
      .then((users) => users)
      .catch((err) => {
        console.log(err);
        return {error: err};
      });

const create = async (userObj) => User.create(userObj)
    .then((res) => res.dataValues)
    .catch((err) => {
      console.error(`ERROR: ${err}`);
      return {error: err.message};
    });

const updateOne = async (username, userObj) => User.update(userObj, {
  where: {username: username},
}).then((res) => {
  if (JSON.stringify(res) === '[0]') return null;
  return userObj;
}).catch((err) => {
  console.error(`ERROR: ${err}`);
  return {error: err};
});

const deleteOne = async ( username ) => User.destroy({
  where: {username: username},
}).then((res) => {
  console.log(res);
  if (!res) return null;
  return {deletedRecord: username};
}).catch((err) => {
  console.log(`ERROR: ${err}`);
  return {error: err};
});

module.exports = {
  findAll, create, findOne, updateOne, deleteOne,
};
