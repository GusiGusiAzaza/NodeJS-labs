const Wsc = require('rpc-websockets').Client;

const ws = new Wsc('ws://localhost:4000');

ws.on('open', () => {
  ws.call('square', [3]).then((r) => { console.log(`Square(3) = ${r}`); });
  ws.call('square', [5, 4]).then((r) => { console.log(`Square(5, 4) = ${r}`); });
  ws.call('sum', [2]).then((r) => { console.log(`Sum(2) = ${r}`); });
  ws.call('sum', [2, 4, 6, 8, 10]).then((r) => { console.log(`Sum(2, 4, 6, 8, 10) = ${r}`); });
  ws.call('mul', [3]).then((r) => { console.log(`Mul(3) = ${r}`); });
  ws.call('mul', [3, 5, 7, 9, 11, 13]).then((r) => { console.log(`Mul(3, 5, 7, 9, 11, 13) = ${r}`); });
  ws.login({ username: 'gusi', password: 'qwerty' }).then(() => {
    ws.call('fib', 1).then((r) => { console.log(`Fib(1) = ${r}`); });
    ws.call('fib', 2).then((r) => { console.log(`Fib(2) = ${r}`); });
    ws.call('fib', 17).then((r) => { console.log(`Fib(17) = ${r}`); });
    ws.call('fact', 0).then((r) => { console.log(`Fact(0) = ${r}`); });
    ws.call('fact', 5).then((r) => { console.log(`Fact(5) = ${r}`); });
    ws.call('fact', 10).then((r) => { console.log(`Fact(10) = ${r}`); });
    ws.close();
  }).catch(() => {
    console.log('auth failed');
  });
});
ws.onerror = (e) => alert(`WS error: ${e.message}`);
