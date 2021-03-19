const WebSocket = require('ws');
const fs = require('fs');

const wsPort = 4000;

const wsServer = new WebSocket.Server({ port: wsPort, host: 'localhost', path: '/wsserver' });

wsServer.on('connection', (ws) => {
  ws.on('message', (file) => {
    fs.createWriteStream('./upload/picFromClient.png').write(file);
  });

  ws.send(fs.readFileSync('./download/pic8.png'));
});
wsServer.on('error', (e) => { console.log('WS server error: ', e); });
