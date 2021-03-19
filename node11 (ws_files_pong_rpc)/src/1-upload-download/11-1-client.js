const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://localhost:4000/wsserver');

ws.on('open', () => {
  ws.on('message', (file) => {
    fs.createWriteStream('./upload/picFromServer.png').write(file);
  });
  ws.send(fs.readFileSync('./download/pic.png'));
});
ws.onclose = () => console.log('socket.onclose');
ws.onerror = (e) => alert(`WS error: ${e.message}`);
