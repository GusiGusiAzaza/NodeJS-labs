const Wss = require('rpc-websockets').Server;

const server = new Wss({ port: 4000, host: 'localhost' });

server.setAuth((l) => l.username === 'gusi' && l.password === 'qwerty');

function sFact(num) {
  let res = 1;
  for (let i = 2; i <= num; i++) res *= i;
  return res;
}

server.register('square', (params) => {
  if (!params[1]) return Math.PI * params[0] ** 2;
  return params[0] * params[1];
}).public();

server.register('sum', (params) => params.reduce((a, b) => a + b)).public();

server.register('mul', (params) => params.reduce((a, b) => a * b)).public();

server.register('fib', (n) => {
  if (n === 1) return 0;
  let i;
  const fib = [0, 1];
  for (i = 2; i <= n - 1; i++) {
    fib[i] = fib[i - 2] + fib[i - 1];
  }

  return fib;
}).protected();

server.register('fact', (n) => sFact(n)).protected();
