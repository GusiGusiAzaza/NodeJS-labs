const http = require('http');
const mongoConnect = require('./db/mongo-connect');
const requestListener = require('./components/request-listener');

const PORT = 3000;

mongoConnect()
  .then(() => {
    http.createServer((req, res) => {
      requestListener(req, res);
    }).listen(PORT);
  })
  .catch(() => {
    console.error('mongoDB connection error');
  });
