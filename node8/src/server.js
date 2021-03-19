const http = require('http');
const requestListener = require('./components/requestListener');
const PORT = 4000;
const sockets = new Set();
let i = 0;

let server = http.createServer((req, res) => {
  requestListener(req, res, server, sockets);
}).listen(PORT);

server.on('connection', socket => {
  sockets.add(socket);
  console.log('     !!!New connection established!!! ' + i++);
  server.once('close', () => {
    sockets.delete(socket);
  });
});

console.log(`App is running on http://localhost:${PORT}
http://localhost:${PORT}/connection?set=1000
http://localhost:${PORT}/headers
http://localhost:${PORT}/parameter?x=-333&&y=-33
http://localhost:${PORT}/parameter/-333/-33
http://localhost:${PORT}/close
http://localhost:${PORT}/socket
http://localhost:${PORT}/resp-status?code=404&&msg=HelloWorld
http://localhost:${PORT}/json
http://localhost:${PORT}/xml
http://localhost:${PORT}/form
http://localhost:${PORT}/files
http://localhost:${PORT}/files/form.html
http://localhost:${PORT}/upload
`);
