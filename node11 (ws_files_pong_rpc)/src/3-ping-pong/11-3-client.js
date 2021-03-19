const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4000/wsserver');

ws.on('ping', (data) => {
  console.log(`on ping: ${data.toString()}`);
  ws.pong('pong from client');
});

const duplex = WebSocket.createWebSocketStream(ws, { encoding: 'utf-8' });
duplex.pipe(process.stdout);
process.stdin.pipe(duplex);

ws.onclose = () => console.log('socket closed');
ws.onerror = (e) => alert(`WS error: ${e.message}`);
