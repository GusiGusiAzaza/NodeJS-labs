const http = require('http');
const { requestHandler } = require('./m7-1');
const PORT = 4000;

let server = http.createServer((req,res) => {
    requestHandler(req, res).catch(() => console.log('Promise rejected'));
}).listen(PORT);
console.log(`http://localhost:${PORT}/resources/txt.txt
http://localhost:4000/resources/png.png
http://localhost:4000/resources/a.mp4
http://localhost:4000/resources/doc.docx
http://localhost:4000/index.html`);
