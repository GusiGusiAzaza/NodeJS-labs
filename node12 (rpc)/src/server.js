const Wss = require('rpc-websockets').Server;
const http = require('http');
const fs = require('fs');
const { join } = require('path');
const requestListener = require('./components/requestListener');

const PORT = 4000;
const directory = 'data';
const wss = new Wss({ port: 4000, host: 'localhost' });
wss.event('onFileChange');

fs.readdir(directory, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    fs.watch(join(directory, file), (eventType, filename) => {
      wss.emit('onFileChange', { file: filename, event: eventType });
    });
  }
});

http.createServer((req, res) => {
  requestListener(req, res, wss);
}).listen(PORT);

console.log(`App is running on http://localhost:${PORT}
http://localhost:${PORT}/2
`);
