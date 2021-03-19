const http = require('http');

const options = {
  host: 'localhost',
  path: '/9-1',
  port: 4000,
  method: 'GET',
};

const req = http.request(options, (res) => {
  console.log(`method: ${req.method}
    statusCode: ${res.statusCode}
    statusMessage: ${res.statusMessage}
    IP: ${res.socket.remoteAddress}
    port: ${res.socket.remotePort}
    headers: ${JSON.stringify(res.headers, null, 8)}`);
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
