let http = require('http');
let url = require('url');
let fs = require('fs');
let port = 8080;

function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
}

http.createServer((request, response) => {
    let json = 'Empty';
    let result = { k: 0, fact: 0 };
    if(url.parse(request.url).pathname === '/fact') {
        if(typeof url.parse(request.url, true).query.k != 'undefined') {
            let k = parseInt((url.parse(request.url, true).query.k));
            if(Number.isInteger(k)) {
                response.writeHead(200, {'Content-Type': 'application/json'});
                result.k = k;
                result.fact = factorial(k);
                json = JSON.stringify(result);
            }
        }
    }
    response.end(json);
}).listen(port);
console.log('Running at http://localhost:8080/fact?k=9\n');