const url = require('url');
const fs = require('fs').promises;
const status = require('http-status');

const requestHandler = async (req, res) => {
    if(req.method === 'GET') {
        let data;
        let mime = 'text/plain';
        let code = 200;
        const path = url.parse(req.url).pathname;
        if (await fileExist(__dirname + path)) {
            await getMime(path.split('.')[1]).then(async m => {
                if(m !== '404') {
                    data = await fs.readFile(__dirname + path);
                    mime = m;
                } else {
                    code = 404;
                    data = status["404_MESSAGE"];
                }}
            );
        } else {
            code = 404;
            data = status["404_MESSAGE"];
        }
        res.writeHead(code, {'Content-Type': `${mime};charset=utf-8` });
        res.end(Buffer.from(data));
    } else {
        res.writeHead(405);
        res.end(status['405_MESSAGE']);
    }
};

const getMime = async (path) => {
    switch (path) {
        case 'txt': return 'text/plain';
        case 'html': return 'text/html';
        case 'png': return 'image/png';
        case 'css': return 'text/css';
        case 'xml': return 'application/xml';
        case 'json': return 'application/json';
        case 'js': return 'text/javascript';
        case 'docx': return 'application/msword';
        case 'mp4': return 'video/mp4';
        default: return '404';
    }
}

async function fileExist(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch (error) {
        console.log(`${filePath} does not exists`);
        return false;
    }
}

module.exports.requestHandler = requestHandler;
