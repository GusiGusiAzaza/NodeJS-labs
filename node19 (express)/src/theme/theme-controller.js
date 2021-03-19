const Theme = require('./theme-model');

const findOne = async (theme) => Theme.findOne({where: {theme_name: theme}})
    .then((theme) => {
      if (!theme) return null;
      return theme;
    })
    .catch((err) => {
      console.log(err);
      return {error: err};
    });

const findAll = async () =>
  Theme.findAll({raw: true})
      .then((themes) => themes)
      .catch((err) => {
        console.log(err);
        return {error: err};
      });

const create = async (themeObj) => Theme.create(themeObj)
    .then((res) => res.dataValues)
    .catch((err) => {
      console.error(`ERROR: ${err}`);
      return {error: err.message};
    });

const updateOne = async (theme, themeObj) => Theme.update(themeObj, {
  where: {theme_name: theme},
}).then((res) => {
  if (JSON.stringify(res) === '[0]') return null;
  return themeObj;
}).catch((err) => {
  console.error(`ERROR: ${err}`);
  return {error: err};
});

const deleteOne = async ( theme ) => Theme.destroy({
  where: {theme_name: theme},
}).then((res) => {
  console.log(res);
  if (!res) return null;
  return {deletedRecord: theme};
}).catch((err) => {
  console.log(`ERROR: ${err}`);
  return {error: err};
});

module.exports = {
  findAll, create, findOne, updateOne, deleteOne,
};
