const http = require('http');
const handlers = require('./components/httpHandlers');

const PORT = 4000;

const httpHandler = (req, res) => {
  console.log('-------------------------------------------------------------------------------------');
  console.log(`Method: ${req.method}, URL: '${req.url}'`);
  switch (req.method) {
    case 'GET': handlers.getHandler(req, res); break;
    case 'POST': handlers.postHandler(req, res); break;
    case 'PUT': handlers.putHandler(req, res); break;
    case 'DELETE': handlers.deleteHandler(req, res); break;
    default: handlers.HTTP405(req, res); break;
  }
};

http.createServer().listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})
  .on('error', (e) => { console.log(`${URL} | error: ${e.code}`); })
  .on('request', httpHandler);
