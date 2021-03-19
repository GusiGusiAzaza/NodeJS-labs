const http = require('http');
const fs = require('fs');

const options = {
  host: 'localhost',
  path: '/9-7',
  port: 4000,
  method: 'POST',
};

const req = http.request(options, (res) => {
  let resData = '';
  res.on('data', (data) => { resData += data; });
  res.on('end', () => {
    console.log(resData);
  });
});
req.on('error', (e) => console.log(e.message));

const stream = new fs.ReadStream('./files/pic.png');
stream.on('data', (data) => {
  req.write(data);
});
stream.on('end', () => {
  req.end();
});
