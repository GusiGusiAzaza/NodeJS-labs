const fs = require('fs');
const Db = require('../db/DB');

const DB = new Db();

let tableName;
let body = ' ';

const HTTP404 = (req, res) => {
  console.log(`${req.method}: ${req.url}, HTTP status 404`);
  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(`Error" : "${req.method}: ${req.url}, HTTP status 404"`);
};

const HTTP405 = (req, res) => {
  console.log(`${req.method}: ${req.url}, HTTP status 405`);
  res.writeHead(405, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(`Error" : "${req.method}: ${req.url}, HTTP status 405"`);
};

const getUrlPart = (reqUrl, index) => decodeURI(reqUrl).split('/')[index] || ' ';

const getHandler = (req, res) => {
  const pathname = req.url;
  switch (`/${getUrlPart(pathname, 1)}`) {
    case '/ ':
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync('./src/static/node18.html'));
      console.log('App sendFile');
      break;
    case '/api':
      tableName = getUrlPart(pathname, 2);
      DB.Get(tableName)
        .then((records) => {
          res.end(JSON.stringify(records));
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
  const pathname = req.url;
  switch (`/${getUrlPart(pathname, 1)}`) {
    case '/api':
      req.on('data', (chunk) => {
        body = JSON.parse(chunk.toString());
      });
      req.on('end', async () => {
        tableName = getUrlPart(pathname, 2);
        await DB.Insert(tableName, body).then((result) => {
          res.end(JSON.stringify(result));
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
  const pathname = req.url;
  switch (`/${getUrlPart(pathname, 1)}`) {
    case '/api':
      req.on('data', (chunk) => {
        body = JSON.parse(chunk.toString());
      });
      req.on('end', async () => {
        tableName = getUrlPart(pathname, 2);
        DB.Update(tableName, body).then((result) => {
          res.end(JSON.stringify(result));
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
  const pathname = req.url;
  switch (`/${getUrlPart(pathname, 1)}`) {
    case '/api':
      req.on('data', (chunk) => {
        body = JSON.parse(chunk.toString());
      });
      req.on('end', async () => {
        tableName = getUrlPart(pathname, 2);
        body = Object.values(await DB.GetOne(tableName, getUrlPart(pathname, 3)))[1][0];
        DB.Delete(tableName, getUrlPart(pathname, 3)).then((result) => {
          res.end(JSON.stringify(result));
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

module.exports = {
  HTTP404, HTTP405, getHandler, postHandler, putHandler, deleteHandler,
};
