const WebSocket = require('ws');

let n = 0;
let timeout;
const ws = new WebSocket('ws://localhost:4000/wsserver');

ws.on('open', () => {
  console.log('socket.onopen');
  timeout = setInterval(() => {
    ws.send(++n);
  }, 1000);

  ws.on('message', (m) => {
    console.log(`10-2-client received: ${m}`);
  });

  setTimeout(() => {
    ws.close();
    clearInterval(timeout);
  }, 25000);
});

ws.onclose = () => console.log('socket.onclose');
ws.onerror = (e) => alert(`WS error: ${e.message}`);
