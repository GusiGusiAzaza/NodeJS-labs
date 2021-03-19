const Admin = require('./admin-model');

const findOne = async (id) => Admin.findOne({where: {admin_id: id}})
    .then((admin) => {
      if (!admin) return null;
      return admin;
    })
    .catch((err) => {
      console.log(err);
      return {error: err};
    });

const findAll = async () =>
  Admin.findAll({raw: true})
      .then((admins) => admins)
      .catch((err) => {
        console.log(err);
        return {error: err};
      });

const create = async (adminObj) => Admin.create(adminObj)
    .then((res) => res.dataValues)
    .catch((err) => {
      console.error(`ERROR: ${err}`);
      return {error: err.message};
    });

const updateOne = async (id, adminObj) => Admin.update(adminObj, {
  where: {admin_id: id},
}).then((res) => {
  if (JSON.stringify(res) === '[0]') return null;
  return adminObj;
}).catch((err) => {
  console.error(`ERROR: ${err}`);
  return {error: err};
});

const deleteOne = async ( id ) => Admin.destroy({
  where: {admin_id: id},
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
