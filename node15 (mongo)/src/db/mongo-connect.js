const mongoose = require('mongoose');

const MONGO_CONNECTION_STRING = 'mongodb+srv://gusigusi:qwerty1338@bstu.ftqe7.mongodb.net/bstu?retryWrites=true&w=majority';

const mongoConnect = async () => {
  await mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((e) => {
      console.log(e);
      this.reject();
    });
};

module.exports = mongoConnect;
