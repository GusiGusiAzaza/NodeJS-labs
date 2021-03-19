const WebSocket = require('ws');

const broadcastPort = 5000;

const wss = new WebSocket.Server({ port: broadcastPort, host: 'localhost', path: '/broadcast' });
let n = 0;

wss.on('connection', (ws) => {
  ws.send('You successfully connected to the websocket.');
  ws.on('message', (m) => {
    console.log(`broad-server received: ${m}`);
  });
});

setInterval(() => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(`server: ${n}`);
  });
  n++;
}, 3000);

wss.on('error', (e) => { console.log('WS server error: ', e); });
