const http = require('http');
const fs = require('fs');

const options = {
  host: 'localhost',
  path: '/9-8',
  port: 4000,
  method: 'GET',
};

const file = fs.createWriteStream('./files/client.png');
const req = http.request(options, (res) => {
  res.pipe(file);
});

req.on('error', (e) => {
  console.log(e);
});
req.end();
