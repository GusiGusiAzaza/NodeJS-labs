const Wsc = require('rpc-websockets').Client;

const ws = new Wsc('ws://localhost:4000');

ws.on('open', () => {
  ws.subscribe('onFileChange');
  ws.on('onFileChange', (p) => console.log(`'onFileChange': ${JSON.stringify(p)}`));
  console.log('SUBBED');
});
