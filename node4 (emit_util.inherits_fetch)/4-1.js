'use strict';
const http = require('http');
const url = require('url');
const fs = require('fs');
let data = require('./db.js');
const port = 8080;

let db = new data.DB();

db.on('GET', (req,res) => {console.log('DB.GET'); res.end(JSON.stringify(db.get()));});
db.on('POST',
    (req,res) => {
    console.log('DB.POST');
    req.on('data', data => {
        let r = JSON.parse(data);
        db.post(r);
        res.end(JSON.stringify(r));
    })
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

http.createServer(function (req, res) {
    if (url.parse(req.url).pathname === '/') {
        fs.readFile('4-1.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(data);
        });
    }

    if (url.parse(req.url).pathname === '/api/db') {
        db.emit(req.method, req, res);
    }
}).listen(port);
console.log('http://localhost:'+port + '/');

