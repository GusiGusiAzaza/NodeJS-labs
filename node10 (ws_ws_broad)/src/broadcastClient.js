const WebSocket = require('ws');

const parm2 = process.argv[2];
let timeout;

const prefix = typeof parm2 === 'undefined' ? 'A' : parm2;
const ws = new WebSocket('ws://localhost:5000/broadcast');

ws.on('open', () => {
  let n = 0;

  timeout = setInterval(() => {
    ws.send(`client: ${prefix}-${++n}`);
  }, 1000);

  ws.on('message', (m) => {
    console.log(`${parm2} received: ${m}`);
  });

  setTimeout(() => {
    ws.close();
    clearInterval(timeout);
  }, 25000);
});
