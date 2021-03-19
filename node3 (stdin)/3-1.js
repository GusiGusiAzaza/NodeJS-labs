let http = require('http');
let port = 8080;
let state = 'norm';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
    if (text.trim() === 'norm'.trim()) {
        console.log(state + '==>' + 'norm');
        state = 'norm';
    } else if (text.trim() === 'idle'.trim()) {
        console.log(state + '==>' + 'idle');
        state = 'idle';
    } else if (text.trim() === 'stop'.trim()) {
        console.log(state + '==>' + 'stop');
        state = 'stop';
    } else if (text.trim() === 'stop'.trim()) {
        console.log(state + '==>' + 'stop');
        state = 'stop';
    } else if (text.trim() === 'exit') {
        console.log('App stopped.');
        process.exit();
    } else {
        
    }
});

http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h1>' + state + '</h1>');
    response.end();
}).listen(port);
console.log('Running at http://localhost:8080\n');