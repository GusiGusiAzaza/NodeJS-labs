const net = require('net');

const HOST = 'localhost';
const PORT = 40000;

net.createServer(((socket) => {
  console.log(`Server ${socket.remoteAddress}:${socket.remotePort} connected`);

  socket.on('data', (data) => {
    console.log(`Server received: ${data}`);
    socket.write(`echo: ${data}`);
  });

  socket.on('close', () => console.log(`Server ${socket.remoteAddress}:${socket.remotePort} closed`));
})).listen(PORT, HOST);

console.log(`TCP server on ${HOST}:${PORT}`);
