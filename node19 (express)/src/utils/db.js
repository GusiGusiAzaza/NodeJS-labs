const User = require('../user/user-model');
const Question = require('../question/question-model');


const findAll = async (table) => table.findAll({raw: true})
    .then((users) => users)
    .catch((err) => {
      console.log(err);
      return {error: err};
    });

findAll(User).then((result) => {
  console.table(result);
});
findAll(Question).then((result) => {
  console.table(result);
});


