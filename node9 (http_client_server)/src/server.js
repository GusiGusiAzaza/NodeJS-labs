const http = require('http');
const url = require('url');
const query = require('querystring');
const fs = require('fs');
const xml2js = require('xml2js');

const writeFile = (req, res, path) => {
  const txtFile = fs.createWriteStream(path);
  req.pipe(txtFile);
  req.on('end', () => {
    res.end();
  });
};

http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (url.parse(req.url).pathname === '/9-1') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Task 1');
    }

    if (url.parse(req.url).pathname === '/9-2') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      const { x, y } = url.parse(req.url, true).query;
      res.end(`Task 2. x:${x} y:${y} status:${res.statusCode}`);
    }

    if (url.parse(req.url).pathname === '/9-8') {
      const stream = new fs.ReadStream('./files/pic8.png');
      stream.on('data', (data) => {
        res.write(data);
      });
      stream.on('end', () => {
        res.end();
      });
    }
  } else if (req.method === 'POST') {
    let data = '';
    let dataObj;
    let reqJsonObj;
    switch (url.parse(req.url, true).pathname) {
      case '/9-3':
        req.on('data', (chunk) => {
          data += chunk;
        });

        req.on('end', () => {
          dataObj = query.parse(data);
          console.log(data);
          console.log(dataObj);

          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write(`${dataObj.x}`);
          res.write(`${dataObj.y}`);
          res.write(`${dataObj.s}`);
          res.end();
        }); break;

      case '/9-4':
        req.on('data', (chunk) => {
          data += chunk;
        });
        req.on('end', () => {
          const {
            _comment, x, y, s, m, o,
          } = JSON.parse(data);
          const resp = {
            _comment,
            x_plus_y: parseInt(x, 10) + parseInt(y, 10),
            concat_s_o: `${s}: ${o.name}, ${o.surname} `,
            length_m: m.length,
          };

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(resp, null, 4));
        }); break;

      case '/9-5':
        req.on('data', (chunk) => {
          data += chunk;
        });
        req.on('end', () => {
          let sum = 0;
          let text = '';
          let id;
          xml2js.parseString(data, (err, result) => {
            id = result.request.$.id;
            result.request.x.forEach((e) => {
              sum += Number(e.$.value);
            });
            result.request.m.forEach((e) => {
              text += e.$.value;
            });
          });
          const responseText = `
<response id="${id}">
  <sum element="x" result="${sum}"></sum>
  <text element="m" result="${text}"></text>
</response>`;
          res.end(responseText);
        }); break;

      case '/9-6':
        writeFile(req, res, './files/serverTxt.txt');
        break;

      case '/9-7':
        writeFile(req, res, './files/server.png');
        break;
      default:
        console.log('No handler specified');
    }
  }
}).listen(4000);
