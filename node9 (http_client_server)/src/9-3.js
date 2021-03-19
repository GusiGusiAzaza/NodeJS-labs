const http = require('http');
const query = require('querystring');

const params = query.stringify({ x: 3, y: 4, s: 'message' });

console.log('params: ', params);

const options = {
  host: 'localhost',
  path: '/9-3',
  port: 4000,
  method: 'POST',
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(`Body: ${data}`);
    console.log(`Status Code: ${res.statusCode}`);
  });
});
req.on('error', (e) => {
  console.log(e);
});

req.write(params);
req.end();
