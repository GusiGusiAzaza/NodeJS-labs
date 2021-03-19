const http = require('http');
const url = require('url');
const fs = require('fs');
const {send} = require('./m0603');
// const express = require("express");
// const bodyParser = require("body-parser");


let server = http.createServer((req, res) => {
    if(url.parse(req.url).pathname === '/') {
        fs.readFile('mail.html', function (err,data) {
            res.writeHead(200,{'Content-Type': 'text/html'});
            return res.end(data);
        });
    }

    if(url.parse(req.url).pathname === '/send') {
        req.on('data', (data) =>{
            let r = JSON.parse(data);
            send(r.sendFrom, r.sendTo, r.title, r.msg);
        })
    }
}).listen(8080);
console.log('Listening on http://localhost:8080')


// const app = express();
//
// const urlencodedParser = bodyParser.urlencoded({extended: false});
//
// app.get("/", urlencodedParser, function (request, response) {
//     response.sendFile(__dirname + "/mail.html");
// });
// app.post("/send", urlencodedParser, function (request, response) {
//     if(!request.body) return response.sendStatus(400);
//     console.log(request.body);
//     response.send(`${request.body.sendTo} - ${request.body.sendFrom}`);
// });

//app.listen(8080);
