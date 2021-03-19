const http = require('http');

const xml = `
<request id="28">
\t<x value="3"></x>
\t<x value="4"></x>
\t<m value="a"></m>
\t<m value="b"></m>
\t<m value="c"></m>
</request>`;

const options = {
  host: 'localhost',
  path: '/9-5',
  port: 4000,
  method: 'POST',
  headers: {
    'Content-Type': 'application/xml; charset=utf-8',
  },
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
req.end(xml);
