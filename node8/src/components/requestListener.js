const url = require('url');
const fs = require('fs');
const status = require('http-status');
const qs = require('querystring');
const xml2js = require('xml2js');
const mp = require("multiparty");

const requestListener = (req, res, server, sockets) => {
  const path = url.parse(req.url).pathname;
  const pathname = path.split('/')[1];
  try {
    switch (pathname) {
      case 'connection': {
        const set = parseInt(url.parse(req.url, true).query.set);
        set ? server.keepAliveTimeout = set : res.end(`server.keepAliveTimeout = ${server.keepAliveTimeout}`);
        res.end(`server.keepAliveTimeout has been changed to ${server.keepAliveTimeout}`);
      } break;

      case 'headers': {
        res.setHeader('Content-Type', 'plain/txt');
        res.setHeader('Hello', 'World');
        res.setHeader('Cookie', ['type=ninja', 'language=javascript']);
        res.write(JSON.stringify(req.headers, null, 4));
        res.write(JSON.stringify(res.getHeaders(), null, 4));
        res.end();
      } break;

      case 'parameter': {
        if(!isNaN(parseInt(path.split('/')[2])) && !isNaN(parseInt(path.split('/')[3]))){
          const xs = path.split('/')[2];
          const ys = path.split('/')[3];
          calc(xs, ys, res);
        } else {
          const xs = url.parse(req.url, true).query.x;
          const ys = url.parse(req.url, true).query.y;
          calc(xs, ys, res);
        }
        res.end('Parameters are not numbers');
      } break;

      case 'close': {
        let sdTimer = setTimeout(() => {
          close(server, sockets);
          sdTimer = null;
        }, 5000);
        res.end('Server will be terminated in 5 seconds');
      } break;

      case 'socket': {
        res.end(`Client IP: ${req.connection.remoteAddress}\nClient PORT: ${req.connection.remotePort}\nServer IP: ${req.connection.localAddress}\nServer PORT: ${req.connection.localPort}`);
      } break;

      case 'resp-status': {
        const code = parseInt(url.parse(req.url, true).query.code);
        const msg = url.parse(req.url, true).query.msg;
        console.log(`${code}\n${msg}`);
        if (code && msg) {
          res.statusCode = code;
          res.statusMessage = msg;
          res.end(`Status code: ${res.statusCode}\nStatus message: ${res.statusMessage}`);
        }
        res.end(`Invalid parameters`);
      } break;

      case 'form' : {
        res.writeHead(200,{ 'Content-Type': 'text/html; charset=utf-8' });
        if (req.method == "GET") {
          fs.readFile("./static/form.html", (err, data) => {
            if (err) {
              res.statusCode = 405;
              res.end(status['405_MESSAGE']);
            } else {
              res.end(data);
            }
          });
        } else {
          let data = "";
          req.on("data", (chunk) => {
            data += chunk;
            console.log(`CHUNK: ${chunk}`);
          });
          req.on("end", () => {
            let o = qs.parse(data);
            console.log(o);
            data += "<ul>";
            for (let key in o) {
              data += `<li>${key} : ${o[key]}</li>`;
            }
            data += "<ul/>";
            res.write("<h3>FORM DATA</h3>");
            res.end(data);
          });
        }
      } break;

      case 'json': {
        let result = '';
        req.on('data', (data) => {
          result += data;
        });
        req.on('end', () => {
          const {_comment, x, y, s, m, o} = JSON.parse(result);
          const resp = {
            _comment: _comment,
            x_plus_y: parseInt(x) + parseInt(y),
            concat_s_o: `${s}: ${o.name}, ${o.surname} `,
            length_m: m.length,
          };
          res.end(JSON.stringify(resp, null, 4));
        });
      } break;

      case 'xml': {
        let result = '';
        req.on('data', (data) => {
          result += data;
        });
        req.on('end', () => {
          let sum = 0;
          let text = '';
          let id;
          xml2js.parseString(result, (err, result) => {
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
        });
      } break;

      case 'files': {
        let patharr = [];
          path.split("/")
          .forEach((e) => {
            console.log(e);
            patharr.push(e);
          });
        if (patharr.length == 2) {
          fs.readdir("./static", (err, files) => {
            if (err) res.statusCode = 500;
            res.setHeader("X-static-files-count", files.length);
            res.end(`${files.length}`);
          });
        } else if (patharr.length == 3) {
          let fname = patharr[2];
          if (!fs.existsSync(`./static/${fname}`)) {
            res.statusCode = 404;
            res.end(status['404_MESSAGE']);
          }
          else {
            res.writeHead(200, {
              "Content-Type": "text/plain; charset=utf-8",
            });
            console.log(`./static/${fname}\``);
            res.end(fs.readFileSync(`./static/${fname}`));
          }
        } else {
          res.statusCode = 404;
          res.end(status['404_MESSAGE']);
        }
      } break;

      case 'upload': {
        res.writeHead(200,{ 'Content-Type': 'text/html; charset=utf-8' });
        if (req.method == "GET") {
          fs.readFile("./static/uploadform.html", (err, data) => {
            if (err) {
              res.statusCode = 405;
              res.end(status['405_MESSAGE']);
            } else {
              res.end(data);
            }
          });
        } else {
          let form = new mp.Form({ uploadDir: "./static" });
          form.parse(req, (err, fields, files) => {
            res.end('File successfully uploaded');
          });
        }
      } break;

      case 'ff': {
        server.getConnections((error, count) => {
          console.log('Connections number: ' + count);
          res.writeHead(200,{ 'Content-Type': 'text/html; charset=utf-8' });
          //res.end('Connections number: ' + count);
          res.end(count + '<form action="http://localhost:4000/ff">\n' +
            '    <input type="submit" value="Submit"><br />\n' +
            '</form>');
        });
      } break;
    }
  } catch (e) {
    console.log(e);
  }
};

const calc = (xs, ys, res) => {
  const nums = /^-?[0-9]+$/;
  if (xs.match(nums) && ys.match(nums)) {
    const x = parseInt(xs);
    const y = parseInt(ys);
    const sum = x + y;
    const diff = x - y;
    const mul = x * y;
    const div = x / y;
    res.end(`Sum = ${sum}\nDiff = ${diff}\nMul = ${mul}\nDiv = ${div}`);
  } else res.end('Parameters are not numbers');
};

const close = (server, sockets) => {
  for (const socket of sockets) {
    console.log(socket);
    socket.destroy();
    sockets.delete(socket);
  }
  process.stdin.unref();
  console.log('All connections closed');
  server.close();
  console.log('Server terminated');
};

module.exports = requestListener;
