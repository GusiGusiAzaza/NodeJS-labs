const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4000/json');
const name = process.argv[2];

ws.on('open', () => {
  ws.on('message', (msg) => {
    console.log(`client received: ${msg}`);
  });
  setInterval(() => {
    ws.send(JSON.stringify({ client: name, timestamp: new Date().toISOString() }));
  }, 5000);
});
ws.onclose = () => console.log('socket closed');
ws.onerror = (e) => alert(`WS error: ${e.message}`);
