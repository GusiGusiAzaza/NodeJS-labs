const WebSocket = require('ws');

const wsPort = 4000;
const wss = new WebSocket.Server({ port: wsPort, host: 'localhost', path: '/json' });

wss.on('connection', (ws) => {
  const n = 0;
  ws.on('message', (msg) => {
    console.log(`server received: ${msg}`);
    const { client } = JSON.parse(msg);
    ws.send(JSON.stringify({ server: n, client, timestamp: new Date().toISOString() }));
  });
});
wss.on('error', (e) => { console.log('WS server error: ', e); });
