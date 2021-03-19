const fs = require('fs');
const url = require('url');
const http = require('http');
const Db = require('./DB');

const DB = new Db();

const PORT = 4000;
let tableName;
let body = ' ';

const HTTP404 = (req, res) => {
  console.log(`${req.method}: ${req.url}, HTTP status 404`);
  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(`"error" : "${req.method}: ${req.url}, HTTP status 404"`);
};

const HTTP405 = (req, res) => {
  console.log(`${req.method}: ${req.url}, HTTP status 405`);
  res.writeHead(405, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(`Error" : "${req.method}: ${req.url}, HTTP status 405"`);
};

function getUrlPart(reqUrl, index) {
  return decodeURI(reqUrl).split('/')[index] || ' ';
}

const getHandler = (req, res) => {
  const { pathname } = url.parse(req.url, true);
  switch (`/${getUrlPart(pathname, 1)}`) {
    case '/ ':
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync('./node14.html'));
      console.log('App sendFile');
      break;
    case '/api':
      tableName = getUrlPart(pathname, 2);
      console.log(`Get ${tableName}`);
      DB.Get(tableName)
        .then((records) => {
          res.end(JSON.stringify(records.recordset));
        })
        .catch((error) => {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: String(error) }));
        });
      break;
    default: HTTP404(req, res); break;
  }
};

const postHandler = (req, res) => {
  body = ' ';
  const { pathname } = url.parse(req.url, true);
  switch (`/${getUrlPart(pathname, 1)}`) {
    case '/api':
      req.on('data', (chunk) => {
        body = JSON.parse(chunk.toString());
      });
      req.on('end', async () => {
        tableName = getUrlPart(pathname, 2);
        console.log(`Post ${tableName}`);
        DB.Insert(tableName, body).then(() => {
          res.end(JSON.stringify(body));
        }).catch((error) => {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: String(error) }));
        });
      });
      break;
    default: HTTP404(req, res); break;
  }
};

const putHandler = (req, res) => {
  body = ' ';
  const { pathname } = url.parse(req.url, true);
  switch (`/${getUrlPart(pathname, 1)}`) {
    case '/api':
      req.on('data', (chunk) => {
        body = JSON.parse(chunk.toString());
      });
      req.on('end', async () => {
        tableName = getUrlPart(pathname, 2);
        console.log(`Put ${tableName}`);
        DB.Update(tableName, body).then(() => {
          res.end(JSON.stringify(body));
        }).catch((error) => {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: String(error) }));
        });
      });
      break;
    default: HTTP404(req, res); break;
  }
};

const deleteHandler = (req, res) => {
  body = ' ';
  const { pathname } = url.parse(req.url, true);
  switch (`/${getUrlPart(pathname, 1)}`) {
    case '/api':
      req.on('data', (chunk) => {
        body = JSON.parse(chunk.toString());
      });
      req.on('end', async () => {
        tableName = getUrlPart(pathname, 2);
        console.log(`Delete ${tableName}`);
        body = Object.values(await DB.GetOne(tableName, getUrlPart(pathname, 3)))[1][0];
        DB.Delete(tableName, getUrlPart(pathname, 3)).then(() => {
          res.end(JSON.stringify(body));
        })
          .catch((error) => {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: String(error) }));
          });
      });
      break;
    default: HTTP404(req, res); break;
  }
};

const httpHandler = (req, res) => {
  switch (req.method) {
    case 'GET': getHandler(req, res); break;
    case 'POST': postHandler(req, res); break;
    case 'PUT': putHandler(req, res); break;
    case 'DELETE': deleteHandler(req, res); break;
    default: HTTP405(req, res); break;
  }
};

http.createServer().listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})
  .on('error', (e) => { console.log(`${URL} | error: ${e.code}`); })
  .on('request', httpHandler);
