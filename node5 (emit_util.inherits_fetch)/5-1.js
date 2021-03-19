'use strict';
const http = require('http');
const url = require('url');
const fs = require('fs');
let data = require('./db.js');
const port = 8080;
const sockets = new Set();
let reqN = 0, commitN = 0;
let result = '';
let jsonResult = 'No statistics collected yet';
let db = new data.DB();

db.on('GET', (req,res) => {console.log('DB.GET'); res.end(JSON.stringify(db.get()));});
db.on('POST',
    (req,res) => {
    console.log('DB.POST');
    req.on('data', data => {
        let r = JSON.parse(data);
        db.post(r);
        res.end(JSON.stringify(r));
    });
});
db.on('DELETE',
    (req,res) => {
        console.log('DB.DELETE');
        req.on('data', data => {
            let r = JSON.parse(data);
            db.delete(r);
            res.end(JSON.stringify(r));
        })
    });

db.on('PUT',
    (req,res) => {
    console.log('DB.PUT');
    req.on('data', data => {
        let r = JSON.parse(data);
        db.put(r);
        res.end(JSON.stringify(r));
    })
});


let server = http.createServer(function (req, res) {
    if (url.parse(req.url).pathname === '/') {
        fs.readFile('5-1.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            reqN++;
            return res.end(data);
        });
    }

    if (url.parse(req.url).pathname === '/api/db') {
        db.emit(req.method, req, res);
        reqN++;
    }

    if (url.parse(req.url).pathname === '/api/ss') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        reqN++;
        res.end(jsonResult);
    }
}).listen(port);
console.log('http://localhost:'+port + '/');


server.on('connection', (socket) => {
    sockets.add(socket);
    server.once('close', () => {
        sockets.delete(socket);
    });
});


let close = (callback) => {
    for (const socket of sockets) {
        socket.destroy();
        sockets.delete(socket);
    }
    console.log('All connections closed');
    server.close(callback);
    console.log('Server terminated');
};

let stats = () => {
    let end = new Date();
    let statStart = start.toUTCString()
    let statEnd = end.toUTCString();
    result = `//////////////////Statistics log/////////////////////
        Start: ${statStart}
        Number of requests: ${reqN}
        Number of committing: ${commitN}
        End: ${statEnd}
////////////////////////////////////////////////////`;
    jsonResult = JSON.stringify({start:statStart, finish:statEnd, reqN:reqN, commitN:commitN});
    console.log(result);
}

let txt;
let sdTimer, scTimer, ssTimer;
let start;

    process.stdin.resume();
    process.stdin.setEncoding('utf-8');
    process.stdin.unref();
process.stdin.on('data', text => {
    txt = text.trim();

    if(/^sd \d{1,5}$/.test(txt)){
        if(server.listening){
            clearTimeout(sdTimer);
            sdTimer = setTimeout(() => {
                close();
                sdTimer = null;
                }, text.match(/\d+/) * 1000);
        } else console.log('Server is not listening');
    }

    else if (txt === 'sd') {
        if(sdTimer){
            clearTimeout(sdTimer);
            sdTimer = null;
            console.log('Termination terminated :)');
        } else console.log('Termination is not planned');
    }

    else if(/^sc \d{1,5}$/.test(txt)){
            clearTimeout(scTimer);
            scTimer = setInterval(() => {db.commit(); commitN++;}, text.match(/\d+/) * 1000);
            scTimer.unref();
    }

    else if (txt === 'sc') {
        if(scTimer){
            clearTimeout(scTimer);
            scTimer = null;
            console.log('Committing stopped');
        } else console.log('Committing is not planned');
    }

    else if(/^ss \d{1,5}$/.test(txt)){
        clearTimeout(ssTimer);
        commitN = 0;
        reqN = 0;
        start = new Date();
        ssTimer = setTimeout(stats, text.match(/\d+/) * 1000);
        ssTimer.unref();
    }

    else if (txt === 'ss') {
        if(ssTimer){
            clearTimeout(ssTimer);
            ssTimer = null;
            stats();
        } else console.log('Stat collector does not work');
    }

    else if (txt === 'start') {
        if(!server.listening) {
            server.listen(port);
            console.log('Server deployed');
        } else console.log('Server is already deployed');
    }
    
    else if (txt === 'exit') {
        close();
        console.log('Process terminated');
        process.exit();
    }
});


