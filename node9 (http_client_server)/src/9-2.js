const http = require('http');
const query = require('querystring');

const params = query.stringify({ x: 3, y: 4 });
const path = `/9-2?${params}`;

console.log('params: ', params);
console.log('path: ', path);

const options = {
  host: 'localhost',
  path,
  port: 4000,
  method: 'GET',
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(`Body: ${data}`);
  });
});

req.on('error', (e) => {
  console.log(e);
});
req.end();
