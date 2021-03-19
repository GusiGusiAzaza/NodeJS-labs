const http = require('http');
const fs = require('fs');
const { graphql, buildSchema } = require('graphql');
const resolvers = require('./components/resolvers');
const Db = require('./DB/DB');

const PORT = 3000;
const schema = buildSchema(fs.readFileSync('./schemas/schema.gql').toString());
const context = new Db();

const httpHandler = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', async () => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    if (req.url === '/' && req.method === 'POST') {
      let graphqlRequest = '';
      try {
        graphqlRequest = JSON.parse(body);
        if (graphqlRequest.query) {
          await graphql(schema, graphqlRequest.query, resolvers, context, graphqlRequest.variables)
            .then((result) => {
              if (result.errors) {
                res.statusCode = 400;
              }
              res.end(JSON.stringify(result, null, '  '));
            }).catch((err) => {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err }, null, '  '));
            });
        } else {
          res.statusCode = 400;
          res.end();
        }
      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err }, null, '  '));
      }
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
};

http.createServer().listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})
  .on('error', (e) => { console.log(`${URL} | error: ${e.code}`); })
  .on('request', httpHandler);
