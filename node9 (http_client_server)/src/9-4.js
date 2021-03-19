const http = require('http');

const json = `{
  "_comment": "Запрос. Лаба 8/10",
  "x": 3,
  "y": 5,
  "s": "Сообщение",
  "m": [
    "a",
    "b",
    "c",
    "d"
  ],
  "o": {
    "surname": "Иванов",
    "name": "Иван"
  }
}`;

const options = {
  host: 'localhost',
  path: '/9-4',
  port: 4000,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', accept: 'application/json',
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
req.end(json);
