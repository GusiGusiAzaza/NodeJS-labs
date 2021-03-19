const url = require('url');
const fs = require('fs');
const path = require('path');
const httpStatus = require('http-status');

const filePath = './data/StudentList.json';
const students = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const updateFile = () => fs.writeFileSync(filePath, JSON.stringify(students, null, 4));

const notFound = (res) => {
  res.statusCode = 404;
  res.end(httpStatus['404_MESSAGE']);
};

const requestListener = (req, res, wss) => {
  const urn = url.parse(req.url).pathname;
  const pathname = urn.split('/')[1];
  let data;

  if (req.method === 'GET') { // GET GET GET GET GET
    if (pathname === '') {
      res.end(JSON.stringify(students, null, 4));
    } else if (/^\d+$/.test(pathname)) {
      const student = students.find((s) => s.id === parseInt(pathname, 10));
      if (student) res.end(JSON.stringify(student));
      else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 404, message: `GET: user with id:${pathname} not found` }));
      }
    } else if (pathname === 'backup') {
      fs.readdir('./data', { withFileTypes: true }, (err, files) => {
        if (err) console.log(err);
        else {
          const copies = [];
          files.forEach((f) => {
            if (Number.isInteger(parseInt(f.name[0], 10))) copies.push(f.name);
          });
          console.log('Copies: ', copies);
          res.end(`Copies:  ${JSON.stringify(copies, null, 4)}`);
        }
      });
    } else notFound(res);
  } else if (req.method === 'POST') { // POST POST POST POST POST POST
    if (pathname === '') {
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        data = data.replace('undefined', '');
        const student = JSON.parse(data);
        if (students.find((s) => s.id === student.id)) {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 405, message: `POST: user with id:${student.id} already exists` }));
        } else {
          students.push(student);
          updateFile();
          res.end(`ADDED\n${data}`);
        }
      });
    } else if (pathname === 'backup') {
      const date = new Date();
      const fileName = `${(date.toLocaleDateString() + date.toLocaleTimeString()).replace(/\D/g, '')}_StudentList.json`;
      setTimeout(() => fs.writeFile(`./data/${fileName}`, fs.readFileSync(filePath), (err) => {
        if (err) throw err;
        fs.watch(`./data/${fileName}`, (eventType, filename) => {
          wss.emit('onFileChange', { file: filename, event: eventType });
        });
        res.end(`${fileName} successfully created`);
      }), 2000);
    } else notFound(res);
  } else if (req.method === 'PUT' && pathname === '') { // PUT PUT PUT PUT PUT PUT PUT
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      data = data.replace('undefined', '');
      const student = JSON.parse(data);
      const index = students.findIndex((s) => s.id === student.id);
      if (students.find((s) => s.id === student.id)) {
        students[index] = student;
        updateFile();
        res.end(`UPDATED\n${JSON.stringify(student)}`);
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 404, message: `PUT: user with id:${student.id} doesn't exist` }));
      }
    });
  } else if (req.method === 'DELETE') { // DELETE DELETE DELETE DELETE DELETE
    if (/^\d+$/.test(pathname)) {
      const index = students.findIndex((s) => s.id === parseInt(pathname, 10));
      if (index !== -1) {
        const student = JSON.stringify(students[index]);
        students.splice(index, 1);
        updateFile();
        res.end(`DELETED\n${student}`);
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 404, message: `DELETE: user with id:${pathname} doesn't exist` }));
      }
    } else if (pathname === 'backup' && urn.split('/')[2].length === 8 && /^\d+$/.test(urn.split('/')[2])) {
      const directory = 'data';
      const deadline = parseInt(urn.split('/')[2], 10);
      fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          const f = file.replace(/\D/g, '').substring(0, 8);
          if (parseInt(f, 10) < deadline) {
            fs.unlink(path.join(directory, file), (e) => {
              if (e) throw e;
              console.log(`${file} deleted`);
              res.end(`${file} old copies deleted`);
            });
          }
        }
      });
    } else notFound(res);
  } else {
    res.statusCode = 405;
    res.end(httpStatus['405_MESSAGE']);
  }
};

module.exports = requestListener;
