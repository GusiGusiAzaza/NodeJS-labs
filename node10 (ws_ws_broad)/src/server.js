const http = require('http');
const webSocket = require('ws');
const { readFileSync } = require('fs');

const httpPort = 3000;
const wsPort = 4000;
let k = 0;
let n = 0;

http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/start') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(readFileSync('./static/startWS.html'));
  }
}).listen(httpPort);

const wsServer = new webSocket.Server({ port: wsPort, host: 'localhost', path: '/wsserver' });
wsServer.on('connection', (ws) => {
  ws.on('message', (m) => {
    console.log(`Server received: ${m}`);
    n = m;
  });
  setInterval(() => {
    ws.send(`${n}->${++k}`);
  }, 3000);
});
wsServer.on('error', (e) => { console.log('WS server error: ', e); });

console.log(`http://localhost:${httpPort}/start`);
